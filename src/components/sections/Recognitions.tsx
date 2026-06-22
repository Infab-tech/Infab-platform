import { prisma } from '@/lib/supabase/prisma';
import { FALLBACK_RECOGNITIONS } from '@/lib/content-defaults';
import Image from 'next/image';
import Link from 'next/link';

interface RecShape {
  id: string;
  title: string;
  body: string;
  certNumber: string | null;
  issuer: string | null;
  logoUrl: string | null;
}

export default async function Recognitions() {
  let recs: RecShape[] = [];

  try {
    const rows = await prisma.recognition.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }],
    });
    recs = rows.map((r) => ({
      id: r.id,
      title: r.title,
      body: r.body,
      certNumber: r.certNumber,
      issuer: r.issuer,
      logoUrl: r.logoUrl,
    }));
  } catch { /* fallback */ }

  if (recs.length === 0) {
    recs = FALLBACK_RECOGNITIONS.map((r, i) => ({ 
      id: `default-${i}`, 
      ...r,
      certNumber: r.certNumber || null,
      issuer: r.issuer || null,
      logoUrl: r.logoUrl || null,
    }));
  }

  if (recs.length === 0) return null;

  return (
    <section className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-primary)]" id="recognition">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
            Quality & Trust
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Recognition & Certificates
          </h2>
          <div className="w-12 h-1 bg-[var(--accent-primary)] mb-6"></div>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
            Our commitment to quality, backed by industry-standard certifications and institutional support.
          </p>
          <Link
            href="/about#recognition"
            className="inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wider text-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-colors"
          >
            View All Certifications <i className="ph ph-arrow-right"></i>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recs.map((rec) => (
            <article
              key={rec.id}
              className="group flex flex-col rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] overflow-hidden transition-all duration-300 hover:border-[var(--accent-primary)]/30 hover:shadow-xl hover:shadow-[var(--accent-primary)]/5"
            >
              {/* Top accent bar */}
              <div className="h-1 bg-gradient-to-r from-[var(--accent-primary)]/70 to-[var(--accent-primary)]/10 flex-shrink-0" />

              <div className="p-7 flex flex-col flex-grow gap-4">
                {rec.logoUrl && (
                  <div className="w-16 h-16 relative mb-2 flex items-center justify-center bg-white rounded p-2">
                    <Image
                      src={rec.logoUrl}
                      alt={rec.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                )}
                
                {/* Title */}
                <h3 className="text-xl font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors">
                  {rec.title}
                </h3>

                {/* Body */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-grow">
                  {rec.body}
                </p>

                {/* Meta row */}
                {(rec.certNumber || rec.issuer) && (
                  <div className="mt-auto pt-4 border-t border-[var(--border-primary)] flex flex-col gap-1">
                    {rec.certNumber && (
                       <span className="text-xs font-mono text-[var(--text-secondary)]">
                         <strong className="text-[var(--text-primary)]">Cert No:</strong> {rec.certNumber}
                       </span>
                    )}
                    {rec.issuer && (
                       <span className="text-xs font-mono text-[var(--text-secondary)]">
                         <strong className="text-[var(--text-primary)]">Issuer:</strong> {rec.issuer}
                       </span>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
