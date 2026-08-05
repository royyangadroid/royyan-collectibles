'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Lightbulb, Landmark, Star } from 'lucide-react';
import { DUMMY_ARTICLES } from '@/lib/journal';

interface JournalMegaMenuProps {
  isOpen: boolean;
}

const quickLinks = [
  {
    label: 'Guide',
    description: 'Complete guides for starting, building, and maintaining a collectible collection.',
    href: '/journal/category/guide',
    icon: BookOpen,
  },
  {
    label: 'Collecting Tips',
    description: 'Practical tips for storing, displaying, cleaning, and preserving collectibles.',
    href: '/journal/category/tips',
    icon: Lightbulb,
  },
  {
    label: 'History',
    description: 'Stories behind legendary comics, vintage books, die-cast, banknotes, and rare collectibles.',
    href: '/journal/category/history',
    icon: Landmark,
  },
  {
    label: 'Featured Stories',
    description: "Editor's picks featuring the most interesting stories and collector insights.",
    href: '/journal/featured',
    icon: Star,
  },
];

const menuVariants = {
  hidden: { opacity: 0, y: -12, pointerEvents: 'none' as const },
  visible: { opacity: 1, y: 0, pointerEvents: 'auto' as const, transition: { duration: 0.25, ease: 'easeOut' as const } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06 + 0.08, duration: 0.22, ease: 'easeOut' as const },
  }),
};

export default function JournalMegaMenu({ isOpen }: JournalMegaMenuProps) {
  const latestArticles = DUMMY_ARTICLES.slice(0, 2);

  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[860px] max-w-[calc(100vw-2rem)] z-40"
      aria-hidden={!isOpen}
    >
          {/* Top connector line */}
          <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          <div className="bg-zinc-950 border border-gold/20 shadow-[0_24px_80px_rgba(0,0,0,0.6)] rounded-sm">
            <div className="flex">
              {/* Left: Latest Articles */}
              <div className="flex-1 p-6">
                <p className="section-label mb-4">Artikel Terbaru</p>
                <div className="flex flex-col gap-3">
                  {latestArticles.map((article, i) => (
                    <motion.div
                      key={article.slug}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={`/journal/${article.slug}`}
                        className="group flex gap-3 p-3 rounded-sm border border-transparent hover:border-gold/20 hover:bg-zinc-900 transition-all duration-200"
                      >
                        {/* Thumbnail */}
                        <div className="w-20 h-14 rounded-sm overflow-hidden flex-shrink-0 bg-zinc-800">
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold/70">
                              {article.category}
                            </span>
                            <span className="text-zinc-600">·</span>
                            <span className="font-sans text-[10px] text-zinc-500">
                              {article.readingTime}
                            </span>
                          </div>
                          <h4 className="font-serif text-sm font-semibold text-parchment-200 group-hover:text-gold transition-colors duration-200 line-clamp-2 leading-snug mb-1">
                            {article.title}
                          </h4>
                          <p className="font-sans text-[11px] text-zinc-500 line-clamp-1 leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* View All CTA */}
                <div className="mt-5 pt-4 border-t border-zinc-800/60">
                  <Link
                    href="/journal"
                    className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.15em] uppercase text-gold hover:text-gold-light transition-colors duration-200"
                  >
                    View All Articles
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px bg-gold/10 my-4" />

              {/* Right: Quick Links — Premium Navigation Panel */}
              <div className="w-64 flex-shrink-0 p-6 flex flex-col">
                <p className="section-label mb-4">Quick Links</p>

                <div className="flex flex-col gap-2 flex-1">
                  {quickLinks.map((link, i) => {
                    const Icon = link.icon;
                    return (
                      <motion.div
                        key={link.label}
                        custom={i + 2}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          href={link.href}
                          className={[
                            'group flex items-start gap-3 px-3 py-3 rounded-sm',
                            'border border-transparent',
                            'hover:border-gold/30 hover:bg-zinc-900/80',
                            'transition-all duration-250 ease-out',
                            'hover:-translate-y-px',
                            'cursor-pointer',
                          ].join(' ')}
                        >
                          {/* Icon container */}
                          <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-sm flex items-center justify-center bg-zinc-900 border border-zinc-800 group-hover:border-gold/30 transition-colors duration-250">
                            <Icon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-gold transition-colors duration-250" />
                          </div>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-[13px] font-semibold text-zinc-300 group-hover:text-gold transition-colors duration-250 leading-tight mb-0.5">
                              {link.label}
                            </p>
                            <p className="font-sans text-[11px] text-zinc-600 group-hover:text-zinc-500 transition-colors duration-250 leading-snug line-clamp-2">
                              {link.description}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Need Help? Footer */}
                <div className="mt-4 pt-4 border-t border-zinc-800/60">
                  <p className="font-sans text-[10px] tracking-[0.12em] uppercase text-zinc-600 mb-1.5">
                    Need Help?
                  </p>
                  <p className="font-sans text-[11px] text-zinc-600 leading-relaxed mb-3">
                    Explore all Journal categories and discover curated stories from <span className="notranslate" translate="no">Royyan Collectibles</span>.
                  </p>
                  <Link
                    href="/journal"
                    className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold tracking-[0.1em] uppercase text-gold/80 hover:text-gold transition-colors duration-200 group"
                  >
                    Browse All Articles
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
  );
}
