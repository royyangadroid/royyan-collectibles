import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, ShieldCheck } from 'lucide-react';
import { getAllCollectibles, getCollectibleBySlug } from '@/lib/data';
import { PriceDisplay } from '@/components/PriceDisplay';


export function generateStaticParams() {
  return getAllCollectibles().map((item) => ({ id: item.slug }));
}

export default function DetailPage({ params }: { params: { id: string } }) {
  const item = getCollectibleBySlug(params.id);
  if (!item) notFound();
  const isSold = item.status === 'Sold';

  return (
    <section className="py-20 bg-zinc-950 min-h-screen">
      <div className="container-vintage">
        {/* Back button */}
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 font-sans text-sm text-zinc-400 hover:text-gold transition-colors duration-200 mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Katalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div className="relative aspect-[4/5] bg-zinc-900 border border-gold/15 rounded-sm overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover ${isSold ? 'brightness-[0.35]' : ''}`}
            />

            {/* ===== CONCEPT 3: Diagonal Sold Ribbon (Detail Page) ===== */}
            {isSold && (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40" />
                {/* Diagonal ribbon */}
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
                  <span className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-[0.25em] uppercase drop-shadow-lg leading-none">
                    SOLD OUT
                  </span>
                  <span className="font-sans text-xs sm:text-sm text-amber-300/90 tracking-[0.3em] uppercase leading-none mt-1">
                    TERIMA KASIH
                  </span>
                </div>
              </div>
            )}

            {/* Collection Number tag */}
            <span className="absolute top-4 left-4 px-3 py-1.5 text-[10px] font-mono bg-black/70 text-gold/80 tracking-widest border border-gold/20 rounded-sm">
              {item.collectionNumber}
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            {/* Category & Condition */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold/70 border border-gold/20 px-3 py-1 rounded-sm">{item.category}</span>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-zinc-500">{item.condition}</span>
            </div>

            {/* Badge */}
            {item.badge && !isSold && (
              <span className="inline-block w-fit px-3 py-1 text-[10px] font-sans font-bold tracking-[0.15em] uppercase bg-red-900/60 text-red-200 rounded-sm mb-4">
                {item.badge}
              </span>
            )}

            {/* Title */}
            <h1 className="font-serif font-bold text-3xl md:text-4xl text-parchment-100 mb-6 leading-tight">{item.title}</h1>

            {/* Description */}
            <p className="font-sans text-base text-zinc-400 leading-relaxed mb-8">{item.description}</p>

            {/* Authenticity badge */}
            <div className="flex items-center gap-3 mb-8 p-4 border border-gold/10 bg-zinc-900/50 rounded-sm">
              <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0" strokeWidth={1.5} />
              <p className="font-sans text-xs text-zinc-400">
                <span className="text-parchment-200 font-semibold">Keaslian Terjamin</span> — Setiap item telah melewati proses verifikasi dan kurasi yang ketat.
              </p>
            </div>

            {/* Price */}
            <div className="mb-8 p-6 border border-gold/15 bg-zinc-900/50 rounded-sm">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Harga</p>
              <p className={`font-serif font-bold text-4xl ${isSold ? 'text-zinc-600 line-through decoration-red-500/60' : 'text-gold'}`}>
                <PriceDisplay price={item.price} />
              </p>
              <p className="font-sans text-xs text-zinc-600 mt-1">Belum termasuk ongkir</p>
            </div>

            {/* CTA or Sold Out Box */}
            {isSold ? (
              <div className="flex flex-col items-center justify-center gap-2 py-5 px-6 rounded-sm bg-gradient-to-r from-red-950/80 via-red-900/50 to-red-950/80 border border-red-800/40">
                <span className="font-serif font-black text-xl md:text-2xl text-red-400 tracking-[0.2em] uppercase">
                  SOLD OUT
                </span>
                <span className="font-sans text-sm text-zinc-400 text-center leading-snug">
                  Produk ini sudah tidak tersedia.
                </span>
              </div>
            ) : (
              <a
                href={`https://wa.me/6281295173689?text=${encodeURIComponent(`Halo, saya tertarik dengan koleksi: ${item.title} (${item.collectionNumber})`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-gold text-zinc-950 font-sans font-bold text-sm tracking-[0.15em] uppercase rounded-sm hover:bg-gold-light hover:shadow-[0_0_30px_rgba(201,151,43,0.3)] transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Pesan via WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
