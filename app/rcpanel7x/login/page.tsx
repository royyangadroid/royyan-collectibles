import AdminLoginForm from './AdminLoginForm';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface LoginPageProps {
  searchParams: { key?: string; redirect?: string };
}

const ADMIN_ACCESS_KEY = process.env.ADMIN_ACCESS_KEY ?? 'royyan-admin-secret-7x';

export default function AdminLoginPage({ searchParams }: LoginPageProps) {
  const redirectTo = searchParams.redirect;

  if (searchParams.key !== ADMIN_ACCESS_KEY) {
    const redirectUrl = `/rcpanel7x/login?key=${encodeURIComponent(ADMIN_ACCESS_KEY)}${redirectTo ? `&redirect=${encodeURIComponent(redirectTo)}` : ''}`;
    redirect(redirectUrl);
  }

  return <AdminLoginForm accessKey={ADMIN_ACCESS_KEY} redirectTo={redirectTo} />;
}
