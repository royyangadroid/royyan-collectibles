import { getAllCollectibles } from '@/lib/data';
import { getInventoryReport } from '@/lib/reports';
import Link from 'next/link';
import { ArrowRight, Box, CheckCircle2, Clock3, PackageOpen, TrendingUp, DollarSign } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard',
};

export default function AdminPage() {
  const report = getInventoryReport(getAllCollectibles());

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 space-y-8">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Admin Overview</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-parchment-100">Internal Dashboard</h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-400">
          This page is for internal use only. Monitor product status, sold items, inventory value, and access the invoice generator here.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-400">Total Products</p>
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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
          <p className="text-sm font-medium text-zinc-400">Total Inventory Value</p>
          <p className="mt-4 text-2xl font-semibold text-parchment-100">IDR {report.totalValue.toLocaleString('id-ID')}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
          <p className="text-sm font-medium text-zinc-400">Value Unsold</p>
          <p className="mt-4 text-2xl font-semibold text-parchment-100">IDR {report.availableValue.toLocaleString('id-ID')}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
          <p className="text-sm font-medium text-zinc-400">Value Sold</p>
          <p className="mt-4 text-2xl font-semibold text-parchment-100">IDR {report.soldValue.toLocaleString('id-ID')}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-400">Quick Action</p>
            <DollarSign className="h-5 w-5 text-gold" />
          </div>
          <Link href="/rcpanel7x/invoices" className="inline-flex w-full items-center justify-center rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-gold/90">
            Open Invoice Generator
          </Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-parchment-100">By Category</h2>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <TrendingUp className="h-4 w-4 text-gold" />
              Stock summary
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

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
          <h2 className="mb-4 text-xl font-semibold text-parchment-100">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/rcpanel7x/invoices" className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-300 transition hover:border-gold/40 hover:text-gold">
              <span>Open Invoice Generator</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/catalog" className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-300 transition hover:border-gold/40 hover:text-gold">
              <span>View Public Catalog</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/rcpanel7x/upload" className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-300 transition hover:border-gold/40 hover:text-gold">
              <span>Upload New Catalog</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link href="/rcpanel7x/manage" className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-300 transition hover:border-gold/40 hover:text-gold">
              <span>Manage Inventory</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
