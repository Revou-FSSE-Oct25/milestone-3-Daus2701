export default function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      {/* image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-white/10">
        <div className="absolute inset-0 animate-pulse bg-white/10" />
        {/* optional shimmer */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* text */}
      <div className="mt-3 space-y-2">
        <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
        <div className="h-4 w-1/3 rounded bg-white/10 animate-pulse" />
      </div>
    </div>
  );
}
