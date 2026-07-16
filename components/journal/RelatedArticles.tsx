import JournalCard from './JournalCard';
import { Article } from '@/lib/journal';

export default function RelatedArticles({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="container-vintage max-w-6xl mt-20 md:mt-32 pt-16 border-t border-gold/10">
      <div className="mb-10 flex items-center gap-4">
        <h2 className="font-serif text-2xl text-parchment-100 tracking-wider">Related Articles</h2>
        <div className="h-px bg-gold/20 flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {articles.map((article) => (
          <JournalCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
