/**
 * Royyan Collectibles — Lightweight i18n Engine
 *
 * Usage:
 *   const { t } = useTranslation();
 *   t('nav.home')         // → "Home" / "Beranda" / "主页" (tergantung bahasa aktif)
 *   t('hero.tagline1')    // → "Where Rare Stories" / "Di Mana Kisah Langka" / "珍稀故事"
 */

import idDict from '@/locales/id.json';
import enDict from '@/locales/en.json';
import zhDict from '@/locales/zh.json';

// ── Dictionary map ──────────────────────────────────────────────────────────
export type Lang = 'id' | 'en' | 'zh' | 'zh-CN' | 'fr' | 'es' | 'it' | 'ja' | 'ar' | 'ko';
type Dict = typeof idDict;

const DICTIONARIES: Partial<Record<string, Dict>> = {
  id: idDict,
  en: enDict,
  zh: zhDict,
  'zh-CN': zhDict, // alias → same dict
};

// ── Resolve lang code to a dict ─────────────────────────────────────────────
export function resolveLang(lang: string): Dict {
  return DICTIONARIES[lang] ?? idDict; // fallback ke Bahasa Indonesia
}

// ── Dot-notation key resolver ────────────────────────────────────────────────
// Contoh: t('nav.home') membaca dict.nav.home
function getNestedValue(dict: Record<string, unknown>, key: string): string {
  const keys = key.split('.');
  let value: unknown = dict;
  for (const k of keys) {
    if (typeof value !== 'object' || value === null) return '';
    value = (value as Record<string, unknown>)[k];
  }
  return typeof value === 'string' ? value : '';
}

// ── Main translate function factory ─────────────────────────────────────────
// Dipanggil dengan lang string, mengembalikan fungsi t(key)
export function createTranslator(lang: string) {
  const dict = resolveLang(lang);
  return function t(key: string, fallback?: string): string {
    const value = getNestedValue(dict as Record<string, unknown>, key);
    return value || fallback || key;
  };
}
