'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function CustomerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Customer route error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center bg-[var(--bg-primary)]">
      <div className="rounded-2xl border border-[var(--text-primary)]/10 bg-[var(--bg-secondary)] p-8 max-w-md shadow-xl">
        <i className="ph ph-warning-circle text-4xl text-red-500 mb-4 inline-block"></i>
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Something went wrong</h2>
        <p className="text-[var(--text-secondary)] text-sm mb-8">
          {error.message || "An unexpected error occurred while loading this page."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-[var(--accent-primary)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[var(--bg-primary)] transition-colors hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/dashboard"
            className="rounded-lg border border-[var(--text-primary)]/20 px-6 py-3 text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] transition-colors hover:bg-[var(--text-primary)]/5"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
