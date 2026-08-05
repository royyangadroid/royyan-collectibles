import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/ui/PageTransition';
import Footer from '@/components/Footer';
import { getExchangeRates } from '@/lib/exchangeRate';
import { SettingsProvider } from '@/components/providers/SettingsProvider';
import Script from 'next/script';

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
export async function generateMetadata(): Promise<Metadata> {
  const content = {
    title: 'Royyan Collectibles',
    description:
      'Temukan koleksi barang antik dan langka pilihan: Komik lawas, Hot Wheels, Diecast, Video Game klasik, dan lebih banyak lagi. Kurasi eksklusif untuk para kolektor sejati.',
    keywords: ['barang antik', 'koleksi', 'vintage', 'hot wheels', 'komik lawas', 'diecast', 'kolektor'],
    openGraphTitle: 'Royyan Collectibles',
    openGraphDescription: 'Kurasi eksklusif barang antik dan koleksi langka untuk para kolektor sejati.',
    locale: 'id_ID',
  };

  return {
    title: {
      default: content.title,
      template: `%s | Royyan Collectibles`,
    },
    description: content.description,
    keywords: content.keywords,
    authors: [{ name: 'Royyan Collectibles' }],
    creator: 'Royyan Collectibles',
    openGraph: {
      type: 'website',
      locale: content.locale,
      siteName: 'Royyan Collectibles',
      title: content.openGraphTitle,
      description: content.openGraphDescription,
    },
    icons: {
      icon: '/icon.png',
    },
  };
}

// --- Root Layout ---
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { date, rates } = await getExchangeRates();

  return (
    <html lang="id" dir="ltr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://wallpapercave.com" />
        <link rel="preconnect" href="https://as1.ftcdn.net" />
        <script dangerouslySetInnerHTML={{ __html: `
          const observer = new MutationObserver(() => {
            const title = document.querySelector('title');
            if (title && !title.hasAttribute('translate')) {
              title.setAttribute('translate', 'no');
              title.classList.add('notranslate');
            }
          });
          observer.observe(document.documentElement, { childList: true, subtree: true });
        ` }} />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-zinc-950 text-parchment-100">
        <SettingsProvider initialRates={rates} initialDate={date}>
          <Navbar />
          <main className="flex-1 pt-[var(--navbar-height)]">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SettingsProvider>

        {/* 1. Elemen tersembunyi untuk inisialisasi Google Translate */}
        <div id="google_translate_element"></div>

        {/* 2. Script utama Google Translate */}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new window.google.translate.TranslateElement({
                  pageLanguage: 'id', // Wajib diset 'id' agar frase/kata pendek bahasa Indonesia berhasil diterjemahkan
                  autoDisplay: false,
                  includedLanguages: 'id,en,zh-CN,ko,ar,fr,es,it,ja'
              }, 'google_translate_element');
            }
          `}
        </Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
