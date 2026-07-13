'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen, ShoppingBag } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/',         label: 'Home'    },
  { href: '/catalog',  label: 'Catalog' },
  { href: '/about',    label: 'About'   },
  { href: '/contact',  label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-in-out
          ${scrolled
            ? 'bg-zinc-950/95 backdrop-blur-md shadow-lg border-b border-gold/20'
            : 'bg-zinc-950 border-b border-gold/10'
          }
        `}
        style={{ height: 'var(--navbar-height)' }}
      >
        <div className="container-vintage h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Royyan Collectibles — Halaman Utama">
            <div className="relative">
              <BookOpen className="w-7 h-7 text-gold transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-gold rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-parchment-100 text-xl leading-none tracking-wide">Royyan</span>
              <span className="font-serif font-normal text-gold text-xs tracking-[0.2em] uppercase">Collectibles</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navigasi utama">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  relative font-sans text-sm font-medium tracking-wider uppercase
                  text-zinc-400 hover:text-gold
                  transition-colors duration-250
                  after:absolute after:bottom-[-4px] after:left-0 after:right-0
                  after:h-px after:bg-gold
                  after:scale-x-0 hover:after:scale-x-100
                  after:transition-transform after:duration-300 after:origin-center
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/catalog" className="hidden md:inline-flex items-center gap-2 btn-primary text-xs" id="navbar-browse-btn">
              <ShoppingBag className="w-3.5 h-3.5" />
              Browse
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-parchment-200 hover:text-gold transition-colors duration-200"
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          transition-all duration-300 ease-in-out
          ${mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
        aria-hidden={!mobileOpen}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <nav
          className={`
            absolute top-[var(--navbar-height)] left-0 right-0
            bg-zinc-900 border-b-2 border-gold/30
            transform transition-transform duration-300 ease-in-out
            ${mobileOpen ? 'translate-y-0' : '-translate-y-4'}
          `}
          aria-label="Navigasi mobile"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="px-6 py-6 flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="
                  py-3 px-4 font-sans font-medium tracking-widest uppercase text-sm
                  text-zinc-300 hover:text-gold hover:bg-zinc-800
                  border-b border-zinc-800 last:border-0
                  transition-all duration-200
                  flex items-center justify-between
                "
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
                <span className="text-gold/40 text-xs">›</span>
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <Link href="/catalog" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center text-xs" id="mobile-browse-btn">
                <ShoppingBag className="w-3.5 h-3.5" />
                Browse Collection
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
