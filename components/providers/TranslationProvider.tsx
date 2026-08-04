'use client';

/**
 * TranslationProvider — App-wide i18n context
 *
 * - Membaca bahasa aktif dari cookie `googtrans` saat mount
 * - Mendengarkan custom event `lang-change` yang di-dispatch oleh Navbar
 * - Menyediakan hook `useTranslation()` ke seluruh komponen anak
 *
 * Cara integrasi dengan komponen:
 *   const { t, lang } = useTranslation();
 *   <h2>{t('collection.title1')} <em>{t('collection.title2')}</em></h2>
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { createTranslator } from '@/lib/i18n';

// ── Context type ─────────────────────────────────────────────────────────────
interface TranslationContextType {
  /** Kode bahasa aktif, misal: 'id', 'en', 'zh-CN' */
  lang: string;
  /** Fungsi translasi. t('nav.home') → "Home" / "Beranda" / "主页" */
  t: (key: string, fallback?: string) => string;
}

const TranslationContext = createContext<TranslationContextType>({
  lang: 'id',
  t: (key) => key,
});

// ── Baca bahasa dari cookie googtrans ────────────────────────────────────────
function readLangFromCookie(): string {
  if (typeof document === 'undefined') return 'id';
  const match = document.cookie.match(/googtrans=\/id\/([a-zA-Z-]+)/);
  const cookieLang = match?.[1];
  // Jika ada cookie dan bukan 'id' → gunakan cookie
  return cookieLang && cookieLang !== 'id' ? cookieLang : 'id';
}

// ── Provider ─────────────────────────────────────────────────────────────────
export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<string>('id');

  // Inisialisasi dari cookie saat mount
  useEffect(() => {
    setLang(readLangFromCookie());

    // Dengarkan event 'lang-change' yang di-dispatch oleh switchLanguage di Navbar
    // Ini menghindari keharusan mengubah struktur Navbar secara drastis
    const handleLangChange = (e: Event) => {
      const newLang = (e as CustomEvent<string>).detail;
      setLang(newLang);
    };

    window.addEventListener('lang-change', handleLangChange);
    return () => window.removeEventListener('lang-change', handleLangChange);
  }, []);

  // Buat fungsi t() baru setiap kali lang berubah
  const t = useCallback(
    (key: string, fallback?: string) => createTranslator(lang)(key, fallback),
    [lang]
  );

  return (
    <TranslationContext.Provider value={{ lang, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────────
/**
 * useTranslation — gunakan di komponen mana saja di dalam TranslationProvider
 *
 * @example
 * const { t } = useTranslation();
 * <button>{t('nav.browse')}</button>
 * // → "Browse" (en) / "Jelajahi" (id) / "浏览" (zh)
 */
export function useTranslation() {
  return useContext(TranslationContext);
}
