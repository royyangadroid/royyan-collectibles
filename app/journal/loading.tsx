// app/journal/loading.tsx — Skeleton loader for Journal listing page

export default function JournalLoading() {
  return (
    <section className="py-24 bg-zinc-950 min-h-screen">
      <div className="container-vintage">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-zinc-800" />
            <div className="h-3 w-28 bg-zinc-800 rounded-full animate-pulse" />
            <div className="w-12 h-px bg-zinc-800" />
          </div>
          <div className="mx-auto h-10 w-56 bg-zinc-800/60 rounded-lg animate-pulse" />
          <div className="mx-auto mt-4 h-4 w-96 max-w-full bg-zinc-800/40 rounded animate-pulse" />
        </div>

        {/* Article grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleSkeleton key={i} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Cover image */}
      <div className="aspect-video bg-zinc-800/60 animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
      </div>
      {/* Content */}
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-3 w-20 bg-zinc-800/60 rounded-full animate-pulse" />
          <div className="h-3 w-16 bg-zinc-800/40 rounded-full animate-pulse" />
        </div>
        <div className="h-6 w-full bg-zinc-800/60 rounded animate-pulse" />
        <div className="h-4 w-full bg-zinc-800/40 rounded animate-pulse" />
        <div className="h-4 w-4/5 bg-zinc-800/30 rounded animate-pulse" />
        <div className="pt-2 flex items-center justify-between">
          <div className="h-3 w-24 bg-zinc-800/40 rounded animate-pulse" />
          <div className="h-7 w-20 bg-zinc-800/40 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
