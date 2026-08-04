import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import JournalCard from '@/components/journal/JournalCard';
import { DUMMY_ARTICLES } from '@/lib/journal';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const CATEGORY_NAMES: Record<string, string> = {
  guide: 'Guide',
  tips: 'Collecting Tips',
  history: 'History',
};

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const categoryName = CATEGORY_NAMES[params.category.toLowerCase()];
  if (!categoryName) {
    return {
      title: 'Category Not Found | Royyan Collectibles',
    };
  }

  return {
    title: `${categoryName} | Journal Category | Royyan Collectibles`,
    description: `Browse all articles under the ${categoryName} category of Royyan Collectibles Journal.`,
  };
}

export function generateStaticParams() {
  return [
    { category: 'guide' },
    { category: 'tips' },
    { category: 'history' },
  ];
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryKey = params.category.toLowerCase();
  const categoryName = CATEGORY_NAMES[categoryKey];

  if (!categoryName) {
    notFound();
  }

  const filteredArticles = DUMMY_ARTICLES.filter(
    (article) => article.categorySlug === categoryKey
  );

  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-gold/10 bg-zinc-900/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-zinc-950 to-zinc-950 opacity-40"></div>
        <div className="container-vintage relative z-10 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 font-sans text-xs tracking-wider uppercase text-zinc-500 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/journal" className="hover:text-gold transition-colors">Journal</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold">{categoryName}</span>
          </nav>

          <h1 className="font-serif text-center text-4xl md:text-5xl lg:text-6xl text-parchment-100 font-bold mb-6 tracking-wide">
            Category: <span className="text-gold italic">{categoryName}</span>
          </h1>
          <p className="font-sans text-center text-sm md:text-base text-zinc-400 tracking-wider leading-relaxed max-w-2xl mx-auto">
            Explore curated articles, insights, and stories about {categoryName.toLowerCase()} in the world of collectibles.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24">
        <div className="container-vintage">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-sans text-zinc-500 text-base">No articles found in this category.</p>
              <Link href="/journal" className="mt-4 inline-block text-gold hover:underline">
                Back to Journal
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredArticles.map((article) => (
                <JournalCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Back to Journal */}
      <div className="container-vintage max-w-6xl text-center">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-zinc-400 hover:text-gold transition-colors duration-300 group"
        >
          <span className="text-lg leading-none transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to Journal
        </Link>
      </div>
    </div>
  );
}
