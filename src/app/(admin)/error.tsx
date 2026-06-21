'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin route error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 max-w-md">
        <i className="ph ph-warning-circle text-4xl text-red-500 mb-4 inline-block"></i>
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Something went wrong!</h2>
        <p className="text-[var(--text-secondary)] text-sm mb-6">
          {error.message || "An unexpected error occurred while loading this admin page."}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-[var(--text-primary)] px-5 py-2 text-sm font-semibold text-[var(--bg-primary)] transition-colors hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/admin"
            className="rounded-lg border border-[var(--text-primary)]/20 px-5 py-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--text-primary)]/5"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
