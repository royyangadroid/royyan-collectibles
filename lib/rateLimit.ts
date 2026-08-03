// ================================================
// lib/rateLimit.ts — In-Memory Rate Limiter
//
// NOTE: In-memory state resets on serverless cold starts.
// For production multi-region rate limiting, use Upstash Redis.
// This implementation is sufficient for Vercel single-region
// deployments and provides strong protection against brute force.
// ================================================

interface RateLimitRecord {
  attempts: number;
  firstAttemptAt: number;
  blockedUntil: number | null;
}

const MAX_ATTEMPTS = 3;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

// Module-level store persists across requests within same process instance
const store = new Map<string, RateLimitRecord>();

function getRecord(key: string): RateLimitRecord {
  const existing = store.get(key);
  const now = Date.now();

  if (!existing) {
    return { attempts: 0, firstAttemptAt: now, blockedUntil: null };
  }

  // Auto-clear expired windows (not blocked, window passed)
  if (existing.blockedUntil === null && now - existing.firstAttemptAt > WINDOW_MS) {
    store.delete(key);
    return { attempts: 0, firstAttemptAt: now, blockedUntil: null };
  }

  // Auto-clear expired blocks
  if (existing.blockedUntil !== null && now > existing.blockedUntil) {
    store.delete(key);
    return { attempts: 0, firstAttemptAt: now, blockedUntil: null };
  }

  return existing;
}

export interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  blockedUntil: number | null;
  retryAfterSeconds: number | null;
}

export function checkRateLimit(ip: string): RateLimitResult {
  const key = `admin_login:${ip}`;
  const record = getRecord(key);
  const now = Date.now();

  if (record.blockedUntil !== null && now < record.blockedUntil) {
    return {
      allowed: false,
      remainingAttempts: 0,
      blockedUntil: record.blockedUntil,
      retryAfterSeconds: Math.ceil((record.blockedUntil - now) / 1000),
    };
  }

  return {
    allowed: true,
    remainingAttempts: MAX_ATTEMPTS - record.attempts,
    blockedUntil: null,
    retryAfterSeconds: null,
  };
}

export function recordFailedAttempt(ip: string): RateLimitResult {
  const key = `admin_login:${ip}`;
  const record = getRecord(key);
  const now = Date.now();

  const newAttempts = record.attempts + 1;
  const shouldBlock = newAttempts >= MAX_ATTEMPTS;

  const updated: RateLimitRecord = {
    attempts: newAttempts,
    firstAttemptAt: record.attempts === 0 ? now : record.firstAttemptAt,
    blockedUntil: shouldBlock ? now + BLOCK_DURATION_MS : null,
  };

  store.set(key, updated);

  return {
    allowed: !shouldBlock,
    remainingAttempts: Math.max(0, MAX_ATTEMPTS - newAttempts),
    blockedUntil: updated.blockedUntil,
    retryAfterSeconds: updated.blockedUntil
      ? Math.ceil((updated.blockedUntil - now) / 1000)
      : null,
  };
}

export function resetRateLimit(ip: string): void {
  const key = `admin_login:${ip}`;
  store.delete(key);
}

/** Periodic cleanup of expired records (call from long-running processes) */
export function pruneExpiredRecords(): void {
  const now = Date.now();
  for (const [key, record] of store.entries()) {
    const expired =
      (record.blockedUntil !== null && now > record.blockedUntil) ||
      (record.blockedUntil === null && now - record.firstAttemptAt > WINDOW_MS);
    if (expired) store.delete(key);
  }
}
