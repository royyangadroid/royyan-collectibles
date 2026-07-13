import { getAllCollectibles } from '@/lib/data';
import CatalogClient from '@/components/CatalogClient';
import { Sparkles } from 'lucide-react';

export default function CatalogPage() {
  const items = getAllCollectibles();

  return (
    <section className="py-24 bg-zinc-950 min-h-screen">
      <div className="container-vintage">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/60" aria-hidden="true" />
            <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-gold">Katalog Lengkap</p>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/60" aria-hidden="true" />
          </div>
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-parchment-100">
            Seluruh <span className="italic text-gold">Koleksi</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mt-6" aria-hidden="true">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/20" />
            <Sparkles className="w-3 h-3 text-gold/40" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/20" />
          </div>
        </div>

        <CatalogClient items={items} />
      </div>
    </section>
  );
}
