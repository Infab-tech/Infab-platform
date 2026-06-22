import type { Metadata } from 'next';
import { prisma } from '@/lib/supabase/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Careers | INFAB Semiconductor',
  description: 'Join our team in Bengaluru and build the future of MEMS and microfluidics.',
};

export default async function CareersPage() {
  let jobs: any[] = [];
  try {
    jobs = await prisma.jobOpening.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    // fallback
  }

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {/* Page Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
            Careers
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight max-w-3xl">
            Join the Revolution
          </h1>
          <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            We are always looking for passionate engineers, scientists, and operators to build India&apos;s deep-tech future at IISc CeNSE, Bengaluru.
          </p>
        </div>
      </div>

      {/* Job Openings */}
      <div className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">Open Positions</h2>
          </div>

          {jobs.length > 0 ? (
            <div className="flex flex-col gap-6">
              {jobs.map((job) => {
                const applyHref = job.applyLink || `mailto:info@infabsemi.com?subject=Application for ${encodeURIComponent(job.title)}`;
                return (
                  <div key={job.id} className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-xl hover:shadow-[var(--accent-primary)]/5">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex px-3 py-1 rounded bg-[var(--text-primary)]/5 text-xs font-mono font-bold tracking-wider text-[var(--text-secondary)]">
                            {job.department}
                          </span>
                          <span className="inline-flex px-3 py-1 rounded bg-[var(--text-primary)]/5 text-xs font-mono font-bold tracking-wider text-[var(--text-secondary)]">
                            {job.location}
                          </span>
                          <span className="inline-flex px-3 py-1 rounded bg-[var(--text-primary)]/5 text-xs font-mono font-bold tracking-wider text-[var(--text-secondary)]">
                            {job.type.replace(/_/g, ' ')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[var(--text-secondary)] prose prose-sm prose-invert max-w-none mb-8 whitespace-pre-wrap">
                      {job.description}
                    </div>

                    <div className="border-t border-[var(--border-primary)] pt-6 flex justify-end">
                      <a
                        href={applyHref}
                        target={job.applyLink ? '_blank' : undefined}
                        rel={job.applyLink ? 'noopener noreferrer' : undefined}
                        className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--accent-primary)] px-6 text-xs font-semibold uppercase tracking-wider text-[var(--bg-primary)] transition-all hover:brightness-110"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-12 text-center">
              <i className="ph ph-briefcase text-4xl text-[var(--text-secondary)]/30 mb-4 inline-block"></i>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">No open positions right now</h3>
              <p className="text-[var(--text-secondary)]">
                We aren&apos;t actively hiring for any specific roles at the moment, but we&apos;re always eager to meet talented people. Check back soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
