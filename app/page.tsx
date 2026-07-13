import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Star, Award, Sparkles } from 'lucide-react';
import { getAllCollectibles } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

// =============================================
// Feature Card — "Mengapa Royyan Collectibles"
// =============================================
function FeatureCard({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="relative p-8 bg-zinc-950 border border-gold/15 rounded-sm group hover:border-gold/40 transition-all duration-500">
      {/* Corner ornaments */}
      <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold/30" aria-hidden="true" />
      <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold/30" aria-hidden="true" />
      <span className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold/30" aria-hidden="true" />
      <span className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold/30" aria-hidden="true" />

      <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold/60 transition-colors duration-300">
        <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
      </div>
      <h3 className="font-serif font-bold text-xl text-parchment-100 mb-3">{title}</h3>
      <p className="font-sans text-sm text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  );
}

// =============================================
// Collection Section
// =============================================
function CollectionSection() {
  const items = getAllCollectibles().slice(0, 6);

  return (
    <section className="py-28 bg-zinc-950" aria-label="Koleksi terkini" id="collection">
      <div className="container-vintage">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/60" aria-hidden="true" />
            <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-gold">Koleksi Terkini</p>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/60" aria-hidden="true" />
          </div>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-parchment-100 mb-5">
            Latest <span className="italic text-gold">Acquisitions</span>
          </h2>
          <p className="font-sans text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Setiap barang di sini telah melalui proses kurasi ketat oleh tim kami.
            Koleksi diperbarui setiap minggu — jangan sampai kehabisan.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8" aria-hidden="true">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold/30" />
            <Sparkles className="w-3 h-3 text-gold/50" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold/30" />
          </div>
        </div>

        {/* Grid */}
        {items.length === 0 ? (
          <p className="text-center font-sans text-sm text-zinc-500 py-16">Belum ada koleksi.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-10" aria-hidden="true">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-gold/20" />
            <span className="font-serif text-gold/30 text-lg">✦</span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-gold/20" />
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-zinc-950 font-sans font-bold text-sm tracking-[0.15em] uppercase rounded-sm hover:bg-gold-light hover:shadow-[0_0_30px_rgba(201,151,43,0.3)] transition-all duration-300 hover:-translate-y-0.5"
            id="homepage-view-all-btn"
          >
            Lihat Seluruh Katalog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// =============================================
// Why Us Section
// =============================================
function WhyUsSection() {
  return (
    <section className="py-28 bg-zinc-900" aria-label="Mengapa Royyan Collectibles">
      <div className="container-vintage">
        <div className="text-center mb-16">
          <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-gold mb-4">Keunggulan Kami</p>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-parchment-100">
            Mengapa <span className="italic text-gold">Royyan Collectibles</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Shield}
            title="Authenticity Guaranteed"
            desc="Setiap item dijamin 100% otentik. Kami melakukan pengecekan menyeluruh terhadap keaslian, kondisi, dan provenance setiap koleksi sebelum masuk katalog."
          />
          <FeatureCard
            icon={Star}
            title="Rare Collection"
            desc="Kami mengkurasi hanya barang-barang paling langka dan bernilai tinggi. Dari komik edisi pertama hingga diecast limited run — hanya yang terbaik."
          />
          <FeatureCard
            icon={Award}
            title="Trusted Seller"
            desc="Reputasi adalah segalanya. Dengan ratusan transaksi sukses dan ulasan positif, kami adalah partner terpercaya bagi kolektor sejati di Indonesia."
          />
        </div>
      </div>
    </section>
  );
}

// =============================================
// CTA Section (before footer)
// =============================================
function CtaSection() {
  return (
    <section className="py-24 bg-zinc-950 border-t border-gold/10" aria-label="Call to action">
      <div className="container-vintage text-center">
        <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-gold/70 mb-6">Mulai Koleksi Anda</p>
        <h2 className="font-serif font-bold text-3xl md:text-4xl text-parchment-100 mb-6 max-w-2xl mx-auto leading-tight">
          Temukan Artefak <span className="italic text-gold">Langka</span> yang Anda Cari
        </h2>
        <p className="font-sans text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed mb-10">
          Jelajahi katalog koleksi kami atau hubungi langsung via WhatsApp untuk konsultasi personal tentang item yang Anda minati.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-zinc-950 font-sans font-bold text-sm tracking-[0.15em] uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:-translate-y-0.5"
          >
            Browse Collection
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/6282312970359"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-transparent text-parchment-200 font-sans font-bold text-sm tracking-[0.15em] uppercase rounded-sm border border-parchment-400/30 hover:border-gold hover:text-gold transition-all duration-300"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// =============================================
// HOME PAGE
// =============================================
export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-var(--navbar-height))] flex flex-col" aria-label="Hero section">
        {/* Background */}
        <Image
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80"
          alt="Luxury vintage library"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(9,9,11,0.70) 0%, rgba(9,9,11,0.88) 55%, rgba(9,9,11,0.96) 100%)' }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative container-vintage flex-1 flex flex-col justify-center py-20">
          <div className="max-w-3xl">
            {/* Label */}
            <div className="flex items-center gap-3 mb-8 animate-fade-up">
              <div className="w-10 h-px bg-gold/60" aria-hidden="true" />
              <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-gold/80">Est. 2015 — Jakarta</p>
            </div>

            {/* Headline */}
            <h1
              className="font-serif font-black text-parchment-100 leading-[1.08] mb-8 animate-fade-up animate-delay-100"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
            >
              Where <span className="italic text-gold">Rare Stories</span>
              <br />Find New Homes
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed mb-10 animate-fade-up animate-delay-200">
              Kurator barang antik dan koleksi langka pilihan. Komik lawas, Hot Wheels, Diecast, dan lebih banyak lagi.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animate-delay-300">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gold text-zinc-950 font-sans font-bold text-sm tracking-[0.15em] uppercase rounded-sm hover:bg-gold-light hover:shadow-[0_0_30px_rgba(201,151,43,0.3)] transition-all duration-300 hover:-translate-y-0.5 group"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-transparent text-parchment-200 font-sans font-bold text-sm tracking-[0.15em] uppercase rounded-sm border border-parchment-400/30 hover:border-gold hover:text-gold transition-all duration-300"
              >
                Tentang Kami
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" aria-hidden="true" />
      </section>

      <CollectionSection />
      <WhyUsSection />
      <CtaSection />
    </>
  );
}
