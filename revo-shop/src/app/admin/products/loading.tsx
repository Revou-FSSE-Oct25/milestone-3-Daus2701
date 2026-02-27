export default function Loading() {
  return (
    <main className="p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="h-8 w-56 rounded bg-white/10 animate-pulse" />
        <div className="h-9 w-32 rounded bg-white/10 animate-pulse" />
      </div>

      <div className="mt-6 space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded border border-white/10 p-3"
          >
            <div className="h-5 w-2/3 rounded bg-white/10 animate-pulse" />
            <div className="mt-2 h-4 w-24 rounded bg-white/10 animate-pulse" />
          </div>
        ))}
      </div>
    </main>
  );
}