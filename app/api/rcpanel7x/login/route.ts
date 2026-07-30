import { NextResponse } from 'next/server';

const adminAuthCookie = 'rc_admin_auth';
const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
const expectedPassword = process.env.ADMIN_PASSWORD || 'Chernenko2!';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = typeof body?.username === 'string' ? body.username : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    const accessKey = typeof body?.accessKey === 'string' ? body.accessKey : '';
    const expectedAccessKey = process.env.ADMIN_ACCESS_KEY ?? 'royyan-admin-secret-7x';

    if (accessKey !== expectedAccessKey) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (username !== expectedUsername || password !== expectedPassword) {
      return NextResponse.json({ ok: false, error: 'Username atau password salah' }, { status: 401 });
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
