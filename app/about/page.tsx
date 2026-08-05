import Image from 'next/image';
import { MessageCircle, Instagram, BookOpen } from 'lucide-react';


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 py-16 md:py-24">
      <div className="container-vintage max-w-4xl">

        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-px bg-gold/40" aria-hidden="true" />
            <BookOpen className="w-6 h-6 text-gold" strokeWidth={1.5} />
            <div className="w-16 h-px bg-gold/40" aria-hidden="true" />
          </div>
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-parchment-100 leading-tight mb-4">
            <span className="notranslate" translate="no">Royyan Collectibles</span>: <br className="hidden sm:block" />
            <span className="italic text-gold">Rumah bagi Para Pencari</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mt-8" aria-hidden="true">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold/20" />
            <span className="font-serif text-gold/40 text-lg">✦</span>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold/20" />
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] mb-16 bg-zinc-900 border border-gold/15 rounded-sm overflow-hidden animate-fade-up animate-delay-100">
          <span className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/40 z-10" aria-hidden="true" />
          <span className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold/40 z-10" aria-hidden="true" />
          <span className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold/40 z-10" aria-hidden="true" />
          <span className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/40 z-10" aria-hidden="true" />
          <Image
            src="https://images.unsplash.com/photo-1681912818492-35c55f33fb25?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Tampilan koleksi antik"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-zinc-950/30" />
        </div>

        {/* Content */}
        <div className="space-y-12 md:space-y-16 px-4 sm:px-8">
          <section className="animate-fade-up animate-delay-200">
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-parchment-100 mb-5 flex items-center gap-4">
              <span className="text-gold">I.</span> Lebih Dari Sekadar Benda Tua
            </h2>
            <div className="font-sans text-base md:text-lg text-zinc-400 leading-relaxed space-y-4">
              <p>Di <span className="notranslate" translate="no">Royyan Collectibles</span>, kami lebih dari sekadar menjual barang; kami mengkurasi artefak yang memiliki jiwa. Bagi kami, Hot Wheels edisi pertama, komik era keemasan, dan uang kertas vintage adalah bagian dari sejarah yang kami selamatkan dari gerusan waktu.</p>
              <p>Kami ada di sini karena kami adalah kolektor, sama seperti Anda. Kami memahami sensasi berburu dan kepuasan luar biasa saat menemukan barang langka yang melengkapi rak koleksi Anda.</p>
            </div>
          </section>

          <section className="animate-fade-up animate-delay-300">
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-parchment-100 mb-5 flex items-center gap-4">
              <span className="text-gold">II.</span> Integritas di Atas Segalanya
            </h2>
            <div className="font-sans text-base md:text-lg text-zinc-400 leading-relaxed space-y-4">
              <p>Dunia koleksi penuh dengan spekulasi, itulah sebabnya kami memegang satu nilai di atas segalanya: kejujuran. Kami mengkurasi setiap barang dengan sangat hati-hati. Jika kami mengatakan barang itu Mint, itulah yang akan Anda terima.</p>
              <p>Jika ada cacat atau kekurangan, kami akan menunjukkannya dengan jelas. Tidak ada tebakan, tidak ada barang palsu. Kami membangun <span className="notranslate" translate="no">Royyan Collectibles</span> di atas dasar kepercayaan, karena kami tahu reputasi adalah mata uang tertinggi dalam komunitas kolektor.</p>
            </div>
          </section>

          <section className="animate-fade-up animate-delay-400">
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-parchment-100 mb-5 flex items-center gap-4">
              <span className="text-gold">III.</span> Mari Berdiskusi, Bukan Sekadar Bertransaksi
            </h2>
            <div className="font-sans text-base md:text-lg text-zinc-400 leading-relaxed space-y-4">
              <p>Kami percaya koleksi berharga layak mendapat perhatian personal. Itulah sebabnya kami tidak bergantung pada sistem email yang kaku dan berjarak. Di <span className="notranslate" translate="no">Royyan Collectibles</span>, kami lebih suka percakapan santai antarkolektor.</p>
              <p>Ada pertanyaan tentang detail barang? Ingin berdiskusi soal sejarah di balik sebuah koleksi? Hubungi kami di WhatsApp. Kami lebih suka berbicara langsung dengan Anda.</p>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-20 pt-16 border-t border-gold/15 text-center animate-fade-up animate-delay-500">
          <p className="font-sans text-sm font-bold tracking-[0.2em] uppercase text-zinc-500 mb-6">Sapa Kami</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="https://wa.me/6281295173689"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-zinc-950 py-4 px-8 font-sans text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-1 rounded-sm w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              Hubungi via WhatsApp
            </a>
            <a
              href="https://instagram.com/royyancollectibles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-gold py-4 px-8 font-sans text-sm font-bold tracking-widest uppercase transition-all duration-300 border border-zinc-700 hover:border-gold rounded-sm w-full sm:w-auto"
            >
              <Instagram className="w-5 h-5" />
              @royyancollectibles
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
