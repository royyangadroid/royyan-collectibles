import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const adminAuthCookie = 'rc_admin_auth';
const publicAdminPaths = ['/admin/login'];
const publicApiPaths = ['/api/admin/login', '/api/admin/logout'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isDashboardRoute = pathname === '/dashboard';
  const isAdminApiRoute = pathname.startsWith('/api/admin');
  const isProtectedRoute = isAdminRoute || isDashboardRoute;

  if (!isProtectedRoute && !isAdminApiRoute) {
    return NextResponse.next();
  }

  const isPublicPath = publicAdminPaths.includes(pathname) || publicApiPaths.includes(pathname);
  if (isPublicPath) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.get(adminAuthCookie)?.value === 'true';

  if (!isAuthenticated) {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/admin/login';
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/admin/:path*', '/api/admin/:path*'],
};
