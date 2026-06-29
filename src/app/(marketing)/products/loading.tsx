export default function ProductsLoading() {
  return (
    <div className="bg-[var(--bg-primary)] animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-5">
              <div className="h-4 w-28 rounded bg-[var(--border-primary)]" />
              <div className="h-12 w-64 rounded bg-[var(--border-primary)]" />
              <div className="h-1 w-12 rounded bg-[var(--border-primary)]" />
              <div className="h-5 w-full rounded bg-[var(--border-primary)]" />
              <div className="h-5 w-3/4 rounded bg-[var(--border-primary)]" />
            </div>
            <div className="h-64 rounded-2xl bg-[var(--border-primary)]" />
          </div>
        </div>
      </div>

      {/* Category nav skeleton */}
      <div className="border-b border-[var(--border-primary)] px-6 py-4">
        <div className="mx-auto max-w-7xl flex gap-8">
          <div className="h-4 w-40 rounded bg-[var(--border-primary)]" />
          <div className="h-4 w-40 rounded bg-[var(--border-primary)]" />
        </div>
      </div>

      {/* Product cards skeleton */}
      <div className="py-24 border-b border-[var(--border-primary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="h-8 w-48 rounded bg-[var(--border-primary)] mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border-primary)] overflow-hidden">
                <div className="h-48 bg-[var(--border-primary)]" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-3/4 rounded bg-[var(--border-primary)]" />
                  <div className="h-4 w-full rounded bg-[var(--border-primary)]" />
                  <div className="h-4 w-2/3 rounded bg-[var(--border-primary)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
