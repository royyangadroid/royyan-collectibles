import Link from 'next/link';
import { BookOpen, MapPin, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-gold/10">
      {/* Gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="container-vintage py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-gold" strokeWidth={1.5} />
              <div>
                <p className="font-serif font-bold text-parchment-100 text-lg leading-none">Royyan</p>
                <p className="font-serif text-gold text-xs tracking-[0.2em] uppercase">Collectibles</p>
              </div>
            </div>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed">
              Kurator barang antik dan koleksi langka terpercaya.
              Setiap item adalah sebuah cerita yang menunggu pemilik barunya.
            </p>
            <p className="font-serif italic text-gold/40 text-sm">
              &ldquo;Rare &amp; Vintage Collectibles&rdquo;
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-gold">Navigasi</h3>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {[
                { href: '/', label: 'Home' },
                { href: '/catalog', label: 'Catalog' },
                { href: '/about', label: 'Tentang Kami' },
                { href: '/contact', label: 'Hubungi Kami' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm text-zinc-500 hover:text-gold transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-gold">Kontak</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 font-sans text-sm text-zinc-500">
                <MapPin className="w-4 h-4 text-gold/50 flex-shrink-0 mt-0.5" />
                <span>Jakarta, Indonesia</span>
              </div>
              <a
                href="https://instagram.com/royyancollectibles"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-sans text-sm text-zinc-500 hover:text-gold transition-colors duration-200"
              >
                <Instagram className="w-4 h-4 text-gold/50 flex-shrink-0" />
                @royyancollectibles
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <span className="font-serif text-gold/30 text-lg">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/20 to-transparent" />
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-zinc-600 tracking-wide">
            © {currentYear} Royyan Collectibles. All rights reserved.
          </p>
          <p className="font-sans text-xs text-zinc-700 italic">
            Curated with passion for collectors.
          </p>
        </div>
      </div>
    </footer>
  );
}
