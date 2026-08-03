import { NextResponse } from 'next/server';

const ADMIN_ACCESS_KEY = process.env.ADMIN_ACCESS_KEY ?? 'royyan-admin-secret-7x';
const adminLoginUrl = `/rcpanel7x/login?key=${encodeURIComponent(ADMIN_ACCESS_KEY)}`;

function clearAuthCookie(requestUrl: string) {
  const response = NextResponse.redirect(new URL(adminLoginUrl, requestUrl));
  // Clear the JWT token cookie
  response.cookies.set({
    name: 'rc_admin_token',
    value: '',
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
  });
  // Also clear old cookie name for backwards compatibility
  response.cookies.set({
    name: 'rc_admin_auth',
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  return response;
}

export async function GET(request: Request) {
  return clearAuthCookie(request.url);
}

export async function POST(request: Request) {
  return clearAuthCookie(request.url);
}

