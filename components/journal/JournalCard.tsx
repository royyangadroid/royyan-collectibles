import Link from 'next/link';
import { Article } from '@/lib/journal';

export default function JournalCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/journal/${article.slug}`}
      className="group block bg-zinc-950 border border-gold/20 relative overflow-hidden rounded-sm transition-all duration-500 hover:border-gold/50 hover:shadow-[0_0_40px_rgba(201,151,43,0.12)] hover:-translate-y-1 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-zinc-900 shrink-0">
        <img
          src={article.coverImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="p-5 md:p-7 flex flex-col flex-grow">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-gold/70">{article.category}</span>
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.1em] text-zinc-500">{article.publishedDate} • {article.readingTime}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-semibold text-parchment-100 text-lg md:text-xl mb-3 line-clamp-2 leading-snug group-hover:text-gold transition-colors duration-300">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="font-sans text-xs md:text-sm text-zinc-400 line-clamp-3 mb-6 md:mb-8 leading-relaxed flex-grow">
          {article.excerpt}
        </p>

        {/* CTA */}
        <div className="mt-auto border-t border-gold/10 pt-4 flex justify-end">
           <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold/60 group-hover:text-gold transition-colors duration-300 flex items-center gap-2">
            Read Article <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
