// middleware.ts — Admin Authentication Middleware
//
// Security features:
// - JWT verification (signature, expiry, issuer, audience)
// - Security headers on all admin routes (XSS, Clickjacking, MIME sniffing)
// - Public path allowlist (login page, auth APIs)
// - Proper redirect with access key preservation

import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// ─── Constants ────────────────────────────────
const ADMIN_COOKIE_NAME = 'rc_admin_token';
const ADMIN_ACCESS_KEY = process.env.ADMIN_ACCESS_KEY ?? 'royyan-admin-secret-7x';

const publicAdminPaths = ['/rcpanel7x/login'];
const publicApiPaths = [
  '/api/rcpanel7x/login',
  '/api/rcpanel7x/logout',
  '/api/rcpanel7x/csrf',
];

// ─── Helpers ──────────────────────────────────
function isAdminRoute(pathname: string): boolean {
  return pathname === '/rcpanel7x' || pathname.startsWith('/rcpanel7x/');
}

function isAdminApiRoute(pathname: string): boolean {
  return pathname.startsWith('/api/rcpanel7x/');
}

function isPublicPath(pathname: string): boolean {
  return publicAdminPaths.includes(pathname) || publicApiPaths.includes(pathname);
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;

  const secret = process.env.JWT_SECRET;
  // Fallback: if JWT_SECRET not set, deny access (fail secure)
  if (!secret || secret.length < 32) return false;

  try {
    const secretKey = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ['HS256'],
      issuer: 'royyan-collectibles',
      audience: 'admin-panel',
    });

    return payload.role === 'admin';
  } catch {
    return false;
  }
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  // Clickjacking protection
  response.headers.set('X-Frame-Options', 'DENY');
  // MIME type sniffing protection
  response.headers.set('X-Content-Type-Options', 'nosniff');
  // XSS protection (legacy browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block');
  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Permissions policy
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );
  // Basic CSP for admin routes
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; ')
  );
  return response;
}

// ─── Middleware ───────────────────────────────
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname, search } = request.nextUrl;

  // Only process admin routes
  if (!isAdminRoute(pathname) && !isAdminApiRoute(pathname) && pathname !== '/dashboard') {
    return NextResponse.next();
  }

  // Always add security headers to admin routes
  const next = NextResponse.next();

  // Allow public paths (login, auth APIs)
  if (isPublicPath(pathname)) {
    return addSecurityHeaders(next);
  }

  // Verify JWT authentication
  const authenticated = await isAuthenticated(request);

  if (!authenticated) {
    // For API routes, return JSON error
    if (isAdminApiRoute(pathname)) {
      const response = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      return addSecurityHeaders(response);
    }

    // For page routes, redirect to login with access key + redirect target
    const loginUrl = new URL('/rcpanel7x/login', request.url);
    loginUrl.searchParams.set('key', ADMIN_ACCESS_KEY);
    loginUrl.searchParams.set('redirect', `${pathname}${search}`);

    return NextResponse.redirect(loginUrl);
  }

  return addSecurityHeaders(next);
}

export const config = {
  matcher: ['/dashboard', '/rcpanel7x', '/rcpanel7x/:path*', '/api/rcpanel7x/:path*'],
};
