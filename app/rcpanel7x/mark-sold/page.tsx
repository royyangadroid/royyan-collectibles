'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function MarkSoldPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const collectionNumber = formData.get('collectionNumber') as string;

    try {
      const res = await fetch('/api/admin/catalog/mark-sold', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collectionNumber }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to mark item as sold');
      }

      setSuccess(`Koleksi ${collectionNumber} berhasil ditandai sebagai Terjual dan di-push ke GitHub!`);
      form.reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 lg:px-8 space-y-8">
      <Link href="/rcpanel7x" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-gold transition">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Dashboard
      </Link>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
        <h1 className="font-serif text-2xl font-semibold text-parchment-100">Mark Item as Sold</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Ubah status produk menjadi "Sold" dan tambahkan ke histori terjual secara langsung di GitHub.
        </p>

        {error && (
          <div className="mt-6 p-4 rounded-lg bg-red-950/50 border border-red-900 text-red-200 text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mt-6 p-4 rounded-lg bg-emerald-950/50 border border-emerald-900 text-emerald-200 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Collection Number (e.g. RC-037)</label>
            <input 
              required 
              name="collectionNumber" 
              type="text" 
              placeholder="RC-XXX"
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-parchment-100 focus:border-gold focus:outline-none" 
            />
            <p className="text-xs text-zinc-500 mt-1">Pastikan Collection Number sama persis dengan yang ada di katalog.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
            {loading ? 'Pushing to GitHub...' : 'Mark as Sold'}
          </button>
        </form>
      </div>
    </div>
  );
}
