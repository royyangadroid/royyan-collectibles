// app/api/rcpanel7x/login/route.ts
// Military-grade PIN authentication endpoint.
//
// Security features:
// - bcryptjs PIN hashing (never stores plain PIN)
// - Rate limiting: 3 failed attempts → 15-minute IP block
// - JWT sessions (HttpOnly, Secure, SameSite=Strict)
// - CSRF double-submit cookie validation
// - Constant-time string comparison (timing attack prevention)
// - Security response headers

import { NextResponse, type NextRequest } from 'next/server';
import {
  verifyAdminPin,
  createAdminJWT,
  safeCompare,
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_OPTIONS,
  CSRF_COOKIE_NAME,
  
} from '@/lib/auth';
import { checkRateLimit, recordFailedAttempt, resetRateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

const ADMIN_ACCESS_KEY = process.env.ADMIN_ACCESS_KEY ?? 'royyan-admin-secret-7x';

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'
  );
}

function secureHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  return response;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(request);

  try {
    // ── 1. Rate Limit Check ─────────────────────────────────────
    const rateResult = checkRateLimit(ip);
    if (!rateResult.allowed) {
      const response = NextResponse.json(
        {
          ok: false,
          error: 'Too many attempts. Try again in a few minutes.',
          blockedFor: rateResult.retryAfterSeconds,
        },
        { status: 429 }
      );
      response.headers.set('Retry-After', String(rateResult.retryAfterSeconds ?? 900));
      return secureHeaders(response);
    }

    // ── 2. Parse Body ───────────────────────────────────────────
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return secureHeaders(
        NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 })
      );
    }

    const pin = typeof body?.pin === 'string' ? body.pin.trim() : '';
    const csrfToken = typeof body?.csrfToken === 'string' ? body.csrfToken : '';
    const accessKey = typeof body?.accessKey === 'string' ? body.accessKey : '';

    // ── 3. Access Key Validation ────────────────────────────────
    console.log('[login debug] Checking Access Key. Expected:', ADMIN_ACCESS_KEY, 'Got:', accessKey);
    if (!safeCompare(accessKey, ADMIN_ACCESS_KEY)) {
      console.log('[login debug] Access Key Validation Failed');
      return secureHeaders(
        NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
      );
    }

    // ── 4. CSRF Validation ──────────────────────────────────────
    const csrfCookie = request.cookies.get(CSRF_COOKIE_NAME)?.value ?? '';
    console.log('[login debug] Checking CSRF. Token:', csrfToken, 'Cookie:', csrfCookie);
    if (!csrfToken || !csrfCookie || !safeCompare(csrfToken, csrfCookie)) {
      console.log('[login debug] CSRF Validation Failed');
      return secureHeaders(
        NextResponse.json({ ok: false, error: 'CSRF validation failed' }, { status: 403 })
      );
    }

    // ── 5. PIN Validation ───────────────────────────────────────
    console.log('[login debug] Checking PIN format. Got:', pin);
    if (!pin || !/^\d{6}$/.test(pin)) {
      console.log('[login debug] PIN format invalid');
      const failResult = recordFailedAttempt(ip);
      return secureHeaders(
        NextResponse.json(
          {
            ok: false,
            error: 'PIN must be 6 digits.',
            remainingAttempts: failResult.remainingAttempts,
          },
          { status: 400 }
        )
      );
    }

    const pinValid = await verifyAdminPin(pin);
    console.log('[login debug] PIN verification result:', pinValid);

    if (!pinValid) {
      console.log('[login debug] PIN verification failed. recordFailedAttempt');
      const failResult = recordFailedAttempt(ip);
      const message =
        failResult.remainingAttempts === 0
          ? 'Account locked. Try again in 15 minutes.'
          : `Incorrect PIN. ${failResult.remainingAttempts} attempts remaining.`;

      return secureHeaders(
        NextResponse.json(
          {
            ok: false,
            error: message,
            remainingAttempts: failResult.remainingAttempts,
            blockedFor: failResult.retryAfterSeconds,
          },
          { status: 401 }
        )
      );
    }

    // ── 6. Success — Issue JWT ──────────────────────────────────
    resetRateLimit(ip);

    const token = await createAdminJWT();

    const response = NextResponse.json({ ok: true, message: 'Login successful' });
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      ...ADMIN_COOKIE_OPTIONS,
    });

    // Clear the CSRF cookie (single-use)
    response.cookies.delete(CSRF_COOKIE_NAME);

    return secureHeaders(response);
  } catch (err) {
    console.error('[login] Unexpected error:', err);
    return secureHeaders(
      NextResponse.json({ ok: false, error: 'An internal server error occurred.' }, { status: 500 })
    );
  }
}
