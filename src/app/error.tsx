'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <p className="font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
          Something went wrong
        </p>
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Unexpected error</h1>
        <div className="w-12 h-1 bg-[var(--accent-primary)] mx-auto mb-6"></div>
        <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
          An unexpected error occurred. Our team has been notified. You can try again or return to the homepage.
        </p>
        {error.digest && (
          <p className="font-mono text-xs text-[var(--text-secondary)]/50 mb-8">Error ID: {error.digest}</p>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-7 text-sm font-bold uppercase tracking-wider text-[var(--bg-primary)] transition-all hover:brightness-110"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[var(--border-primary)] px-7 text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] transition-all hover:text-[var(--text-primary)]"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
