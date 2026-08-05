'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, RotateCcw, CheckCircle2, Eye, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import type { CollectibleItem } from '@/lib/data';
import AdminPreview from '@/components/AdminPreview';

export default function ManageInventoryClient({ initialItems }: { initialItems: CollectibleItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  
  // Preview Modal State
  const [previewItem, setPreviewItem] = useState<CollectibleItem | null>(null);
  const [previewMode, setPreviewMode] = useState<'card' | 'detail'>('card');

  const handleAction = async (action: 'mark-sold' | 'undo-sold' | 'delete', collectionNumber: string) => {
    if (action === 'delete') {
      const confirmDelete = window.confirm(`WARNING! Anda yakin ingin menghapus folder produk ${collectionNumber} secara permanen dari GitHub? Ini tidak bisa dibatalkan.`);
      if (!confirmDelete) return;
    } else {
      const confirmAction = window.confirm(`Lanjutkan dengan aksi ${action} untuk ${collectionNumber}?`);
      if (!confirmAction) return;
    }

    setLoadingAction(`${action}-${collectionNumber}`);
    
    try {
      const method = action === 'delete' ? 'DELETE' : 'PUT';
      const res = await fetch(`/api/admin/catalog/${action}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collectionNumber })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');

      alert(data.message);

      // Optimistic UI update
      if (action === 'delete') {
        setItems(items.filter(item => item.collectionNumber !== collectionNumber));
      } else if (action === 'mark-sold') {
        setItems(items.map(item => item.collectionNumber === collectionNumber ? { ...item, status: 'Sold' } : item));
      } else if (action === 'undo-sold') {
        setItems(items.map(item => item.collectionNumber === collectionNumber ? { ...item, status: 'Available' } : item));
      }
      
      router.refresh();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 space-y-8 relative">
      <Link href="/rcpanel7x" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-gold transition">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Dashboard
      </Link>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 overflow-hidden">
        <h1 className="font-serif text-2xl font-semibold text-parchment-100">Manage Inventory</h1>
        <p className="mt-2 text-sm text-zinc-400 mb-8">
          Daftar seluruh item yang tersimpan di repositori. 
          <span className="block mt-1 text-xs text-amber-500/80">
            Catatan: Perubahan status dan hapus item di sini akan langsung di-push ke GitHub. Lakukan 'git pull' di lokal Anda untuk sinkronisasi file.
          </span>
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="text-xs uppercase text-zinc-500 border-b border-zinc-800 bg-zinc-950/50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">ID</th>
                <th scope="col" className="px-6 py-4 font-medium">Image</th>
                <th scope="col" className="px-6 py-4 font-medium">Title</th>
                <th scope="col" className="px-6 py-4 font-medium">Category</th>
                <th scope="col" className="px-6 py-4 font-medium">Status</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-zinc-300">{item.collectionNumber}</td>
                  <td className="px-6 py-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-md border border-zinc-700" />
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-200 line-clamp-2 max-w-[200px]">{item.title}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">
                    {item.status === 'Sold' ? (
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-red-950/60 text-red-400 border border-red-900">Sold Out</span>
                    ) : (
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-900">Available</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    <button 
                      onClick={() => setPreviewItem(item)}
                      className="p-2 text-zinc-400 hover:text-gold hover:bg-zinc-800 rounded-md transition"
                      title="Live Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    {item.status === 'Available' ? (
                      <button 
                        onClick={() => handleAction('mark-sold', item.collectionNumber)}
                        disabled={loadingAction === `mark-sold-${item.collectionNumber}`}
                        className="p-2 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-950/30 rounded-md transition disabled:opacity-50"
                        title="Mark as Sold"
                      >
                        {loadingAction === `mark-sold-${item.collectionNumber}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleAction('undo-sold', item.collectionNumber)}
                        disabled={loadingAction === `undo-sold-${item.collectionNumber}`}
                        className="p-2 text-zinc-400 hover:text-amber-400 hover:bg-amber-950/30 rounded-md transition disabled:opacity-50"
                        title="Undo Sold"
                      >
                        {loadingAction === `undo-sold-${item.collectionNumber}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
                      </button>
                    )}

                    <button 
                      onClick={() => handleAction('delete', item.collectionNumber)}
                      disabled={loadingAction === `delete-${item.collectionNumber}`}
                      className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-950/30 rounded-md transition disabled:opacity-50"
                      title="Delete from GitHub"
                    >
                      {loadingAction === `delete-${item.collectionNumber}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-y-auto custom-scrollbar p-6 shadow-2xl flex flex-col">
            
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
              <h2 className="text-xl font-serif font-semibold text-parchment-100">Live Preview: {previewItem.collectionNumber}</h2>
              <div className="flex items-center gap-4">
                <div className="flex bg-zinc-950 rounded-lg p-1 border border-zinc-800">
                  <button 
                    onClick={() => setPreviewMode('card')}
                    className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${previewMode === 'card' ? 'bg-zinc-800 text-gold' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Card View
                  </button>
                  <button 
                    onClick={() => setPreviewMode('detail')}
                    className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${previewMode === 'detail' ? 'bg-zinc-800 text-gold' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Detail View
                  </button>
                </div>
                <button onClick={() => setPreviewItem(null)} className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <AdminPreview 
                data={{
                  ...previewItem,
                  coverUrl: previewItem.image,
                }} 
                mode={previewMode} 
              />
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
