import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const adminAuthCookie = 'rc_admin_auth';
const publicAdminPaths = ['/rcpanel7x/login'];
const publicApiPaths = ['/api/rcpanel7x/login', '/api/rcpanel7x/logout'];
const ADMIN_ACCESS_KEY = process.env.ADMIN_ACCESS_KEY ?? 'royyan-admin-secret-7x';

function isAdminRoute(pathname: string) {
  return pathname === '/rcpanel7x' || pathname.startsWith('/rcpanel7x/');
}

function isAdminApiRoute(pathname: string) {
  return pathname.startsWith('/api/rcpanel7x/');
}

function isPublicPath(pathname: string) {
  return publicAdminPaths.includes(pathname) || publicApiPaths.includes(pathname);
}

function isAuthenticated(request: NextRequest) {
  return request.cookies.get(adminAuthCookie)?.value === 'true';
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!isAdminRoute(pathname) && !isAdminApiRoute(pathname) && pathname !== '/dashboard') {
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (!isAuthenticated(request)) {
    if (isAdminApiRoute(pathname)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const loginUrl = new URL('/rcpanel7x/login', request.url);
    loginUrl.searchParams.set('key', ADMIN_ACCESS_KEY);
    loginUrl.searchParams.set('redirect', `${pathname}${search}`);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/rcpanel7x', '/rcpanel7x/:path*', '/api/rcpanel7x/:path*'],
};
