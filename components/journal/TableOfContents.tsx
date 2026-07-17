interface Heading {
  text: string;
  id: string;
  level: string;
}

export default function TableOfContents({ headings }: { headings?: Heading[] }) {
  if (!headings || headings.length === 0) return null;

  return (
    <aside className="lg:w-1/4 order-2 lg:order-1">
      <div className="sticky top-[calc(var(--navbar-height)+2rem)] bg-zinc-900/50 border border-gold/10 p-6 rounded-sm max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gold/20 [&::-webkit-scrollbar-track]:bg-transparent">
        <h4 className="font-serif text-lg text-parchment-100 mb-6 border-b border-gold/10 pb-4">Daftar Isi</h4>
        <ul className="space-y-4 font-sans text-sm text-zinc-400">
          {headings.map((heading, i) => (
            <li key={i} className={heading.level === 'h3' ? 'ml-4 text-xs' : ''}>
              <a href={`#${heading.id}`} className="hover:text-gold transition-colors block leading-relaxed">
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}