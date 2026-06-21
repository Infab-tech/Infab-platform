import Link from 'next/link';

export default function AdminNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
      <div className="rounded-2xl border border-[var(--text-primary)]/10 bg-[var(--bg-secondary)] p-12 shadow-xl max-w-md">
        <i className="ph ph-file-dashed text-5xl text-[var(--text-secondary)] mb-4 inline-block"></i>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Page Not Found</h2>
        <p className="text-[var(--text-secondary)] mb-8">
          The admin resource you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/admin"
          className="rounded-lg bg-[var(--accent-primary)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[var(--bg-primary)] transition-colors hover:opacity-90"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
