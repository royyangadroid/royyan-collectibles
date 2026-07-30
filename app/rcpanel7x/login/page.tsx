import AdminLoginForm from './AdminLoginForm';
import { notFound } from 'next/navigation';

interface LoginPageProps {
  searchParams: { key?: string; redirect?: string };
}

const ADMIN_ACCESS_KEY = process.env.ADMIN_ACCESS_KEY ?? 'royyan-admin-secret-7x';

export default function AdminLoginPage({ searchParams }: LoginPageProps) {
  if (searchParams.key !== ADMIN_ACCESS_KEY) {
    return notFound();
  }

  return <AdminLoginForm accessKey={searchParams.key} redirectTo={searchParams.redirect} />;
}
