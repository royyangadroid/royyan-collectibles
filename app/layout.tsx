import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/ui/PageTransition';
import Footer from '@/components/Footer';
import { getExchangeRates } from '@/lib/exchangeRate';
import { SettingsProvider } from '@/components/providers/SettingsProvider';

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
  icons: {
    icon: '/icon.png',
  },
};

import Script from 'next/script';
import GoogleTranslate from '@/components/GoogleTranslate';

// --- Root Layout ---
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { date, rates } = await getExchangeRates();

  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://wallpapercave.com" />
        <link rel="preconnect" href="https://as1.ftcdn.net" />
      </head>
      <body className="min-h-screen flex flex-col bg-zinc-950 text-parchment-100">
        <GoogleTranslate />
        <SettingsProvider initialRates={rates} initialDate={date}>
          <Navbar />
          <main className="flex-1 pt-[var(--navbar-height)]">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SettingsProvider>
      </body>
    </html>
  );
}
