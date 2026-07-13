import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// --- Font Configuration ---
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// --- SEO Metadata ---
export const metadata: Metadata = {
  title: {
    default: 'Royyan Collectibles — Rare & Vintage Collectibles',
    template: '%s | Royyan Collectibles',
  },
  description:
    'Temukan koleksi barang antik dan langka pilihan: Komik lawas, Hot Wheels, Diecast, Video Game klasik, dan lebih banyak lagi. Kurasi eksklusif untuk para kolektor sejati.',
  keywords: ['barang antik', 'koleksi', 'vintage', 'hot wheels', 'komik lawas', 'diecast', 'kolektor'],
  authors: [{ name: 'Royyan Collectibles' }],
  creator: 'Royyan Collectibles',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Royyan Collectibles',
    title: 'Royyan Collectibles — Rare & Vintage Collectibles',
    description: 'Kurasi eksklusif barang antik dan koleksi langka untuk para kolektor sejati.',
  },
};

// --- Root Layout ---
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-zinc-950 text-parchment-100">
        <Navbar />
        <main className="flex-1 pt-[var(--navbar-height)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
