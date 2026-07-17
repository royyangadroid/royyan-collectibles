export default function TableOfContents() {
  // Static for dummy articles
  return (
    <aside className="lg:w-1/4 order-2 lg:order-1">
      <div className="sticky top-[calc(var(--navbar-height)+2rem)] bg-zinc-900/50 border border-gold/10 p-6 rounded-sm">
        <h4 className="font-serif text-lg text-parchment-100 mb-6 border-b border-gold/10 pb-4">Table of Contents</h4>
        <ul className="space-y-4 font-sans text-sm text-zinc-400">
          <li><a href="#" className="hover:text-gold transition-colors">Introduction</a></li>
          <li><a href="#" className="hover:text-gold transition-colors">Historical Context</a></li>
          <li><a href="#" className="hover:text-gold transition-colors">Key Milestones</a></li>
          <li><a href="#" className="hover:text-gold transition-colors">The Golden Era</a></li>
          <li><a href="#" className="hover:text-gold transition-colors">Modern Impact</a></li>
          <li><a href="#" className="hover:text-gold transition-colors">Expert Insights</a></li>
          <li><a href="#" className="hover:text-gold transition-colors">Preservation Guide</a></li>
          <li><a href="#" className="hover:text-gold transition-colors">Conclusion</a></li>
        </ul>
      </div>
    </aside>
  );
};