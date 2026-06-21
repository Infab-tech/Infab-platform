import Link from 'next/link';

export default function CustomerNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center bg-[var(--bg-primary)]">
      <div className="rounded-2xl border border-[var(--text-primary)]/10 bg-[var(--bg-secondary)] p-12 shadow-xl max-w-md">
        <i className="ph ph-file-dashed text-5xl text-[var(--text-secondary)] mb-4 inline-block"></i>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Page Not Found</h2>
        <p className="text-[var(--text-secondary)] mb-8">
          We couldn't find the page you're looking for. It might have been removed or the link may be broken.
        </p>
        <Link
          href="/dashboard"
          className="rounded-lg bg-[var(--accent-primary)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[var(--bg-primary)] transition-colors hover:opacity-90"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
