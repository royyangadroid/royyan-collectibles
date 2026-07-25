'use client';
import { useState } from 'react';

interface Heading {
  text: string;
  id: string;
  level: string;
}

export default function TableOfContents({ headings }: { headings?: Heading[] }) {
  const [open, setOpen] = useState(false);

  if (!headings || headings.length === 0) return null;

  const tocLinks = (
    <ul className="space-y-3 font-sans text-sm text-zinc-400">
      {headings.map((heading, i) => (
        <li key={i} className={heading.level === 'h3' ? 'ml-4 text-xs' : ''}>
          <a
            href={`#${heading.id}`}
            onClick={() => setOpen(false)}
            className="hover:text-gold transition-colors block leading-relaxed"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <aside className="lg:w-1/4 order-1 w-full">
      {/* ── Mobile: collapsible accordion ── */}
      <div className="lg:hidden mb-6 bg-zinc-900/60 border border-gold/15 rounded-sm overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-5 py-4 font-serif text-base text-parchment-100 focus:outline-none"
          aria-expanded={open}
        >
          <span>Daftar Isi</span>
          <span
            className="text-gold transition-transform duration-300"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            ▾
          </span>
        </button>
        {open && (
          <div className="px-5 pb-5 border-t border-gold/10">
            <div className="pt-4">{tocLinks}</div>
          </div>
        )}
      </div>

      {/* ── Desktop: sticky sidebar ── */}
      <div className="hidden lg:block sticky top-[calc(var(--navbar-height)+2rem)] bg-zinc-900/50 border border-gold/10 p-6 rounded-sm max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gold/20 [&::-webkit-scrollbar-track]:bg-transparent">
        <h4 className="font-serif text-lg text-parchment-100 mb-6 border-b border-gold/10 pb-4">Daftar Isi</h4>
        {tocLinks}
      </div>
    </aside>
  );
}