import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-6">
            <div className="text-center max-w-lg">
                <div className="font-mono text-[var(--accent-primary)] text-sm font-semibold tracking-widest uppercase mb-4">404 — Not Found</div>
                <h1 className="text-5xl font-bold text-[var(--text-primary)] mb-4">Page not found.</h1>
                <p className="text-[var(--text-secondary)] mb-10">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--accent-primary)] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
