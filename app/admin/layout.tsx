import Link from 'next/link';
import { FileText, LayoutDashboard, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-parchment-100">
      <div className="mx-auto flex max-w-7xl flex-col px-4 py-6 lg:flex-row lg:px-8">
        <aside className="mb-6 w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 lg:mb-0 lg:mr-6 lg:w-72">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Admin Portal</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-parchment-100">Royyan Control</h2>
          </div>

          <nav className="space-y-2">
            <Link href="/admin" className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-3 text-sm text-zinc-300 transition hover:border-gold/40 hover:text-gold">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link href="/admin/invoices" className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-3 text-sm text-zinc-300 transition hover:border-gold/40 hover:text-gold">
              <FileText className="h-4 w-4" />
              Invoice Generator
            </Link>
            <form action="/api/admin/logout" method="POST" className="pt-2">
              <button type="submit" className="flex w-full items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-3 text-sm text-zinc-300 transition hover:border-rose-400/40 hover:text-rose-300">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </form>
          </nav>
        </aside>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
