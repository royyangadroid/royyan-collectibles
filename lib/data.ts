// ================================================
// lib/data.ts — Static Data Source
//
// Sumber kebenaran tunggal. TANPA fs, TANPA database.
// Aman untuk Server Component & Client Component.
// Aman untuk Vercel deployment.
// ================================================

export type Condition = 'Mint' | 'Near Mint' | 'Good' | 'Fair' | 'Excellent';
export type Status = 'Available' | 'Reserved' | 'Sold';
export type Badge = 'Rare Find' | 'New Arrival' | 'Sold' | 'Limited' | 'Featured' | 'Rare' | null;

export interface CollectibleItem {
  id: string;
  slug: string;
  collectionNumber: string;
  title: string;
  price: number;
  category: string;
  condition: Condition;
  badge: Badge;
  status: Status;
  image: string;
  description: string;
}

import { collectibles as generatedCollectibles } from './generated-data';

export const collectibles: CollectibleItem[] = generatedCollectibles;

// =============================================
// HELPER FUNCTIONS (SINKRON — TANPA fs)
// =============================================

export function getAllCollectibles(): CollectibleItem[] {
  return collectibles;
}

export function getCollectibleBySlug(slug: string): CollectibleItem | undefined {
  return collectibles.find((item) => item.slug === slug);
}

export function getCollectibleById(id: string): CollectibleItem | undefined {
  return collectibles.find((item) => item.id === id);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(collectibles.map((item) => item.category))).sort();
}

export function formatPrice(price: number, currency: string = 'IDR', rate: number = 1): string {
  const convertedPrice = price * rate;

  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(convertedPrice);
  } else if (currency === 'MYR') {
    return new Intl.NumberFormat('ms-MY', { style: 'currency', currency: 'MYR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(convertedPrice);
  } else if (currency === 'SGD') {
    return new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(convertedPrice);
  } else if (currency === 'JPY') {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(convertedPrice);
  } else if (currency === 'CNY') {
    return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(convertedPrice);
  } else if (currency === 'EUR') {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(convertedPrice);
  } else if (currency === 'BHD') {
    return new Intl.NumberFormat('ar-BH', { style: 'currency', currency: 'BHD', minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(convertedPrice);
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(convertedPrice);
}