// ================================================
// lib/auth.ts — Admin Authentication Utilities
//
// Server-only. Never import on the client.
// Uses bcryptjs (pure-JS, no native bindings needed).
// Uses jose for JWT (Web Crypto API, works on Edge Runtime).
// ================================================

import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

// ─── Constants ────────────────────────────────
const COOKIE_NAME = 'rc_admin_token';
const JWT_ALGORITHM = 'HS256';
const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 hours
const INACTIVITY_DURATION_SECONDS = 60 * 30;  // 30 minutes

// ─── Environment Validation ───────────────────
function getJwtSecret(): Uint8Array {
  const rawSecret = process.env.JWT_SECRET;
  if (!rawSecret) {
    throw new Error('[auth] JWT_SECRET must be set.');
  }
  // Trim accidental surrounding quotes
  const secret = rawSecret.replace(/^['"]|['"]$/g, '');
  // Use whatever secret is provided; do not enforce an arbitrary minimum length here
  return new TextEncoder().encode(secret);
}

export function getPinHash(): string {
  const rawHash = process.env.ADMIN_PIN_HASH;
  if (!rawHash) {
    throw new Error(
      '[auth] ADMIN_PIN_HASH environment variable is not set. ' +
      'Generate it with: node -e "const b=require(\'bcryptjs\'); b.hash(\'YOUR_PIN\',12).then(h=>console.log(h))"'
    );
  }
  // Remove any surrounding quotes that might be accidentally preserved by the env loader
  // and unescape dollar signs (\$) which often happens when pasting into Vercel
  return rawHash.replace(/^["']|["']$/g, '').replace(/\\\$/g, '$');
}

// ─── PIN Verification ─────────────────────────

/**
 * Verifies a plain-text PIN against the stored bcrypt hash.
 * Uses constant-time comparison to prevent timing attacks.
 */
export async function verifyAdminPin(pin: string): Promise<boolean> {
  if (!pin || !/^\d{6}$/.test(pin)) return false;

  try {
    const hash = getPinHash();
    // bcrypt.compare is constant-time — safe against timing attacks
    return await bcrypt.compare(pin, hash);
  } catch {
    return false;
  }
}

/**
 * Hashes a PIN with bcrypt (cost factor 12).
 * Use this to generate ADMIN_PIN_HASH for your .env.
 */
export async function hashPin(pin: string): Promise<string> {
  return bcrypt.hash(pin, 12);
}

// ─── JWT Management ───────────────────────────

interface AdminJWTPayload extends JWTPayload {
  role: 'admin';
  /** Unique token ID for replay attack prevention */
  jti: string;
}

/**
 * Creates a signed JWT for the admin session.
 * Includes jti (unique ID) to prevent token replay attacks.
 */
export async function createAdminJWT(): Promise<string> {
  const secret = getJwtSecret();
  const jti = crypto.randomUUID();

  return new SignJWT({ role: 'admin', jti } satisfies Partial<AdminJWTPayload>)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .setIssuer('royyan-collectibles')
    .setAudience('admin-panel')
    .sign(secret);
}

/**
 * Verifies a JWT token. Returns the payload if valid, null otherwise.
 * Checks: signature, expiry, issuer, audience.
 */
export async function verifyAdminJWT(
  token: string
): Promise<AdminJWTPayload | null> {
  if (!token) return null;

  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret, {
      algorithms: [JWT_ALGORITHM],
      issuer: 'royyan-collectibles',
      audience: 'admin-panel',
    });

    if (payload.role !== 'admin') return null;

    return payload as AdminJWTPayload;
  } catch {
    return null;
  }
}

// ─── CSRF Token ───────────────────────────────

/**
 * Generates a cryptographically random CSRF token.
 */
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Constant-time string comparison to prevent timing attacks on CSRF tokens.
 */
export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// ─── Cookie Configuration ─────────────────────

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const CSRF_COOKIE_NAME = 'rc_csrf_token';

export const ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  maxAge: SESSION_DURATION_SECONDS,
};

export const CSRF_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  maxAge: 60 * 60, // 1 hour
};

export { SESSION_DURATION_SECONDS, INACTIVITY_DURATION_SECONDS };
