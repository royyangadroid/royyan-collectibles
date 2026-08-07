import Image from 'next/image';
import Link from 'next/link';
import type { CollectibleItem } from '@/lib/data';
import { PriceDisplay } from './PriceDisplay';

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
          loading="eager"
          fetchPriority="high"
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${isSold ? 'brightness-[0.35]' : ''}`}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

        {/* Badge */}
        {item.badge && !isSold && (
          <span className={`absolute top-4 left-4 px-3 py-1.5 text-[10px] font-sans font-bold tracking-[0.15em] uppercase rounded-sm ${BADGE_COLORS[item.badge] ?? 'bg-zinc-800/90 text-zinc-200'}`}>
            {item.badge}
          </span>
        )}

        {/* Collection Number */}
        <span className="absolute bottom-4 right-4 px-2 py-1 text-[10px] font-mono bg-black/70 text-gold/80 tracking-widest border border-gold/20 rounded-sm">
          {item.collectionNumber}
        </span>

        {/* ===== CONCEPT 3: Diagonal Sold Ribbon ===== */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            {/* Dark overlay for extra dimming */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Diagonal ribbon */}
            <div
              className="absolute flex flex-col items-center justify-center gap-0.5 py-2.5 sm:py-3"
              style={{
                width: '150%',
                transform: 'rotate(-35deg)',
                background: 'linear-gradient(90deg, #450a0a 0%, #991b1b 30%, #b91c1c 50%, #991b1b 70%, #450a0a 100%)',
                borderTop: '1.5px solid rgba(217, 169, 60, 0.45)',
                borderBottom: '1.5px solid rgba(217, 169, 60, 0.45)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.6), 0 0 20px rgba(153,27,27,0.3)',
              }}
            >
              <span className="font-serif font-black text-base sm:text-xl md:text-2xl text-white tracking-[0.25em] uppercase drop-shadow-lg leading-none">
                SOLD OUT
              </span>
              <span className="font-sans text-[8px] sm:text-[10px] text-amber-300/90 tracking-[0.3em] uppercase leading-none mt-0.5">
                THANK YOU
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {/* Category & Condition */}
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-gold/70">{item.category}</span>
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-zinc-500">{item.condition}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-semibold text-parchment-100 text-sm md:text-base mb-2 line-clamp-2 leading-snug group-hover:text-gold transition-colors duration-300">
          {item.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-[11px] md:text-xs text-zinc-500 line-clamp-2 mb-4 md:mb-5 leading-relaxed">{item.description}</p>

        {/* Price & CTA / Sold Out Box */}
        {isSold ? (
          <div className="flex flex-col items-center justify-center pt-3 md:pt-4 border-t border-red-900/30 mt-auto">
            <div className="w-full flex flex-col items-center gap-1.5 py-3 px-4 rounded-sm bg-gradient-to-r from-red-950/80 via-red-900/60 to-red-950/80 border border-red-800/40">
              <span className="font-serif font-black text-sm md:text-base text-red-400 tracking-[0.2em] uppercase">
                SOLD OUT
              </span>
              <span className="font-sans text-[9px] md:text-[10px] text-zinc-500 text-center leading-snug">
                This product is no longer available.
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 md:pt-4 border-t border-gold/10 mt-auto gap-3 sm:gap-0">
            <div>
              <p className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-zinc-600 mb-0.5">Price</p>
              <p className="font-serif font-bold text-sm sm:text-base md:text-lg text-gold whitespace-nowrap"><PriceDisplay price={item.price} /></p>
            </div>

            <span className="font-sans w-full sm:w-auto text-center text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-gold/60 border border-gold/30 px-3 py-1.5 md:px-4 md:py-2 rounded-sm group-hover:bg-gold group-hover:text-zinc-950 transition-all duration-300">
              Detail
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
