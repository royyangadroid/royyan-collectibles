'use client';

import { useState, useMemo } from 'react';
import { ArrowLeft, CheckCircle2, Search, X, Loader2, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import type { CollectibleItem } from '@/lib/data';

const STATUS_BADGE_CLASS: Record<string, string> = {
  Available: 'bg-emerald-950/60 text-emerald-400 border border-emerald-900',
  Sold: 'bg-red-950/60 text-red-400 border border-red-900',
  Reserved: 'bg-amber-950/60 text-amber-400 border border-amber-900',
};

export default function MarkSoldClient({ items }: { items: CollectibleItem[] }) {
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<CollectibleItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionResult, setActionResult] = useState<{ ok: boolean; message: string } | null>(null);

  // Live items mirror for optimistic UI
  const [itemStatuses, setItemStatuses] = useState<Record<string, string>>(
    Object.fromEntries(items.map((i) => [i.collectionNumber, i.status]))
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.collectionNumber.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, items]);

  const handleAction = async (action: 'mark-sold' | 'undo-sold', item: CollectibleItem) => {
    setLoading(true);
    setActionResult(null);
    const method = 'PUT';
    const endpoint = `/api/admin/catalog/${action}`;

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collectionNumber: item.collectionNumber }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');

      // Optimistic update
      setItemStatuses((prev) => ({
        ...prev,
        [item.collectionNumber]: action === 'mark-sold' ? 'Sold' : 'Available',
      }));
      if (selectedItem?.collectionNumber === item.collectionNumber) {
        setSelectedItem({ ...item, status: action === 'mark-sold' ? 'Sold' : 'Available' } as any);
      }

      setActionResult({ ok: true, message: data.message });
    } catch (err: any) {
      setActionResult({ ok: false, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const currentStatus = selectedItem ? (itemStatuses[selectedItem.collectionNumber] ?? selectedItem.status) : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:px-8 space-y-8">
      <Link href="/rcpanel7x" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-gold transition">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Dashboard
      </Link>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
        <h1 className="font-serif text-2xl font-semibold text-parchment-100">Mark Item as Sold</h1>
        <p className="mt-2 text-sm text-zinc-400 mb-6">
          Cari item dari katalog menggunakan nama, ID koleksi, atau kategori. Klik item untuk memilihnya.
        </p>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Cari item... (e.g. RC-037, Hot Wheels, Komik)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-10 py-3 text-sm text-parchment-100 placeholder:text-zinc-600 focus:border-gold focus:outline-none transition"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Result count */}
        <p className="text-xs text-zinc-500 mb-3">
          {filtered.length} item ditemukan {query && `untuk pencarian "${query}"`}
        </p>

        {/* Item List */}
        <div className="overflow-y-auto max-h-96 rounded-xl border border-zinc-800 divide-y divide-zinc-800">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-zinc-600">
              <Search className="w-8 h-8 mb-3 opacity-40" />
              <p className="text-sm">Tidak ada item ditemukan</p>
            </div>
          ) : (
            filtered.map((item) => {
              const status = itemStatuses[item.collectionNumber] ?? item.status;
              const isSelected = selectedItem?.collectionNumber === item.collectionNumber;
              return (
                <div
                  key={item.collectionNumber}
                  onClick={() => setSelectedItem(item)}
                  className={`flex items-center gap-4 px-4 py-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-gold/10 border-l-2 border-gold' : 'hover:bg-zinc-800/60'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 rounded-md object-cover border border-zinc-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-zinc-400">{item.collectionNumber}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE_CLASS[status] ?? 'bg-zinc-800 text-zinc-400'}`}>
                        {status}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-parchment-100 truncate mt-0.5">{item.title}</p>
                    <p className="text-xs text-zinc-500">{item.category} · {item.condition}</p>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Action Panel — only shows when item is selected */}
      {selectedItem && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 space-y-6">
          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700 shrink-0"
            />
            <div>
              <p className="text-xs font-mono text-zinc-500">{selectedItem.collectionNumber}</p>
              <h2 className="text-lg font-serif font-semibold text-parchment-100 mt-1">{selectedItem.title}</h2>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-xs text-zinc-400">{selectedItem.category}</span>
                <span className="text-zinc-700">·</span>
                <span className="text-xs text-zinc-400">{selectedItem.condition}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ml-1 ${STATUS_BADGE_CLASS[currentStatus ?? 'Available'] ?? 'bg-zinc-800 text-zinc-400'}`}>
                  {currentStatus}
                </span>
              </div>
              <p className="text-sm font-semibold text-gold mt-1">
                Rp {selectedItem.price.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {actionResult && (
            <div className={`p-4 rounded-lg text-sm border ${actionResult.ok ? 'bg-emerald-950/50 border-emerald-900 text-emerald-200' : 'bg-red-950/50 border-red-900 text-red-200'}`}>
              {actionResult.message}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            {currentStatus !== 'Sold' ? (
              <button
                onClick={() => handleAction('mark-sold', selectedItem)}
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                {loading ? 'Pushing to GitHub...' : 'Mark as Sold'}
              </button>
            ) : (
              <button
                onClick={() => handleAction('undo-sold', selectedItem)}
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm font-semibold text-amber-400 transition hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RotateCcw className="w-5 h-5" />}
                {loading ? 'Pushing to GitHub...' : 'Undo Sold → Set Available'}
              </button>
            )}
            <button
              onClick={() => { setSelectedItem(null); setActionResult(null); }}
              className="px-4 py-3 rounded-lg border border-zinc-800 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition"
            >
              Batal
            </button>
          </div>

          <p className="text-[11px] text-zinc-600">
            Perubahan ini akan langsung di-push ke GitHub dan data lokal akan di-sync otomatis.
          </p>
        </div>
      )}
    </div>
  );
}
