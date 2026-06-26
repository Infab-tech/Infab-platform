import Link from 'next/link';

export default function CtaBanner() {
    return (
        <section className="py-16 bg-[var(--accent-primary)]/5 border-y border-[var(--accent-primary)]/10">
            <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
                        Need a custom solution?
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-xl">
                        Our engineers work directly with your team — from concept, design, prototyping to final packaging and qualification testing.
                    </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                    <Link
                        href="/contact"
                        className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--accent-primary)] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110 whitespace-nowrap"
                    >
                        Talk to an Engineer
                    </Link>
                    <Link
                        href="/services"
                        className="inline-flex h-12 items-center justify-center rounded-md border border-[var(--accent-primary)]/30 px-6 text-sm font-semibold text-[var(--accent-primary)] transition-all hover:bg-[var(--accent-primary)]/10 whitespace-nowrap"
                    >
                        Our Services
                    </Link>
                </div>
            </div>
        </section>
    );
}
