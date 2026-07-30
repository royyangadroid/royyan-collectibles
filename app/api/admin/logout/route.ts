import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.redirect('/admin/login');
  response.cookies.set({
    name: 'rc_admin_auth',
    value: '',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
  });
  return response;
}
