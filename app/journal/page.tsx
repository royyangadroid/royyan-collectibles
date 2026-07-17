import { Metadata } from 'next';
import Link from 'next/link';
import JournalCard from '@/components/journal/JournalCard';
import FeaturedArticle from '@/components/journal/FeaturedArticle';
import { DUMMY_ARTICLES } from '@/lib/journal';

export const metadata: Metadata = {
  title: 'Journal | Royyan Collectibles',
  description: 'Stories, Insights, History and Knowledge from the World of Collectibles.',
};

export default function JournalPage() {
  const featuredArticle = DUMMY_ARTICLES[0];
  const latestArticles = DUMMY_ARTICLES.slice(1);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-gold/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-zinc-950 to-zinc-950 opacity-40"></div>
        <div className="container-vintage relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-parchment-100 font-bold mb-6 tracking-wide">
            Collector&apos;s <span className="text-gold italic">Journal</span>
          </h1>
          <p className="font-sans text-sm md:text-base text-zinc-400 tracking-wider leading-relaxed max-w-2xl mx-auto">
            Stories, Insights, History and Knowledge from the World of Collectibles.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <FeaturedArticle article={featuredArticle} />

      {/* Latest Articles */}
      <section className="py-16 md:py-24">
        <div className="container-vintage">
          <div className="mb-12 flex items-center gap-4">
            <h2 className="font-serif text-2xl text-parchment-100 tracking-wider">Latest Articles</h2>
            <div className="h-px bg-gold/20 flex-grow"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {latestArticles.map((article) => (
              <JournalCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 border-t border-gold/10 bg-zinc-900/30">
        <div className="container-vintage text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl text-parchment-100 mb-6">Want to Share Your Story?</h2>
          <p className="font-sans text-zinc-400 mb-8 leading-relaxed">
            We are always looking for passionate collectors to share their insights, history, and knowledge with our community.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase text-zinc-950 bg-gold hover:bg-gold-light px-8 py-4 rounded-sm transition-all duration-300 font-bold">
            Contact Curator
          </Link>
        </div>
      </section>
    </div>
  );
}
