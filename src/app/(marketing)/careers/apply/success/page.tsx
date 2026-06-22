import Link from 'next/link';

export default function ApplicationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center py-24">
        <div className="w-20 h-20 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center mx-auto mb-8">
          <i className="ph ph-check-circle text-4xl text-[var(--accent-primary)]"></i>
        </div>
        <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
          Application Received
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
          Thank You!
        </h1>
        <div className="w-12 h-1 bg-[var(--accent-primary)] mx-auto mb-6"></div>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10">
          Your application has been submitted successfully. Our team will review it and get back to you within 5–7 working days.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/careers"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[var(--border-primary)] px-6 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
          >
            View All Openings
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[var(--accent-primary)] px-6 text-sm font-bold uppercase tracking-wider text-[var(--bg-primary)] transition-all hover:brightness-110"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
