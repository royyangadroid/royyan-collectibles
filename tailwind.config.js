/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // =============================================
      // ROYYAN COLLECTIBLES — VINTAGE MODERN PALETTE
      // Terinspirasi dari kertas tua, museum, dan
      // katalog koleksi mewah
      // =============================================
      colors: {
        // Warna utama: Kertas Tua / Parchment
        parchment: {
          50:  '#FDFBF4',
          100: '#FAF6E8',
          200: '#F5EDD0',
          300: '#EDE0B5',
          400: '#E0CE94',
          500: '#D4BC73', // Warna parchment utama
          DEFAULT: '#F5EDD0',
        },
        // Coklat Tua — Warna Kulit Buku Lawas
        sepia: {
          50:  '#F8F3ED',
          100: '#EFE1D0',
          200: '#DFC4A4',
          300: '#C9A27A',
          400: '#B58055',
          500: '#8B6342', // Coklat antik utama
          600: '#6B4A2E',
          700: '#4E3420',
          800: '#321F12',
          DEFAULT: '#8B6342',
        },
        // Emas — Aksen Premium
        gold: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#C9972B', // Emas antik (bukan kuning cerah)
          600: '#A37620', // Emas gelap
          700: '#7C5515',
          DEFAULT: '#C9972B',
          light: '#E8B84B',
          dark: '#A37620',
        },
        // Hitam Tinta — Untuk Teks & Kontras
        ink: {
          50:  '#F5F4F1',
          100: '#E8E6E0',
          200: '#C8C4BB',
          300: '#A8A298',
          400: '#7A7268',
          500: '#4A4238',
          600: '#2D2820',
          700: '#1A1612',
          800: '#0D0B08',
          900: '#060504',
          DEFAULT: '#1A1612',
        },
        // Merah Tua — Untuk Aksen Langka / Rare
        crimson: {
          500: '#8B1C1C',
          600: '#6B1414',
          DEFAULT: '#8B1C1C',
        },
        // Hijau Zamrud — Untuk Badge kondisi baik
        emerald: {
          700: '#14532D',
          DEFAULT: '#14532D',
        },
      },

      // =============================================
      // FONT FAMILY
      // Playfair Display: judul klasik, serif
      // Inter: body text, clean sans-serif
      // =============================================
      fontFamily: {
        serif:  ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:   ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display:['var(--font-playfair)', 'Georgia', 'serif'],
      },

      // Ukuran font untuk heading yang dramatis
      fontSize: {
        'display-xl': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },

      // =============================================
      // SPACING & BORDER RADIUS
      // =============================================
      borderRadius: {
        'vintage': '2px',  // Sudut hampir kotak — terasa lebih formal/klasik
      },

      // =============================================
      // BACKGROUND IMAGES & GRADIENTS KUSTOM
      // =============================================
      backgroundImage: {
        // Gradient kertas tua dari atas ke bawah
        'parchment-gradient': 'linear-gradient(160deg, #FAF6E8 0%, #EDE0B5 50%, #D4BC73 100%)',
        // Gradient overlay gelap untuk Hero
        'hero-overlay': 'linear-gradient(to bottom, rgba(26,22,18,0.55) 0%, rgba(26,22,18,0.85) 100%)',
        // Gradient emas untuk aksen premium
        'gold-shimmer': 'linear-gradient(90deg, #A37620, #E8B84B, #C9972B, #A37620)',
        // Tekstur halus kertas (via gradient)
        'paper-texture': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,99,66,0.03) 2px, rgba(139,99,66,0.03) 4px)',
      },

      // =============================================
      // BOX SHADOW — Bayangan dramatis ala museum
      // =============================================
      boxShadow: {
        'vintage':    '0 4px 20px rgba(26,22,18,0.2), 0 1px 4px rgba(26,22,18,0.1)',
        'vintage-lg': '0 10px 40px rgba(26,22,18,0.25), 0 2px 8px rgba(26,22,18,0.15)',
        'gold':       '0 0 0 1px rgba(201,151,43,0.5), 0 4px 20px rgba(201,151,43,0.15)',
        'inner-vintage': 'inset 0 2px 6px rgba(26,22,18,0.12)',
      },

      // =============================================
      // ANIMASI KHUSUS
      // =============================================
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(201,151,43,0.3)' },
          '50%':      { borderColor: 'rgba(201,151,43,0.8)' },
        },
      },
      animation: {
        'fade-up':     'fade-up 0.7s ease-out forwards',
        'fade-in':     'fade-in 0.6s ease-out forwards',
        'shimmer':     'shimmer 3s linear infinite',
        'float':       'float 4s ease-in-out infinite',
        'border-glow': 'border-glow 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
