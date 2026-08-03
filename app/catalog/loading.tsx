// app/catalog/loading.tsx — Skeleton loader for Catalog page
// Shown by Next.js while the Server Component is rendering.
// Matches the actual grid layout to eliminate layout shift.

export default function CatalogLoading() {
  return (
    <section className="py-24 bg-zinc-950 min-h-screen">
      <div className="container-vintage">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-zinc-800" />
            <div className="h-3 w-32 bg-zinc-800 rounded-full animate-pulse" />
            <div className="w-12 h-px bg-zinc-800" />
          </div>
          <div className="mx-auto h-10 w-64 bg-zinc-800/60 rounded-lg animate-pulse" />
        </div>

        {/* Filter bar skeleton */}
        <div className="flex flex-wrap gap-2 mb-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-24 rounded-full bg-zinc-800/60 animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>

        {/* Product grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} delay={i * 40} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkeletonCard({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image area */}
      <div className="aspect-[4/3] bg-zinc-800/60 animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
      </div>
      {/* Content area */}
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 bg-zinc-800/60 rounded-full animate-pulse" />
        <div className="h-5 w-full bg-zinc-800/60 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-zinc-800/40 rounded animate-pulse" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 w-24 bg-zinc-800/60 rounded animate-pulse" />
          <div className="h-7 w-20 bg-zinc-800/40 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
