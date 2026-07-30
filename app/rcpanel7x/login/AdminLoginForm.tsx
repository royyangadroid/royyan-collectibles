'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LockKeyhole, ShieldCheck, User } from 'lucide-react';

interface AdminLoginFormProps {
  accessKey?: string;
  redirectTo?: string;
}

export default function AdminLoginForm({ accessKey, redirectTo }: AdminLoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/rcpanel7x/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, accessKey }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Login gagal');
      }

      const fallbackRedirect = redirectTo || searchParams.get('redirect') || '/rcpanel7x';
      await router.push(fallbackRedirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(201,151,43,0.16),_transparent_60%),linear-gradient(135deg,_#09090b,_#111827)] px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-gold/20 bg-zinc-900/80 p-8 shadow-2xl shadow-black/50 backdrop-blur">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Private Access</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-parchment-100">Admin Login</h1>
          <p className="mt-3 text-sm text-zinc-400">Masuk untuk melihat dashboard dan invoice generator internal.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm text-zinc-300">
            Username
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950/70 px-3 py-3">
              <User className="h-4 w-4 text-gold" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ketik username"
                className="w-full bg-transparent text-sm outline-none"
                required
              />
            </div>
          </label>
          <label className="block text-sm text-zinc-300">
            Password
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950/70 px-3 py-3">
              <LockKeyhole className="h-4 w-4 text-gold" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ketik password admin"
                className="w-full bg-transparent text-sm outline-none"
                required
              />
            </div>
          </label>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-70 mt-6"
          >
            {loading ? 'Memproses...' : 'Masuk ke Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
