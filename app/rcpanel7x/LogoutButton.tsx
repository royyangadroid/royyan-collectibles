'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LogOut } from 'lucide-react';

const ADMIN_ACCESS_KEY = process.env.NEXT_PUBLIC_ADMIN_ACCESS_KEY ?? 'royyan-admin-secret-7x';
const adminLoginUrl = `/rcpanel7x/login?key=${encodeURIComponent(ADMIN_ACCESS_KEY)}`;

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch('/api/rcpanel7x/logout', {
        method: 'POST',
        credentials: 'same-origin',
      });

      if (!res.ok) {
        throw new Error('Logout failed');
      }

      router.push(adminLoginUrl);
    } catch (error) {
      console.error('Logout error:', error);
      router.push(adminLoginUrl);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-rose-500/10 hover:text-rose-400"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
}
