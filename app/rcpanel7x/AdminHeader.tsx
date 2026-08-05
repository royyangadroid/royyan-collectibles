'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, LayoutDashboard, UploadCloud, Package } from 'lucide-react';
import LogoutButton from './LogoutButton';

export default function AdminHeader() {
  const pathname = usePathname();
  if (pathname === '/rcpanel7x/login' || pathname.startsWith('/rcpanel7x/login?')) {
    return null;
  }

  return (
    <header className="border-b border-zinc-800 bg-zinc-900/80 sticky top-0 z-50 print-hidden shadow-lg backdrop-blur-md">
      <div className="flex h-16 w-full items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <h2 className="font-serif text-xl font-semibold text-parchment-100">Admin Control</h2>
          <span className="hidden sm:inline rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-widest text-gold border border-gold/20">
            Admin Portal
          </span>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link href="/rcpanel7x" className="flex items-center gap-2 rounded-lg px-2 sm:px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800/50 hover:text-gold">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
          <Link href="/rcpanel7x/upload" className="flex items-center gap-2 rounded-lg px-2 sm:px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800/50 hover:text-gold">
            <UploadCloud className="h-4 w-4" />
            <span className="hidden md:inline">Upload</span>
          </Link>
          <Link href="/rcpanel7x/manage" className="flex items-center gap-2 rounded-lg px-2 sm:px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800/50 hover:text-gold">
            <Package className="h-4 w-4" />
            <span className="hidden md:inline">Manage</span>
          </Link>
          <Link href="/rcpanel7x/invoices" className="flex items-center gap-2 rounded-lg px-2 sm:px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800/50 hover:text-gold">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Invoices</span>
          </Link>
          <div className="h-6 w-px bg-zinc-800 mx-1" />
          <LogoutButton />
        </nav>
      </div>
    </header>
  );
}
