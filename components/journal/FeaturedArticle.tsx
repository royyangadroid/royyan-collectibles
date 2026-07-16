import Link from 'next/link';
import { Article } from '@/lib/journal';

export default function FeaturedArticle({ article }: { article: Article }) {
  return (
    <section className="py-12 md:py-20 border-b border-gold/5">
      <div className="container-vintage">
        <div className="mb-10 flex items-center gap-4">
          <h2 className="font-serif text-2xl text-parchment-100 tracking-wider">Featured Story</h2>
          <div className="h-px bg-gold/20 flex-grow"></div>
        </div>
        
        <div className="group relative bg-zinc-900 border border-gold/20 rounded-sm overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:border-gold/40 hover:shadow-[0_0_40px_rgba(201,151,43,0.1)]">
          {/* Image */}
          <div className="relative w-full md:w-3/5 aspect-[4/3] md:aspect-auto md:min-h-[500px] overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 md:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/20 to-zinc-950 opacity-90 hidden md:block" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 w-full md:w-2/5 p-6 sm:p-8 md:p-12 flex flex-col justify-center bg-zinc-950 md:bg-transparent -mt-20 md:mt-0">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold font-semibold">{article.category}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold/30"></span>
              <span className="font-sans text-xs tracking-[0.1em] text-zinc-500">{article.publishedDate}</span>
            </div>
            
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-parchment-100 font-bold mb-4 md:mb-6 leading-tight group-hover:text-gold transition-colors duration-300">
              {article.title}
            </h3>
            
            <p className="font-sans text-sm md:text-base text-zinc-400 mb-8 leading-relaxed">
              {article.excerpt}
            </p>
            
            <div className="mt-auto">
              <Link 
                href={`/journal/${article.slug}`}
                className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase text-zinc-950 bg-gold hover:bg-gold-light px-6 py-3 rounded-sm transition-all duration-300 font-bold"
              >
                Read Story
                <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
