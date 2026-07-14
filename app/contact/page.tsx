import { MessageCircle, Phone, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center py-20">
      <div className="container-vintage max-w-3xl w-full">
        <div className="bg-zinc-900 border border-gold/15 p-10 md:p-16 relative rounded-sm">
          {/* Corner ornaments */}
          <span className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/30 z-10" aria-hidden="true" />
          <span className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold/30 z-10" aria-hidden="true" />
          <span className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold/30 z-10" aria-hidden="true" />
          <span className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/30 z-10" aria-hidden="true" />

          <div className="text-center max-w-xl mx-auto">
            <div className="flex justify-center mb-6">
              <Phone className="w-8 h-8 text-gold" strokeWidth={1.5} />
            </div>
            <h1 className="font-serif font-bold text-4xl text-parchment-100 mb-6">Hubungi Kami</h1>
            <p className="font-sans text-base text-zinc-400 leading-relaxed mb-10">
              Kami selalu antusias membahas koleksi langka. Punya pertanyaan tentang ketersediaan barang, kondisi detail, atau ingin berdiskusi? Jangan ragu menyapa, kami siap melayani diskusi kolektor.
            </p>

            <div className="flex items-center justify-center gap-4 mb-10" aria-hidden="true">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/20" />
              <span className="font-serif text-gold/40 text-sm">✦</span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/20" />
            </div>

            <div className="mb-8">
              <p className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2">WhatsApp Kami</p>
              <p className="font-serif font-bold text-3xl text-gold tracking-wider">+6281295173689</p>
            </div>

            <a
              href="https://wa.me/6281295173689"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-gold hover:bg-gold-light text-zinc-950 py-5 px-10 font-sans text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(201,151,43,0.3)] rounded-sm"
            >
              <MessageCircle className="w-5 h-5" />
              ORDER VIA WHATSAPP
            </a>

            <div className="mt-12 flex items-center justify-center gap-2 font-sans text-xs text-zinc-600">
              <Clock className="w-4 h-4" />
              <span>Membalas cepat pada jam kerja (09:00 - 20:00 WIB)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
