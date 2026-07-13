'use client';
import { useMemo, useState } from 'react';
import type { CollectibleItem } from '@/lib/data';
import ProductCard from './ProductCard';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'az';

export default function CatalogClient({ items }: { items: CollectibleItem[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<SortOption>('newest');

  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.category))).sort(), [items]);

  const filtered = useMemo(() => {
    let result = items;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (item) => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      );
    }
    if (category !== 'all') result = result.filter((i) => i.category === category);

    const sorted = [...result];
    switch (sort) {
      case 'price-low': sorted.sort((a, b) => a.price - b.price); break;
      case 'price-high': sorted.sort((a, b) => b.price - a.price); break;
      case 'az': sorted.sort((a, b) => a.title.localeCompare(b.title)); break;
    }
    return sorted;
  }, [items, search, category, sort]);

  const selectClass = 'font-sans text-xs bg-zinc-900 text-parchment-200 border border-gold/20 px-4 py-2.5 focus:outline-none focus:border-gold rounded-sm';

  return (
    <div>
      {/* Filters */}
      <div className="mb-12 space-y-4">
        <input
          type="text"
          placeholder="Cari judul atau kategori..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full font-sans text-sm bg-zinc-900 text-parchment-200 border border-gold/20 px-5 py-3.5 focus:outline-none focus:border-gold placeholder:text-zinc-600 rounded-sm"
        />
        <div className="flex flex-wrap gap-3">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
            <option value="all">Semua Kategori</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className={selectClass}>
            <option value="newest">Terbaru</option>
            <option value="price-low">Harga Terendah</option>
            <option value="price-high">Harga Tertinggi</option>
            <option value="az">A - Z</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-center font-sans text-sm text-zinc-500 py-20">Tidak ada koleksi yang cocok.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => <ProductCard key={item.id} item={item} />)}
        </div>
      )}
    </div>
  );
}
