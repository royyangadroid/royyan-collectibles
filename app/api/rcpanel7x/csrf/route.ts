// app/api/rcpanel7x/csrf/route.ts
// Issues a CSRF token as an HttpOnly cookie + returns it in JSON.
// The login form fetches this on mount and includes it in the POST body.

import { NextResponse } from 'next/server';
import {
  generateCsrfToken,
  CSRF_COOKIE_NAME,
  CSRF_COOKIE_OPTIONS,
} from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(): Promise<NextResponse> {
  const token = generateCsrfToken();

  const response = NextResponse.json({ csrfToken: token });
  response.cookies.set({
    name: CSRF_COOKIE_NAME,
    value: token,
    ...CSRF_COOKIE_OPTIONS,
  });

  return response;
}
