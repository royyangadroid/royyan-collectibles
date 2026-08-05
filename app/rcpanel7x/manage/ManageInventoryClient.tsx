'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { ArrowLeft, Trash2, RotateCcw, CheckCircle2, Eye, Loader2, X, AlertTriangle, Search } from 'lucide-react';
import Link from 'next/link';
import type { CollectibleItem } from '@/lib/data';
import AdminPreview from '@/components/AdminPreview';

const CATEGORY_COLORS: Record<string, string> = {
  'Hot Wheels': 'bg-yellow-900/80 text-yellow-200',
  'Komik': 'bg-amber-950/80 text-amber-200',
  'Uang Kuno & Perangko': 'bg-red-900/80 text-red-200',
  'PlayStation': 'bg-blue-900/80 text-blue-200',
};

const CONDITION_COLORS: Record<string, string> = {
  'Mint': 'bg-emerald-900/80 text-emerald-200',
  'Sealed': 'bg-emerald-900/80 text-emerald-200',
  'Near Mint': 'bg-teal-900/80 text-teal-200',
  'Excellent': 'bg-cyan-900/80 text-cyan-200',
  'Good': 'bg-amber-800/80 text-amber-200',
  'Fair': 'bg-zinc-700/80 text-zinc-200',
  'Loose': 'bg-orange-900/80 text-orange-200',
};

const getCategoryColor = (cat: string) => CATEGORY_COLORS[cat] || 'bg-zinc-800 text-zinc-300';
const getConditionColor = (cond: string) => {
  const key = Object.keys(CONDITION_COLORS).find(k => cond.includes(k));
  return key ? CONDITION_COLORS[key] : 'bg-zinc-800 text-zinc-300';
};

