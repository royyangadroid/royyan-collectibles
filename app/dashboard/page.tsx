import { getAllCollectibles } from '@/lib/data';
import { getInventoryReport } from '@/lib/reports';
import Link from 'next/link';
import { Box, CheckCircle2, Clock3, PackageOpen, TrendingUp, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Dashboard Inventory',
};

export default function DashboardPage() {
  const items = getAllCollectibles();
  const report = getInventoryReport(items);

  return (
    <section className="min-h-screen bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Inventory Dashboard</p>
            <h1 className="font-serif text-4xl font-bold text-parchment-100">Laporan Produk & Status Penjualan</h1>
            <p className="mt-3 max-w-2xl text-sm text-zinc-400">
              Ringkasan cepat inventory koleksi, status available, reserved, dan sold berdasarkan data katalog utama.
            </p>
          </div>
          <Link href="/catalog" className="inline-flex items-center gap-2 rounded-sm border border-gold/30 px-4 py-2 text-sm font-medium text-gold transition hover:border-gold hover:bg-gold/10">
            Lihat Katalog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-400">Total Produk</p>
              <PackageOpen className="h-5 w-5 text-gold" />
            </div>
            <p className="text-3xl font-semibold text-parchment-100">{report.totalProducts}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-400">Available</p>
              <Box className="h-5 w-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-semibold text-parchment-100">{report.available}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-400">Reserved</p>
              <Clock3 className="h-5 w-5 text-amber-400" />
            </div>
            <p className="text-3xl font-semibold text-parchment-100">{report.reserved}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-400">Sold</p>
              <CheckCircle2 className="h-5 w-5 text-rose-400" />
            </div>
            <p className="text-3xl font-semibold text-parchment-100">{report.sold}</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-parchment-100">Per Kategori</h2>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <TrendingUp className="h-4 w-4 text-gold" />
                Ringkasan stok
              </div>
            </div>
            <div className="space-y-4">
              {report.categories.map((category) => (
                <div key={category.name} className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-medium text-parchment-100">{category.name}</p>
                    <p className="text-sm text-zinc-400">{category.count} item</p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-gold to-amber-400" style={{ width: `${Math.max(10, (category.count / Math.max(report.totalProducts, 1)) * 100)}%` }} />
                  </div>
                  <p className="mt-2 text-sm text-zinc-500">Sold: {category.sold}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
              <h2 className="mb-4 text-xl font-semibold text-parchment-100">Produk Terbaru</h2>
              <div className="space-y-3">
                {report.latestItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-3">
                    <div>
                      <p className="text-sm font-medium text-parchment-100">{item.title}</p>
                      <p className="text-xs text-zinc-500">{item.collectionNumber}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs ${item.status === 'Sold' ? 'bg-rose-500/15 text-rose-300' : 'bg-emerald-500/15 text-emerald-300'}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
              <h2 className="mb-4 text-xl font-semibold text-parchment-100">Produk Terjual</h2>
              <div className="space-y-3">
                {report.soldItems.slice(0, 6).map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-3">
                    <div>
                      <p className="text-sm font-medium text-parchment-100">{item.title}</p>
                      <p className="text-xs text-zinc-500">{item.collectionNumber}</p>
                    </div>
                    <span className="text-sm text-gold">{item.price.toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
