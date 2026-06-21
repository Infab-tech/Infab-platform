import { prisma } from '@/lib/supabase/prisma';
import { FALLBACK_PUBLICATIONS } from '@/lib/content-defaults';

interface PubShape {
  id: string;
  title: string;
  authors: string;
  journal: string | null;
  year: number;
  abstract: string | null;
  link: string | null;
}

export default async function Publications() {
  let pubs: PubShape[] = [];

  try {
    const rows = await prisma.publication.findMany({
      where: { isPublished: true },
      orderBy: [{ order: 'asc' }, { year: 'desc' }],
    });
    pubs = rows.map((r) => ({
      id: r.id,
      title: r.title,
      authors: r.authors,
      journal: r.journal,
      year: r.year,
      abstract: r.abstract,
      link: r.link,
    }));
  } catch { /* fallback */ }

  if (pubs.length === 0) {
    pubs = FALLBACK_PUBLICATIONS.map((p, i) => ({ id: `default-${i}`, ...p }));
  }

  if (pubs.length === 0) return null;

  return (
    <section className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-primary)]" id="publications">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
            Research & Science
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Publications
          </h2>
          <div className="w-12 h-1 bg-[var(--accent-primary)] mb-6"></div>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            Peer-reviewed research from the INFAB team at IISc CeNSE, covering MEMS fabrication, microfluidics, and sensor technologies.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pubs.map((pub) => (
            <article
              key={pub.id}
              className="group flex flex-col rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] overflow-hidden transition-all duration-300 hover:border-[var(--accent-primary)]/30 hover:shadow-xl hover:shadow-[var(--accent-primary)]/5"
            >
              {/* Top accent bar */}
              <div className="h-1 bg-gradient-to-r from-[var(--accent-primary)]/70 to-[var(--accent-primary)]/10 flex-shrink-0" />

              <div className="p-7 flex flex-col flex-grow gap-4">
                {/* Year + Journal row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-xs font-mono font-bold tracking-wider">
                    {pub.year}
                  </span>
                  {pub.journal && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] truncate max-w-xs">
                      <i className="ph ph-book-open flex-shrink-0"></i>
                      {pub.journal}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors">
                  {pub.title}
                </h3>

                {/* Authors */}
                <p className="text-xs font-mono text-[var(--text-secondary)] leading-relaxed">
                  {pub.authors}
                </p>

                {/* Abstract */}
                {pub.abstract && (
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 flex-grow">
                    {pub.abstract}
                  </p>
                )}

                {/* Read link */}
                <div className="mt-auto pt-4 border-t border-[var(--border-primary)]">
                  {pub.link ? (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors"
                    >
                      Read Paper <i className="ph ph-arrow-square-out text-base"></i>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]/50 cursor-default select-none">
                      <i className="ph ph-lock-simple"></i> Preprint — link coming soon
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
