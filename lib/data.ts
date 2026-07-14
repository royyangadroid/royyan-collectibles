// ================================================
// lib/data.ts — Static Data Source
//
// Sumber kebenaran tunggal. TANPA fs, TANPA database.
// Aman untuk Server Component & Client Component.
// Aman untuk Vercel deployment.
// ================================================

export type Condition = 'Mint' | 'Near Mint' | 'Good' | 'Fair';
export type Status = 'Available' | 'Reserved' | 'Sold';
export type Badge = 'Rare Find' | 'New Arrival' | 'Sold' | 'Limited' | 'Featured' | null;

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

export const collectibles: CollectibleItem[] = [
  {
    id: 'ryc-001',
    slug: 'RC-001',
    collectionNumber: 'RC-001',
    title: 'Kisah Petualangan Tintin Di Soviet',
    price: 865000,
    category: 'Komik',
    condition: 'Near Mint',
    badge: 'Rare Find',
    status: 'Available',
    image: '/catalog/RC-001/cover.jpg',
    description:
      'Komik langka petualangan pertama Tintin. Cetakan pertama Indonesia. Soft cover, kondisi sangat terawat. Sebuah artefak bersejarah yang wajib dimiliki oleh setiap kolektor komik sejati.',
  },
  {
    id: 'ryc-002',
    slug: 'RC-002',
    collectionNumber: 'RC-002',
    title: 'Hot Wheels Rare Find (Orange)',
    price: 95000,
    category: 'Hot Wheels',
    condition: 'Mint',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-002/cover.jpg',
    description:
      'Koleksi Hot Wheels langka kondisi blister utuh dan aman. 100% Original. Warna oranye ikonik yang sangat dicari oleh para kolektor diecast di seluruh dunia.',
  },
  {
    id: 'ryc-003',
    slug: 'RC-003',
    collectionNumber: 'RC-003',
    title: '2 Barbados Dollar',
    price: 80000,
    category: 'Mata Uang Asing',
    condition: 'Mint',
    badge: 'Rare Find',
    status: 'Available',
    image: '/catalog/RC-003/cover.jpg',
    description: 'Mata Uang Barbados 2 Dolar. 100% Original. Kondisi Mint.',
  },
  {
    id: 'ryc-004',
    slug: 'RC-004',
    collectionNumber: 'RC-004',
    title: 'Wolfenstein: The New Order',
    price: 165000,
    category: 'Playsation',
    condition: 'Good',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-004/cover.jpg',
    description: 'Wolfenstein: The New Order merupakan salah satu judul FPS modern yang masih banyak dicari hingga saat ini.',
  },
  {
    id: 'ryc-005',
    slug: 'RC-005',
    collectionNumber: 'RC-005',
    title: 'Kisah Dewi Lanjar',
    price: 465000,
    category: 'Komik',
    condition: 'Good',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-005/cover.jpg',
    description: 'Komik legendaris MAN',
  }
];

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

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
