'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, BookOpen, ShoppingBag, Info, ChevronDown,
} from 'lucide-react';
import { useSettings, Currency } from './providers/SettingsProvider';
import CatalogMegaMenu from './mega-menu/CatalogMegaMenu';
import JournalMegaMenu from './mega-menu/JournalMegaMenu';
import MegaMenuOverlay from './mega-menu/MegaMenuOverlay';

type MegaMenuId = 'catalog' | 'journal' | null;

interface NavLink {
  href: string;
  label: string;
  megaMenu?: MegaMenuId;
}

const navLinks: NavLink[] = [
  { href: '/',        label: 'Home'    },
  { href: '/catalog', label: 'Catalog', megaMenu: 'catalog' },
  { href: '/journal', label: 'Journal', megaMenu: 'journal' },
  { href: '/about',   label: 'About'   },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen]   = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [currentLang, setCurrentLang] = useState('id');
  const [activeMega, setActiveMega]   = useState<MegaMenuId>(null);

  // Mobile accordion state
  const [mobileAccordion, setMobileAccordion] = useState<MegaMenuId>(null);

  const { currency, setCurrency, ratesDate } = useSettings();
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown]         = useState(false);

  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef     = useRef<HTMLDivElement>(null);
  const navRef              = useRef<HTMLElement>(null);
  const closeTimer          = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Scroll listener ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Read current language from cookie (handles zh-CN with uppercase letters)
    const match = document.cookie.match(/googtrans=\/id\/([a-zA-Z-]+)/);
    const cookieLang = match?.[1];
    if (cookieLang && cookieLang !== 'id') setCurrentLang(cookieLang);

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(target)) {
        setShowCurrencyDropdown(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ── Close megas when route changes ──────────────────────────────────────────
  useEffect(() => {
    setActiveMega(null);
    setMobileOpen(false);
  }, [pathname]);

  // ── Mega menu hover helpers ──────────────────────────────────────────────────
  const openMega = useCallback((id: MegaMenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(id);
  }, []);

  const scheduleMegaClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMega(null), 120);
  }, []);

  const cancelMegaClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const closeMega = useCallback(() => setActiveMega(null), []);

  // ── Language ─────────────────────────────────────────────────────────────────
  const switchLanguage = (lang: string) => {
    const hostname = window.location.hostname;

    // ─ 1. Update navbar display immediately (no waiting for reload) ───────────
    setCurrentLang(lang);
    setShowLangDropdown(false);

    // ─ 2. Persist language via cookie (for full page reloads & navigation) ───
    const expired = 'Thu, 01 Jan 1970 00:00:01 UTC';
    // Expire every possible variant so no old cookie lingers
    document.cookie = `googtrans=; expires=${expired}; path=/`;
    document.cookie = `googtrans=; expires=${expired}; path=/; domain=${hostname}`;
    document.cookie = `googtrans=; expires=${expired}; path=/; domain=.${hostname}`;

    if (lang !== 'id') {
      // Set the new language cookie
      document.cookie = `googtrans=/id/${lang}; path=/`;
      document.cookie = `googtrans=/id/${lang}; path=/; domain=${hostname}`;
    }

    // ─ 3. Apply translation via GT's native select element ──────────────────
    // This is more reliable than cookie+reload because GT won't re-set the
    // old cookie during widget initialization.
    const selectEl = document.querySelector(
      '#google_translate_element select'
    ) as HTMLSelectElement | null;

    if (selectEl) {
      // '' restores the original (Indonesian); any other code triggers translation
      selectEl.value = lang === 'id' ? '' : lang;
      selectEl.dispatchEvent(new Event('change'));
    } else {
      // GT widget not yet initialized — fall back to cookie + page reload
      window.location.reload();
    }
  };

  const flagCode = (lang: string) =>
    lang === 'en' ? 'gb' : lang === 'ja' ? 'jp' : lang === 'ar' ? 'sa' : (lang === 'zh-CN' || lang === 'zh') ? 'cn' : lang === 'ko' ? 'kr' : lang;

  if (pathname.startsWith('/rcpanel7x')) return null;

  return (
    <>
      {/* ── Overlay ──────────────────────────────────────────────────────────── */}
      <MegaMenuOverlay isOpen={activeMega !== null} onClose={closeMega} />

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <header
        ref={navRef}
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
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Royyan Collectibles — Halaman Utama"
          >
            <div className="relative">
              <BookOpen className="w-7 h-7 text-gold transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-gold rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-parchment-100 text-xl leading-none tracking-wide">Royyan</span>
              <span className="font-serif font-normal text-gold text-xs tracking-[0.2em] uppercase">Collectibles</span>
            </div>
          </Link>

          {/* ── Desktop Nav ──────────────────────────────────────────────────── */}
          <nav
            className="hidden md:flex items-center gap-8 relative h-full"
            aria-label="Navigasi utama"
            onMouseLeave={scheduleMegaClose}
          >
            {navLinks.map((link) => {
              const isActive = activeMega === link.megaMenu && link.megaMenu !== null;

              return (
                <div
                  key={link.href}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => link.megaMenu ? openMega(link.megaMenu) : openMega(null)}
                >
                  {link.megaMenu ? (
                    <button
                      type="button"
                      className={`
                        relative font-serif text-[13px] font-medium tracking-[0.2em] uppercase
                        transition-colors duration-300
                        after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-0
                        after:h-px after:bg-gold after:transition-all after:duration-300 after:ease-out
                        hover:after:w-full
                        ${isActive ? 'text-gold after:w-full' : 'text-zinc-300 hover:text-gold'}
                      `}
                      onClick={() => openMega(activeMega === link.megaMenu ? null : (link.megaMenu as MegaMenuId))}
                      aria-haspopup="menu"
                      aria-expanded={isActive}
                    >
                      <span className="flex items-center gap-1">
                        {link.label}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? 'rotate-180 text-gold' : ''}`}
                        />
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`
                        relative font-serif text-[13px] font-medium tracking-[0.2em] uppercase
                        transition-colors duration-300
                        after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-0
                        after:h-px after:bg-gold after:transition-all after:duration-300 after:ease-out
                        hover:after:w-full
                        ${isActive ? 'text-gold after:w-full' : 'text-zinc-300 hover:text-gold'}
                      `}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Mega menu portals */}
                  {link.megaMenu === 'catalog' && (
                    <div onMouseEnter={cancelMegaClose} onMouseLeave={scheduleMegaClose}>
                      <CatalogMegaMenu isOpen={activeMega === 'catalog'} />
                    </div>
                  )}
                  {link.megaMenu === 'journal' && (
                    <div onMouseEnter={cancelMegaClose} onMouseLeave={scheduleMegaClose}>
                      <JournalMegaMenu isOpen={activeMega === 'journal'} />
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ── CTA & Controls ───────────────────────────────────────────────── */}
          <div className="flex items-center gap-4">

            {/* Language Selector */}
            <div className="relative flex items-center" ref={langDropdownRef}>
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-1.5 px-2 py-1 text-xs font-sans font-medium text-zinc-300 border border-gold/20 rounded-sm hover:border-gold/50 hover:text-gold transition-colors"
                title="Select Language"
              >
                <div className="w-4 h-3 rounded-sm overflow-hidden flex items-center justify-center">
                  <img
                    src={`https://flagcdn.com/${flagCode(currentLang)}.svg`}
                    alt={currentLang}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="uppercase">{currentLang}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showLangDropdown && (
                <div className="absolute top-full mt-2 right-0 w-32 bg-zinc-900 border border-gold/20 rounded-sm shadow-xl p-1 z-50">
                  {[
                    { code: 'id',    flag: 'id', label: 'Indonesian' },
                    { code: 'en',    flag: 'gb', label: 'English'    },
                    { code: 'zh-CN', flag: 'cn', label: 'Chinese'    },
                    { code: 'ko',    flag: 'kr', label: 'Korean'     },
                    { code: 'ar',    flag: 'sa', label: 'Arabic'     },
                    { code: 'fr',    flag: 'fr', label: 'French'     },
                    { code: 'es',    flag: 'es', label: 'Spanish'    },
                    { code: 'it',    flag: 'it', label: 'Italian'    },
                    { code: 'ja',    flag: 'jp', label: 'Japanese'   },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { switchLanguage(lang.code); setShowLangDropdown(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-sans rounded-sm transition-colors ${currentLang === lang.code ? 'bg-gold/20 text-gold' : 'text-zinc-300 hover:bg-zinc-800'}`}
                    >
                      <div className="w-4 h-3 rounded-sm overflow-hidden flex items-center justify-center flex-shrink-0">
                        <img src={`https://flagcdn.com/${lang.flag}.svg`} alt={lang.code} className="w-full h-full object-cover" />
                      </div>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative flex items-center" ref={currencyDropdownRef}>
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="flex items-center gap-1.5 px-2 py-1 text-xs font-sans font-medium text-zinc-300 border border-gold/20 rounded-sm hover:border-gold/50 hover:text-gold transition-colors"
                title="Select Currency"
              >
                {currency}
                <ChevronDown className="w-3 h-3" />
              </button>

              {showCurrencyDropdown && (
                <div className="absolute top-full mt-2 right-0 w-36 max-h-64 overflow-y-auto bg-zinc-900 border border-gold/20 rounded-sm shadow-xl p-1 z-50">
                  {(['IDR', 'USD', 'MYR', 'SGD', 'JPY', 'CNY', 'EUR', 'BHD', 'KRW'] as Currency[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => { setCurrency(c); setShowCurrencyDropdown(false); }}
                      className={`block w-full text-left px-3 py-2 text-xs font-sans rounded-sm transition-colors ${currency === c ? 'bg-gold/20 text-gold' : 'text-zinc-300 hover:bg-zinc-800'}`}
                    >
                      {c}
                    </button>
                  ))}
                  <div className="mt-1 pt-2 border-t border-zinc-800 px-2 pb-1 group/tooltip">
                    <div className="flex items-start gap-1.5 text-[10px] text-zinc-500">
                      <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-gold/60" />
                      <p className="leading-tight">
                        Kurs diperbarui otomatis setiap jam ({ratesDate}). Transaksi tetap IDR.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/catalog"
              className="hidden md:inline-flex items-center gap-2 btn-primary text-xs btn-ripple"
              id="navbar-browse-btn"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Browse
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-parchment-200 hover:text-gold transition-colors duration-200 flex-shrink-0"
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ──────────────────────────────────────────────────────── */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          transition-all duration-300 ease-in-out
          ${mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <nav
          className={`
            absolute top-[var(--navbar-height)] left-0 right-0
            bg-zinc-900 border-b-2 border-gold/30
            transform transition-transform duration-300 ease-in-out
            ${mobileOpen ? 'translate-y-0' : '-translate-y-4'}
            max-h-[calc(100vh-var(--navbar-height))] overflow-y-auto
          `}
          aria-label="Navigasi mobile"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="px-6 py-6 flex flex-col gap-1">
            {navLinks.map((link, index) => {
              if (!link.megaMenu) {
                return (
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
                );
              }

              // Accordion for Catalog / Journal
              const isExpanded = mobileAccordion === link.megaMenu;
              return (
                <div key={link.href} className="border-b border-zinc-800 last:border-0">
                  <button
                    onClick={() => setMobileAccordion(isExpanded ? null : link.megaMenu!)}
                    className="
                      w-full py-3 px-4 font-sans font-medium tracking-widest uppercase text-sm
                      text-zinc-300 hover:text-gold hover:bg-zinc-800
                      transition-all duration-200
                      flex items-center justify-between
                    "
                    aria-expanded={isExpanded}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 text-gold/60 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-gold' : ''}`}
                    />
                  </button>

                  {/* Accordion content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    {link.megaMenu === 'catalog' && (
                      <div className="px-4 pb-4 pt-1">
                        {[
                          { label: 'Hot Wheels',          href: '/catalog?category=Hot+Wheels' },
                          { label: 'Komik',               href: '/catalog?category=Komik' },
                          { label: 'Uang Kuno & Perangko', href: '/catalog?category=Uang+Kuno+%26+Perangko' },
                          { label: 'PlayStation',         href: '/catalog?category=PlayStation' },
                          { label: 'Semua Koleksi',       href: '/catalog' },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => { setMobileOpen(false); setMobileAccordion(null); }}
                            className="flex items-center justify-between py-2.5 px-3 rounded-sm text-sm font-sans text-zinc-400 hover:text-gold hover:bg-zinc-800/50 transition-all duration-150 min-h-[44px]"
                          >
                            {item.label}
                            <span className="text-gold/30 text-xs">›</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {link.megaMenu === 'journal' && (
                      <div className="px-4 pb-4 pt-1">
                        {[
                          { label: 'Guide',          href: '/journal' },
                          { label: 'Collecting Tips', href: '/journal' },
                          { label: 'History',        href: '/journal' },
                          { label: 'Featured Story', href: '/journal' },
                          { label: 'All Articles',   href: '/journal' },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => { setMobileOpen(false); setMobileAccordion(null); }}
                            className="flex items-center justify-between py-2.5 px-3 rounded-sm text-sm font-sans text-zinc-400 hover:text-gold hover:bg-zinc-800/50 transition-all duration-150 min-h-[44px]"
                          >
                            {item.label}
                            <span className="text-gold/30 text-xs">›</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="mt-4 pt-4 border-t border-zinc-800">
              <Link
                href="/catalog"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center text-xs btn-ripple"
                id="mobile-browse-btn"
              >
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
