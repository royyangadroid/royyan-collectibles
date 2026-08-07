'use client';

import { ShieldCheck, MessageCircle } from 'lucide-react';

export type PreviewData = {
  collectionNumber: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  badge: string;
  tags: string[];
  description: string;
  featured: boolean;
  coverUrl: string | null;
  status: string; // "Available" | "Sold"
};

export default function AdminPreview({ data, mode }: { data: PreviewData; mode: 'card' | 'detail' }) {
  const isSold = data.status === 'Sold';
  const BADGE_COLORS: Record<string, string> = {
    'Rare Find': 'bg-red-800 text-red-100',
    'Featured': 'bg-amber-700 text-amber-100',
    'Limited': 'bg-purple-800 text-purple-100',
    'New Arrival': 'bg-emerald-800 text-emerald-100',
    'Vintage': 'bg-stone-700 text-stone-100',
    'Best Seller': 'bg-blue-800 text-blue-100',
    'Restocked': 'bg-orange-700 text-orange-100',
  };

  const CATEGORY_COLORS: Record<string, string> = {
    'Hot Wheels': 'bg-yellow-900/80 text-yellow-200',
    'Komik': 'bg-amber-950/80 text-amber-200',
    'Uang Kuno & Perangko': 'bg-red-900/80 text-red-200',
    'Buku': 'bg-slate-800/80 text-slate-200',
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

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(data.price || 0);

  if (mode === 'card') {
    return (
      <div className="w-[300px] shrink-0 mx-auto pointer-events-none">
        <div className="group block bg-zinc-950 border border-gold/20 relative overflow-hidden rounded-sm transition-all duration-500 hover:border-gold/50 hover:shadow-[0_0_40px_rgba(201,151,43,0.12)] hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
            {data.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.coverUrl}
                alt={data.title}
                className={`object-contain w-full h-full transition-transform duration-700 group-hover:scale-105 ${isSold ? 'brightness-[0.35]' : ''}`}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-sm">No Image</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

            {/* Badge */}
            {data.badge && !isSold && (
              <span className={`absolute top-4 left-4 px-3 py-1.5 text-[10px] font-sans font-bold tracking-[0.15em] uppercase rounded-sm ${BADGE_COLORS[data.badge] ?? 'bg-zinc-800/90 text-zinc-200'}`}>
                {data.badge}
              </span>
            )}

            {/* Collection Number */}
            <span className="absolute bottom-4 right-4 px-2 py-1 text-[10px] font-mono bg-black/70 text-gold/80 tracking-widest border border-gold/20 rounded-sm">
              {data.collectionNumber || 'RC-XXX'}
            </span>

            {/* Sold Ribbon */}
            {isSold && (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-black/40" />
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
                  <span className="font-sans text-[10px] text-amber-300/90 tracking-[0.3em] uppercase leading-none mt-0.5">
                    THANK YOU
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2 md:mb-3 gap-2">
              <span className={`font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-sm ${getCategoryColor(data.category)}`}>
                {data.category || 'Category'}
              </span>
              <span className={`font-sans text-[9px] md:text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm ${getConditionColor(data.condition)}`}>
                {data.condition || 'Condition'}
              </span>
            </div>
            <h3 className="font-serif font-semibold text-parchment-100 text-sm md:text-base mb-2 line-clamp-2 leading-snug group-hover:text-gold transition-colors duration-300">
              {data.title || 'Product Title'}
            </h3>
            <p className="font-sans text-[11px] md:text-xs text-zinc-500 line-clamp-2 mb-4 md:mb-5 leading-relaxed">{data.description || 'Product description will appear here...'}</p>

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
                  <p className="font-serif font-bold text-sm sm:text-base md:text-lg text-gold whitespace-nowrap">{formattedPrice}</p>
                </div>
                <span className="font-sans w-full sm:w-auto text-center text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-gold/60 border border-gold/30 px-3 py-1.5 md:px-4 md:py-2 rounded-sm group-hover:bg-gold group-hover:text-zinc-950 transition-all duration-300">
                  Details
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // mode === 'detail'
  return (
    <div className="pointer-events-none w-full max-w-5xl mx-auto border border-zinc-800 bg-zinc-950 p-6 sm:p-10 rounded-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image */}
        <div className="relative aspect-[4/5] bg-zinc-900 border border-gold/15 rounded-sm overflow-hidden">
          {data.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.coverUrl}
              alt={data.title}
              className={`object-contain w-full h-full ${isSold ? 'brightness-[0.35]' : ''}`}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-600">No Image Selected</div>
          )}

          {isSold && (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-black/40" />
              <div
                className="absolute flex flex-col items-center justify-center gap-1 py-4 sm:py-5"
                style={{
                  width: '150%',
                  transform: 'rotate(-35deg)',
                  background: 'linear-gradient(90deg, #450a0a 0%, #991b1b 30%, #b91c1c 50%, #991b1b 70%, #450a0a 100%)',
                  borderTop: '2px solid rgba(217, 169, 60, 0.45)',
                  borderBottom: '2px solid rgba(217, 169, 60, 0.45)',
                  boxShadow: '0 4px 30px rgba(0,0,0,0.6), 0 0 20px rgba(153,27,27,0.3)',
                }}
              >
                <span className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-[0.25em] uppercase drop-shadow-lg leading-none">
                  SOLD OUT
                </span>
                <span className="font-sans text-xs sm:text-sm text-amber-300/90 tracking-[0.3em] uppercase leading-none mt-1">
                  THANK YOU
                </span>
              </div>
            </div>
          )}
          <span className="absolute top-4 left-4 px-3 py-1.5 text-[10px] font-mono bg-black/70 text-gold/80 tracking-widest border border-gold/20 rounded-sm">
            {data.collectionNumber || 'RC-XXX'}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-sm ${getCategoryColor(data.category)}`}>
              {data.category || 'Category'}
            </span>
            <span className={`font-sans text-[9px] md:text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm ${getConditionColor(data.condition)}`}>
              {data.condition || 'Condition'}
            </span>
            {data.tags?.map((tag, idx) => (
              <span key={idx} className="font-sans text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm bg-zinc-800 text-zinc-300">
                {tag}
              </span>
            ))}
          </div>

          {data.badge && !isSold && (
            <span className={`inline-block w-fit px-3 py-1 text-[10px] font-sans font-bold tracking-[0.15em] uppercase rounded-sm mb-4 ${BADGE_COLORS[data.badge] ?? 'bg-zinc-800 text-zinc-200'}`}>
              {data.badge}
            </span>
          )}

          <h1 className="font-serif font-bold text-3xl md:text-4xl text-parchment-100 mb-6 leading-tight">{data.title || 'Product Title'}</h1>

          <p className="font-sans text-base text-zinc-400 leading-relaxed mb-8">{data.description || 'Description...'}</p>

          <div className="flex items-center gap-3 mb-8 p-4 border border-gold/10 bg-zinc-900/50 rounded-sm">
            <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0" strokeWidth={1.5} />
            <p className="font-sans text-xs text-zinc-400">
              <span className="text-parchment-200 font-semibold">Authenticity Guaranteed</span> — Each item has undergone strict verification and curation processes.
            </p>
          </div>

          <div className="mb-8 p-6 border border-gold/15 bg-zinc-900/50 rounded-sm">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Price</p>
            <p className={`font-serif font-bold text-4xl ${isSold ? 'text-zinc-600 line-through decoration-red-500/60' : 'text-gold'}`}>
              {formattedPrice}
            </p>
            <p className="font-sans text-xs text-zinc-600 mt-1">Shipping not included</p>
          </div>

          {isSold ? (
            <div className="flex flex-col items-center justify-center gap-2 py-5 px-6 rounded-sm bg-gradient-to-r from-red-950/80 via-red-900/50 to-red-950/80 border border-red-800/40">
              <span className="font-serif font-black text-xl md:text-2xl text-red-400 tracking-[0.2em] uppercase">
                SOLD OUT
              </span>
              <span className="font-sans text-sm text-zinc-400 text-center leading-snug">
                This product is no longer available.
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-gold/50 text-zinc-950 font-sans font-bold text-sm tracking-[0.15em] uppercase rounded-sm">
              <MessageCircle className="w-5 h-5" />
              Order via WhatsApp (Preview)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
