interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-zinc-900 border border-zinc-800 ${className}`}
      aria-hidden="true"
    >
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] w-full bg-zinc-800 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent" />
      </div>

      {/* Content placeholders */}
      <div className="p-4 space-y-3">
        {/* Badge row */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 rounded-sm bg-zinc-800 overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent" />
          </div>
          <div className="h-4 w-12 rounded-sm bg-zinc-800 overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent" />
          </div>
        </div>

        {/* Title */}
        <div className="h-5 w-3/4 rounded-sm bg-zinc-800 overflow-hidden relative">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent" />
        </div>
        <div className="h-5 w-1/2 rounded-sm bg-zinc-800 overflow-hidden relative">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent" />
        </div>

        {/* Price */}
        <div className="h-6 w-24 rounded-sm bg-zinc-800 overflow-hidden relative mt-1">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent" />
        </div>

        {/* CTA button */}
        <div className="h-9 w-full rounded-sm bg-zinc-800 overflow-hidden relative mt-2">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
