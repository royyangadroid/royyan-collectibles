import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { DUMMY_ARTICLES, ContentBlock } from '@/lib/journal';
import ArticleMeta from '@/components/journal/ArticleMeta';
import TableOfContents from '@/components/journal/TableOfContents';
import RelatedArticles from '@/components/journal/RelatedArticles';

function getArticle(slug: string) {
  return DUMMY_ARTICLES.find((a) => a.slug === slug);
}

const slugify = (text: string) => 
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found | Royyan Collectibles',
    };
  }

  return {
    title: `${article.title} | Journal | Royyan Collectibles`,
    description: article.excerpt,
  };
}

export function generateStaticParams() {
  return DUMMY_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = DUMMY_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  const headings = article.content
    .filter((block) => block.type === 'h2' || block.type === 'h3')
    .map((block: any) => ({
      text: block.text,
      id: slugify(block.text),
      level: block.type
    }));

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'h1':
        return <h2 key={index} className="font-serif text-3xl md:text-4xl text-gold mt-12 mb-6">{block.text}</h2>;
      case 'h2':
        return <h2 key={index} id={slugify(block.text)} className="font-serif text-2xl md:text-3xl text-gold mt-10 mb-5 border-b border-gold/10 pb-3 scroll-mt-28">{block.text}</h2>;
      case 'h3':
        return <h3 key={index} id={slugify(block.text)} className="font-serif text-xl md:text-2xl text-parchment-200 mt-8 mb-4 scroll-mt-28">{block.text}</h3>;
      case 'p':
        return <p key={index} className="mb-6 text-zinc-300 text-justify">{block.text}</p>;
      case 'ul':
        return (
          <ul key={index} className="list-disc list-outside ml-6 space-y-3 mb-8 text-zinc-400">
            {block.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        );
      case 'ol':
        return (
          <ol key={index} className="list-decimal list-outside ml-6 space-y-3 mb-8 text-zinc-400">
            {block.items.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        );
      case 'quote':
        return (
          <div key={index} className="my-10 p-8 border-l-4 border-gold bg-zinc-900/80">
            <blockquote className="font-serif text-xl md:text-2xl text-parchment-100 italic leading-snug m-0">
              "{block.text}"
            </blockquote>
            {block.author && <footer className="font-sans text-xs uppercase tracking-widest text-gold/70 mt-4">— {block.author}</footer>}
          </div>
        );
      case 'note':
        return (
          <div key={index} className="bg-gold/10 border-l-2 border-gold p-6 my-8">
            <p className="font-serif italic text-gold m-0">{block.text}</p>
          </div>
        );
      case 'image':
        return (
          <figure key={index} className="my-10">
            <div className="aspect-video w-full bg-zinc-800 border border-gold/10 rounded-sm overflow-hidden relative">
              <img
                src={block.src}
                alt={block.caption}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
            </div>
            <figcaption className="text-center font-sans text-xs text-zinc-500 mt-4 tracking-wider">
              {block.caption}
            </figcaption>
          </figure>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      {/* Top Header Section */}
      <section className="pt-10 pb-8 border-b border-gold/10 bg-zinc-900/30">
        <div className="container-vintage max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-sans text-xs tracking-wider uppercase text-zinc-500 mb-8">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/journal" className="hover:text-gold transition-colors">Journal</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold truncate">{article.category}</span>
          </nav>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-parchment-100 font-bold mb-8 leading-[1.15]">
            {article.title}
          </h1>

          {/* Meta Info */}
          <ArticleMeta article={article} />
        </div>
      </section>

      {/* Hero Image */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 -mt-6 relative z-10">
        <div className="aspect-[16/9] md:aspect-[2.5/1] w-full overflow-hidden rounded-sm border border-gold/20 shadow-2xl bg-zinc-900">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Layout */}
      <section className="container-vintage max-w-5xl mt-16 md:mt-24 flex flex-col lg:flex-row gap-12 lg:gap-20">

        {/* Table of Contents (Sidebar) */}
        <TableOfContents headings={headings} />

        {/* Article Body */}
        <article className="lg:w-3/4 order-1 lg:order-2 font-sans text-zinc-300 leading-relaxed md:text-lg">
          <p className="text-xl md:text-2xl font-serif text-parchment-200 mb-10 leading-snug text-justify">
            {article.excerpt}
          </p>

          {article.content.map((block, index) => renderContentBlock(block, index))}
        </article>
      </section>

      {/* Related Articles */}
      <RelatedArticles articles={relatedArticles} />

      {/* Back to Journal */}
      <div className="container-vintage max-w-6xl mt-12 text-center">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-zinc-400 hover:text-gold transition-colors duration-300"
        >
          <span className="text-lg leading-none transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to Journal
        </Link>
      </div>
    </div>
  );
}
