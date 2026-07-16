import Image from 'next/image';
import Link from 'next/link';
import type { CollectibleItem } from '@/lib/data';
import { formatPrice } from '@/lib/data';

const BADGE_COLORS: Record<string, string> = {
  'Rare Find': 'bg-red-900/90 text-red-100',
  'Featured': 'bg-amber-700/90 text-amber-100',
  'Limited': 'bg-purple-900/90 text-purple-100',
  'New Arrival': 'bg-emerald-900/90 text-emerald-100',
};

export default function ProductCard({ item }: { item: CollectibleItem }) {
  const isSold = item.status === 'Sold';

  return (
    <Link
      href={`/catalog/${item.slug}`}
      className="group block bg-zinc-950 border border-gold/20 relative overflow-hidden rounded-sm transition-all duration-500 hover:border-gold/50 hover:shadow-[0_0_40px_rgba(201,151,43,0.12)] hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${isSold ? 'grayscale opacity-60' : ''}`}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

        {/* Badge */}
        {item.badge && (
          <span className={`absolute top-4 left-4 px-3 py-1.5 text-[10px] font-sans font-bold tracking-[0.15em] uppercase rounded-sm ${BADGE_COLORS[item.badge] ?? 'bg-zinc-800/90 text-zinc-200'}`}>
            {item.badge}
          </span>
        )}

        {/* Collection Number */}
        <span className="absolute bottom-4 right-4 px-2 py-1 text-[10px] font-mono bg-black/70 text-gold/80 tracking-widest border border-gold/20 rounded-sm">
          {item.collectionNumber}
        </span>

        {/* Sold overlay */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="border-2 border-red-500/60 px-8 py-3 font-serif font-black text-2xl text-red-400 tracking-[0.3em] uppercase rotate-[-8deg]">
              SOLD
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      {/* Tambahkan p-4 md:p-6 agar di HP lebih lega tapi tetap ringkas */}
      <div className="p-4 md:p-6">
        {/* Category & Condition */}
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-gold/70">{item.category}</span>
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-zinc-500">{item.condition}</span>
        </div>

        {/* Title: Gunakan text-sm di HP agar tidak terlalu makan tempat */}
        <h3 className="font-serif font-semibold text-parchment-100 text-sm md:text-base mb-2 line-clamp-2 leading-snug group-hover:text-gold transition-colors duration-300">
          {item.title}
        </h3>

        {/* Description: Sembunyikan di HP kalau mau lebih bersih, atau kecilkan font-nya */}
        <p className="font-sans text-[11px] md:text-xs text-zinc-500 line-clamp-2 mb-4 md:mb-5 leading-relaxed">{item.description}</p>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gold/10 mt-auto">
          <div>
            <p className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-zinc-600 mb-0.5">Harga</p>
            <p className="font-serif font-bold text-base md:text-lg text-gold">{formatPrice(item.price)}</p>
          </div>

          {/* Tombol Detail: Dikasih ml-auto biar dia "dorong" diri sendiri ke kanan */}
          <span className="ml-2 font-sans text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-gold/60 border border-gold/30 px-3 py-1.5 md:px-4 md:py-2 rounded-sm group-hover:bg-gold group-hover:text-zinc-950 transition-all duration-300">
            Detail
          </span>
        </div>
      </div>
    </Link>
  );
}