// ─── Confirm Delete Modal (Portal) ────────────────────────────────────────────
function ConfirmDeleteModal({
  collectionNumber,
  title,
  onConfirm,
  onCancel,
}: {
  collectionNumber: string;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 p-2.5 rounded-full bg-red-950/60 border border-red-900">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <h3 className="text-lg font-serif font-semibold text-parchment-100">Hapus Produk?</h3>
        </div>
        <p className="text-sm text-zinc-400 mb-2">
          Anda akan menghapus folder produk berikut dari repositori GitHub secara <span className="text-red-400 font-semibold">permanen</span>:
        </p>
        <div className="my-4 p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-sm">
          <span className="text-zinc-500 font-mono">{collectionNumber}</span>
          <span className="mx-2 text-zinc-700">—</span>
          <span className="text-zinc-300">{title}</span>
        </div>
        <p className="text-xs text-amber-500/80 mb-6">
          Tindakan ini tidak dapat dibatalkan. File <code>data.json</code> dan <code>cover.jpg</code> akan dihapus dari Git tree.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-lg border border-zinc-700 text-sm text-zinc-300 hover:border-zinc-500 hover:text-white transition"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-lg bg-red-700 hover:bg-red-600 text-sm font-semibold text-white transition"
          >
            Ya, Hapus Permanen
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Preview Modal (Portal) ────────────────────────────────────────────────────
function PreviewModal({
  item,
  onClose,
}: {
  item: CollectibleItem;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<'card' | 'detail'>('card');

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm py-8 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-5xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900 rounded-t-2xl">
          <h2 className="text-base font-serif font-semibold text-parchment-100">
            Preview: <span className="font-mono text-gold">{item.collectionNumber}</span>
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex bg-zinc-950 rounded-lg p-1 border border-zinc-800">
              <button
                onClick={() => setMode('card')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${mode === 'card' ? 'bg-zinc-800 text-gold' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Card
              </button>
              <button
                onClick={() => setMode('detail')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${mode === 'detail' ? 'bg-zinc-800 text-gold' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Detail
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition"
              title="Tutup (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <AdminPreview
            data={{ ...item, coverUrl: item.image, tags: [], featured: false, badge: item.badge || '' }}
            mode={mode}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function ManageInventoryClient({ initialItems }: { initialItems: CollectibleItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [previewItem, setPreviewItem] = useState<CollectibleItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CollectibleItem | null>(null);
  const [toastMsg, setToastMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const showToast = (ok: boolean, text: string) => {
    setToastMsg({ ok, text });
    setTimeout(() => setToastMsg(null), 4000);
  };

  const filtered = items
    .filter((item) => {
      const q = searchQuery.toLowerCase();
      return (
        !q ||
        item.collectionNumber.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      // 1. Sort "Available" items above "Sold" items
      if (a.status === 'Available' && b.status === 'Sold') return -1;
      if (a.status === 'Sold' && b.status === 'Available') return 1;
      
      // 2. If same status, sort by collectionNumber (descending so newer items are top)
      return b.collectionNumber.localeCompare(a.collectionNumber, undefined, { numeric: true });
    });

  const handleAction = async (action: 'mark-sold' | 'undo-sold' | 'delete', collectionNumber: string) => {
    setLoadingAction(`${action}-${collectionNumber}`);
    setDeleteTarget(null);

    // 1. TRUE OPTIMISTIC UI: Save previous state for rollback
    const previousItems = [...items];

    // 2. Apply optimistic updates immediately
    if (action === 'delete') {
      setItems((prev) => prev.filter((item) => item.collectionNumber !== collectionNumber));
      setPreviewItem((p) => (p?.collectionNumber === collectionNumber ? null : p));
    } else if (action === 'mark-sold') {
      setItems((prev) =>
        prev.map((item) =>
          item.collectionNumber === collectionNumber ? { ...item, status: 'Sold' as const } : item
        )
      );
    } else if (action === 'undo-sold') {
      setItems((prev) =>
        prev.map((item) =>
          item.collectionNumber === collectionNumber ? { ...item, status: 'Available' as const } : item
        )
      );
    }

    try {
      const method = action === 'delete' ? 'DELETE' : 'PUT';
      const res = await fetch(`/api/admin/catalog/${action}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collectionNumber }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');

      // 3. Confirm success
      showToast(true, 'Perubahan berhasil disinkronkan ke GitHub!');
      
      // Note: We intentionally DO NOT call router.refresh() here. 
      // Vercel takes ~1 min to rebuild the static JSON data. 
      // Calling refresh() now would fetch the OLD data and undo our optimistic UI.
    } catch (err: any) {
      // 4. ROLLBACK ON FAILURE
      setItems(previousItems);
      showToast(false, `Gagal: ${err.message}. Status dikembalikan.`);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 space-y-8">
      <Link href="/rcpanel7x" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-gold transition">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Dashboard
      </Link>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-parchment-100">Manage Inventory</h1>
            <p className="mt-1 text-sm text-zinc-400">
              {items.length} item total · {items.filter(i => i.status === 'Available').length} tersedia · {items.filter(i => i.status === 'Sold').length} terjual
            </p>
          </div>
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Cari item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-2 text-sm text-parchment-100 placeholder:text-zinc-600 focus:border-gold focus:outline-none transition"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/40 shadow-xl">
          <table className="w-full text-left text-zinc-400">
            <thead className="text-xs uppercase tracking-widest text-zinc-500 border-b border-zinc-800 bg-zinc-900/80">
              <tr>
                <th className="px-6 py-5 font-semibold">ID</th>
                <th className="px-6 py-5 font-semibold">Cover</th>
                <th className="px-6 py-5 font-semibold">Title</th>
                <th className="px-6 py-5 font-semibold hidden md:table-cell">Tags</th>
                <th className="px-6 py-5 font-semibold">Status</th>
                <th className="px-6 py-5 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-zinc-500 text-base">
                    Tidak ada item ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/40 transition-colors group">
                    <td className="px-6 py-5 font-mono text-sm font-medium text-gold whitespace-nowrap">{item.collectionNumber}</td>
                    <td className="px-6 py-5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <div className="w-16 h-16 rounded-xl border border-zinc-700 bg-zinc-900 p-1 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-gold/50 transition-colors">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain drop-shadow-md"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-5 font-medium text-zinc-100 max-w-[220px]">
                      <p className="line-clamp-2 text-base leading-snug">{item.title}</p>
                    </td>
                    <td className="px-6 py-5 hidden md:table-cell">
                      <div className="flex flex-col items-start gap-2">
                        <span className={`px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md shadow-sm ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                        <span className={`px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md shadow-sm ${getConditionColor(item.condition)}`}>
                          {item.condition}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {item.status === 'Sold' ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-full bg-red-950/80 text-red-400 border border-red-900 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                          Sold
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-900 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          Available
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="inline-flex items-center gap-2">
                        {/* Mark/Undo Sold */}
                        {item.status === 'Available' ? (
                          <button
                            onClick={() => handleAction('mark-sold', item.collectionNumber)}
                            disabled={!!loadingAction}
                            className="p-2.5 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-950/50 rounded-xl transition disabled:opacity-40 border border-transparent hover:border-emerald-900 shadow-sm"
                            title="Mark as Sold"
                          >
                            {loadingAction === `mark-sold-${item.collectionNumber}`
                              ? <Loader2 className="w-5 h-5 animate-spin" />
                              : <CheckCircle2 className="w-5 h-5" />}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAction('undo-sold', item.collectionNumber)}
                            disabled={!!loadingAction}
                            className="p-2.5 text-zinc-400 hover:text-amber-400 hover:bg-amber-950/50 rounded-xl transition disabled:opacity-40 border border-transparent hover:border-amber-900 shadow-sm"
                            title="Undo Sold"
                          >
                            {loadingAction === `undo-sold-${item.collectionNumber}`
                              ? <Loader2 className="w-5 h-5 animate-spin" />
                              : <RotateCcw className="w-5 h-5" />}
                          </button>
                        )}

                        {/* Preview */}
                        <button
                          onClick={() => setPreviewItem(item)}
                          className="p-2.5 text-zinc-400 hover:text-gold hover:bg-zinc-800 rounded-xl transition border border-transparent hover:border-zinc-600 shadow-sm"
                          title="Preview"
                        >
                          <Eye className="w-5 h-5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteTarget(item)}
                          disabled={!!loadingAction}
                          className="p-2.5 text-zinc-400 hover:text-red-400 hover:bg-red-950/50 rounded-xl transition disabled:opacity-40 border border-transparent hover:border-red-900 shadow-sm"
                          title="Hapus dari GitHub"
                        >
                          {loadingAction === `delete-${item.collectionNumber}`
                            ? <Loader2 className="w-5 h-5 animate-spin" />
                            : <Trash2 className="w-5 h-5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Toast Notification ──────────────────────────── */}
      {toastMsg && (
        <div
          className={`fixed bottom-6 right-6 z-[9999] max-w-sm px-4 py-3 rounded-xl border shadow-2xl text-sm font-medium transition-all ${
            toastMsg.ok
              ? 'bg-emerald-950 border-emerald-800 text-emerald-200'
              : 'bg-red-950 border-red-800 text-red-200'
          }`}
        >
          {toastMsg.text}
        </div>
      )}

      {/* ── Preview Modal (Portal) ──────────────────────── */}
      {previewItem && (
        <PreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />
      )}

      {/* ── Confirm Delete Modal (Portal) ───────────────── */}
      {deleteTarget && (
        <ConfirmDeleteModal
          collectionNumber={deleteTarget.collectionNumber}
          title={deleteTarget.title}
          onConfirm={() => handleAction('delete', deleteTarget.collectionNumber)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
