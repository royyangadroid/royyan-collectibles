'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Flame, BookOpen, Coins, Gamepad2, Car } from 'lucide-react';
import { collectibles } from '@/lib/generated-data';

interface CatalogMegaMenuProps {
  isOpen: boolean;
}

const categories = [
  {
    name: 'Hot Wheels',
    href: '/catalog?category=Hot+Wheels',
    icon: Flame,
    color: 'from-orange-900/30 to-transparent',
    iconColor: 'text-orange-400',
    image: '/catalog/RC-002/cover.jpg',
  },
  {
    name: 'Komik',
    href: '/catalog?category=Komik',
    icon: BookOpen,
    color: 'from-amber-900/30 to-transparent',
    iconColor: 'text-amber-400',
    image: '/catalog/RC-001/cover.jpg',
  },
  {
    name: 'Uang Kuno & Perangko',
    href: '/catalog?category=Uang+Kuno+%26+Perangko',
    icon: Coins,
    color: 'from-yellow-900/30 to-transparent',
    iconColor: 'text-yellow-400',
    image: '/catalog/RC-003/cover.jpg',
  },
  {
    name: 'PlayStation',
    href: '/catalog?category=PlayStation',
    icon: Gamepad2,
    color: 'from-blue-900/30 to-transparent',
    iconColor: 'text-blue-400',
    image: '/catalog/RC-004/cover.jpg',
  },
];

// Count items per category from live data
function getCategoryCount(name: string) {
  return collectibles.filter((c) => c.category === name).length;
}

// Pick a rare featured item
const featured = collectibles.find((c) => c.slug === 'RC-007') ?? collectibles[0];

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
    transition: { delay: i * 0.05 + 0.08, duration: 0.22, ease: 'easeOut' as const },
  }),
};

export default function CatalogMegaMenu({ isOpen }: CatalogMegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-full left-1/2 -translate-x-1/2 w-[860px] max-w-[calc(100vw-2rem)] z-40"
        >
          {/* Top connector line */}
          <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          <div className="bg-zinc-950 border border-gold/20 shadow-[0_24px_80px_rgba(0,0,0,0.6)] rounded-sm">
            <div className="flex">
              {/* Left: Category Grid */}
              <div className="flex-1 p-6">
                <p className="section-label mb-4">Telusuri Koleksi</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat, i) => {
                    const Icon = cat.icon;
                    const count = getCategoryCount(cat.name);
                    return (
                      <motion.div
                        key={cat.name}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          href={cat.href}
                          className="group flex items-center gap-3 p-3 rounded-sm border border-transparent hover:border-gold/20 hover:bg-zinc-900 transition-all duration-200 card-lift hover-lift"
                        >
                          {/* Thumbnail */}
                          <div className="w-12 h-12 rounded-sm overflow-hidden flex-shrink-0 bg-zinc-800 relative">
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-60`} />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                            </div>
                          </div>
                          {/* Text */}
                          <div className="min-w-0">
                            <p className="font-sans text-sm font-medium text-parchment-200 group-hover:text-gold transition-colors duration-200 truncate">
                              {cat.name}
                            </p>
                            <p className="font-sans text-[11px] text-zinc-500 mt-0.5">
                              {count} item{count !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-gold group-hover:translate-x-0.5 transition-all duration-200 ml-auto flex-shrink-0" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* View All */}
                <div className="mt-5 pt-4 border-t border-zinc-800/60">
                  <Link
                    href="/catalog"
                    className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.15em] uppercase text-gold hover:text-gold-light transition-colors duration-200"
                  >
                    Lihat Semua Koleksi
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px bg-gold/10 my-4" />

              {/* Right: Featured Item */}
              <div className="w-64 flex-shrink-0 p-6">
                <p className="section-label mb-4">Featured Item</p>
                <Link
                  href={`/catalog/${featured.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-zinc-800 mb-3">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 to-transparent" />
                    {featured.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-gold text-zinc-950 font-sans text-[10px] font-bold tracking-wider uppercase rounded-sm">
                        {featured.badge}
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-1">
                    {featured.category}
                  </p>
                  <h4 className="font-serif text-sm font-semibold text-parchment-100 group-hover:text-gold transition-colors duration-200 line-clamp-2 leading-snug mb-2">
                    {featured.title}
                  </h4>
                  <span className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-[0.15em] uppercase text-gold/60 group-hover:text-gold transition-colors duration-200">
                    View Item <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
