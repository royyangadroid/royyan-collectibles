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
    category: 'Uang Kuno & Perangko',
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
    category: 'Playstation',
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
  },
  {
    id: 'ryc-006',
    slug: 'RC-006',
    collectionNumber: 'RC-006',
    title: 'Pemandangan Indonesia Masa Lampau - Annabel Teh Gallop',
    price: 800000,
    category: 'Buku',
    condition: 'Good',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-006/cover.jpg',
    description: 'Buku Early Views of Indonesia karya Annabel Teh Gallop menghadirkan perjalanan ke masa silam, ketika kepulauan yang kini disebut Indonesia masih dipandang sebagai wilayah yang beragam dan belum menyatu dalam satu identitas bangsa. Melalui sudut pandang para pelancong dan pengamat asing, buku ini mengabadikan lanskap alam serta kehidupan masyarakat yang menjadi saksi awal perjalanan sejarah Nusantara.',
  },
  {
    id: 'ryc-007',
    slug: 'RC-007',
    collectionNumber: 'RC-007',
    title: 'Wiro - Anak Rimba Indonesia',
    price: 6500000,
    category: 'Komik',
    condition: 'Mint',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-007/cover.jpg',
    description: 'Komik legendaris karya Lie Djonliem dengan ilustrasi khas Kwik Inghoo yang mengisahkan petualangan Wiro, seorang anak rimba.'
  },
  {
    id: 'ryc-008',
    slug: 'RC-008',
    collectionNumber: 'RC-008',
    title: 'Tambusa',
    price: 845000,
    category: 'Komik',
    condition: 'Good',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-008/cover.jpg',
    description: 'Komik petualangan klasik karya Teguh Santosa, cetakan asli tahun 1970 dalam bundel 3 jilid (A–J Tamat). Menghadirkan kisah penuh petualangan, pelayaran, pertarungan, dan perjuangan dengan gaya bahasa serta ejaan lama khas komik Indonesia era klasik. Set lengkap ini menjadi salah satu collectible yang semakin sulit ditemukan dan memiliki nilai sejarah serta nostalgia yang tinggi bagi para kolektor.'
  },
  {
    id: 'ryc-009',
    slug: 'RC-009',
    collectionNumber: 'RC-009',
    title: 'The Godfather 1800',
    price: 565000,
    category: 'Komik',
    condition: 'Good',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-009/cover.jpg',
    description: 'Karya klasik Teguh Santosa yang terbit pertama kali pada tahun 1976. Set lengkap 10 jilid (A-B & 3-10) dengan cerita tamat, menghadirkan kisah kolosal penuh intrik keluarga, perebutan kekuasaan, ambisi, dan balas dendam. Salah satu komik Indonesia lawas yang semakin sulit ditemukan dalam kondisi set lengkap dan menjadi collectible item yang diburu kolektor.'
  },
  {
    id: 'ryc-010',
    slug: 'RC-010',
    collectionNumber: 'RC-010',
    title: 'Si Buta Dari Gua Hantu - Sorga Yang Hilang',
    price: 690000,
    category: 'Komik',
    condition: 'Good',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-010/cover.jpg',
    description: 'Komik silat legendaris Indonesia dengan kisah penuh aksi, petualangan, dan nilai kehidupan yang melekat pada karakter Si Buta Dari Gua Hantu. Koleksi ini terdiri dari 16 jilid tamat dengan isi lengkap dan masih nyaman dibaca, menjadikannya pilihan menarik bagi kolektor komik silat klasik dan pecinta nostalgia.'
  },
  {
    id: 'ryc-011',
    slug: 'RC-011',
    collectionNumber: 'RC-011',
    title: 'Kolokasi Sistem Malaysia 2000',
    price: 900000,
    category: 'Uang Kuno & Perangko',
    condition: 'Mint',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-011/cover.jpg',
    description: 'Lembar perangko resmi Malaysia tahun 2000 yang diterbitkan dalam era Wawasan 2020 di bawah pemerintahan Mahathir Mohamad. Terhubung dengan program pendidikan dan pembangunan nasional melalui Kementerian Pendidikan Malaysia, MARA, dan RIDA. Koleksi filateli yang merepresentasikan periode penting sejarah Malaysia modern dan semakin sulit ditemukan dalam kondisi sempurna.'
  },
  {
    id: 'ryc-012',
    slug: 'RC-012',
    collectionNumber: 'RC-012',
    title: 'Sie Jin Koei Ceng Tang',
    price: 690000,
    category: 'Komik',
    condition: 'Good',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-012/cover.jpg',
    description: 'Komik klasik Tiongkok yang mengangkat kisah epik peperangan pada masa Dinasti Tang di bawah pemerintahan Kaisar Thai Cong. Mengisahkan Sie Jin Koei, seorang jenderal tangguh yang memimpin ekspedisi ke Timur dalam cerita yang sarat strategi perang, keberanian, dan heroisme. Terdiri dari 6 jilid tamat dan menjadi salah satu komik kuno yang semakin langka di pasaran.'
  },
  {
    id: 'ryc-013',
    slug: 'RC-013',
    collectionNumber: 'RC-013',
    title: 'Tintin - Penerbangan 714',
    price: 400000,
    category: 'Komik',
    condition: 'Good',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-013/cover.jpg',
    description: 'Komik klasik karya Hergé terbitan tahun 1983 yang menghadirkan salah satu petualangan Tintin paling misterius dengan nuansa sci-fi yang khas. Edisi lawas ini menjadi favorit kolektor karena alur cerita yang unik dan semakin sulit ditemukan di pasaran.',
  },
  {
    id: 'ryc-014',
    slug: 'RC-014',
    collectionNumber: 'RC-014',
    title: 'Bangkitnya Si Mata Malaikat',
    price: 875000,
    category: 'Komik',
    condition: 'Good',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-014/cover.jpg',
    description: 'Karya legendaris Ganes TH dalam serial Si Buta dari Gua Hantu. Set lengkap 13 jilid tamat cetakan asli tahun 1987 dengan ilustrasi hitam putih khas era keemasan komik silat Indonesia. Koleksi klasik yang semakin langka dan banyak diburu kolektor.',
  },
  {
    id: 'ryc-015',
    slug: 'RC-015',
    collectionNumber: 'RC-015',
    title: 'Peranti Saji Indonesia',
    price: 150000,
    category: 'Buku',
    condition: 'Near Mint',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-015/cover.jpg',
    description: 'Set lengkap dua buku terbitan PT Dian Rakyat tahun 2013 yang mendokumentasikan ragam peranti saji tradisional Indonesia beserta sejarah, fungsi, filosofi, dan kaitannya dengan kuliner Nusantara. Referensi budaya yang menarik bagi kolektor maupun akademisi.'
  },
  {
    id: 'ryc-016',
    slug: 'RC-016',
    collectionNumber: 'RC-016',
    title: 'Star Wars - The Empire Strikes Back',
    price: 350000,
    category: 'Komik',
    condition: 'Good',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-016/cover.jpg',
    description: 'Adaptasi resmi Star Wars Episode V: The Empire Strikes Back terbitan Gramedia tahun 1997 dalam Bahasa Indonesia. Dilengkapi ilustrasi karya Tim & Greg Hildebrandt, edisi ini menjadi salah satu collectible yang semakin sulit ditemukan oleh kolektor Star Wars dan komik pop culture.',
  },
  {
    id: 'ryc-017',
    slug: 'RC-017',
    collectionNumber: 'RC-017',
    title: 'Tintin - Kepiting Bercapit Emas',
    price: 1025000,
    category: 'Komik',
    condition: 'Good',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-017/cover.jpg',
    description: 'Komik klasik karya Hergé cetakan pertama Penerbit Indira tahun 1978. Salah satu kisah paling penting dalam serial Tintin karena memperkenalkan Kapten Haddock untuk pertama kalinya. Edisi lawas yang memiliki nilai historis dan semakin langka di kalangan kolektor.',
  },
  {
    id: 'ryc-018',
    slug: 'RC-018',
    collectionNumber: 'RC-018',
    title: "'08 Viper SRT10 ACR",
    price: 114000,
    category: 'Hot Wheels',
    condition: 'Mint',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-018/cover.jpg',
    description: "Hot Wheels '08 Viper SRT10 ACR dari seri 2010 HW Premiere. Menghadirkan desain agresif khas Dodge Viper yang dikenal sebagai salah satu mobil sport legendaris Amerika. Rilisan awal HW Premiere ini menjadi collectible item yang semakin sulit ditemukan dan cocok untuk melengkapi koleksi diecast bertema sport car maupun HW Premiere."
  },
  {
    id: 'ryc-019',
    slug: 'RC-019',
    collectionNumber: 'RC-019',
    title: 'Rahasia Setan Catur',
    price: 465000,
    category: 'Komik Indonesia',
    condition: 'Fair',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-019/cover.jpg',
    description: 'Komik silat legendaris karya MAN, cetakan asli tahun 1985, dalam set lengkap 14 jilid tamat. Menghadirkan kisah penuh intrik, pertarungan sengit, dan misteri dunia persilatan yang menjadi favorit pembaca komik silat era 80-an. Koleksi klasik yang semakin sulit ditemukan dalam kondisi lengkap.'
  },
  {
    id: 'ryc-020',
    slug: 'RC-020',
    collectionNumber: 'RC-020',
    title: '2009 Ford F-150',
    price: 115000,
    category: 'Hot Wheels',
    condition: 'Good',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-020/cover.jpg',
    description: 'Hot Wheels 2009 Ford F-150 dari seri HW Premiere yang menampilkan karakter khas pickup Amerika. Unit masih berada dalam blister asli dengan kondisi diecast tetap terawat dan cocok untuk display koleksi. Salah satu collectible item yang semakin sulit ditemukan bagi kolektor Hot Wheels maupun penggemar Ford.'
  },
  {
    id: 'ryc-021',
    slug: 'RC-021',
    collectionNumber: 'RC-021',
    title: 'Sien Koei Tjeng See',
    price: 1115000,
    category: 'Komik Indonesia',
    condition: 'Good',
    badge: 'Limited',
    status: 'Available',
    image: '/catalog/RC-021/cover.jpg',
    description: 'Komik klasik karya maestro Siauw Tik Kwie, cetakan asli sekitar tahun 1959. Terdiri dari 9 jilid tamat yang mengisahkan kepahlawanan Sie Djin Koei (Xue Rengui), jenderal legendaris Dinasti Tang. Menggunakan bahasa Indonesia ejaan lama dengan ilustrasi khas era komik Tionghoa-Indonesia, menjadikannya salah satu collectible yang semakin langka dan bernilai sejarah tinggi.'
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