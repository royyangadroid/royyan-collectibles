import { NextResponse } from 'next/server';

const adminAuthCookie = 'rc_admin_auth';
const expectedPassword = process.env.ADMIN_PASSWORD || 'royyan-admin-2026';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = typeof body?.password === 'string' ? body.password : '';

    if (password !== expectedPassword) {
      return NextResponse.json({ ok: false, error: 'Password salah' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true, message: 'Login berhasil' });
    response.cookies.set({
      name: adminAuthCookie,
      value: 'true',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json({ ok: false, error: 'Request tidak valid' }, { status: 400 });
  }
}
