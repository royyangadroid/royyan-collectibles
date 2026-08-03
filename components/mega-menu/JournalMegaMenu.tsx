'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookMarked, Lightbulb, Clock, Star } from 'lucide-react';
import { DUMMY_ARTICLES } from '@/lib/journal';

interface JournalMegaMenuProps {
  isOpen: boolean;
}

const quickLinks = [
  { label: 'Guide', href: '/journal', icon: BookMarked },
  { label: 'Collecting Tips', href: '/journal', icon: Lightbulb },
  { label: 'History', href: '/journal', icon: Clock },
  { label: 'Featured Story', href: '/journal', icon: Star },
];

const menuVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: 'easeIn' as const } },
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] max-w-[calc(100vw-2rem)] z-40"
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

              {/* Right: Quick Links */}
              <div className="w-48 flex-shrink-0 p-6">
                <p className="section-label mb-4">Quick Links</p>
                <div className="flex flex-col gap-1">
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
                          className="group flex items-center gap-2.5 px-3 py-2.5 rounded-sm border border-transparent hover:border-gold/20 hover:bg-zinc-900 transition-all duration-200 card-lift hover-lift"
                        >
                          <Icon className="w-3.5 h-3.5 text-gold/50 group-hover:text-gold transition-colors duration-200 flex-shrink-0" />
                          <span className="font-sans text-sm text-zinc-400 group-hover:text-parchment-100 transition-colors duration-200">
                            {link.label}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Decorative gold accent */}
                <div className="mt-6 pt-4 border-t border-zinc-800/60">
                  <div className="px-1">
                    <p className="font-sans text-[10px] text-zinc-600 leading-relaxed">
                      Panduan dan cerita untuk para kolektor sejati.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
