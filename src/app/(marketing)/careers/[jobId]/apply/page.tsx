import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/supabase/prisma';
import ApplyForm from './ApplyForm';

export async function generateMetadata({ params }: { params: Promise<{ jobId: string }> }): Promise<Metadata> {
  const { jobId } = await params;
  const job = await prisma.jobOpening.findUnique({ where: { id: jobId } });
  return {
    title: job ? `Apply — ${job.title} | INFAB Semiconductor` : 'Apply | INFAB Semiconductor',
  };
}

export default async function ApplyPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;

  const job = await prisma.jobOpening.findUnique({ where: { id: jobId } });
  if (!job || !job.isActive) notFound();

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {/* Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] pt-40 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mb-8"
          >
            <i className="ph ph-arrow-left"></i> Back to Careers
          </Link>
          <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
            Apply Now
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4 leading-tight">
            {job.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-6">
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
          <div className="w-12 h-1 bg-[var(--accent-primary)]"></div>
        </div>
      </div>

      {/* Main */}
      <div className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Job summary sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6 sticky top-24">
                <h2 className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)] mb-4 tracking-widest">About the Role</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 whitespace-pre-wrap">
                  {job.description}
                </p>
                {job.requirements.length > 0 && (
                  <>
                    <div className="w-full h-px bg-[var(--border-primary)] mb-4"></div>
                    <h3 className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)] mb-3 tracking-widest">Requirements</h3>
                    <ul className="flex flex-col gap-2">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                          <i className="ph ph-check-circle text-[var(--accent-primary)] flex-shrink-0 mt-0.5"></i>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {job.deadline && (
                  <>
                    <div className="w-full h-px bg-[var(--border-primary)] my-4"></div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      <strong className="text-[var(--text-primary)]">Deadline:</strong>{' '}
                      {new Date(job.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Application form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Your Application</h2>
                <p className="text-sm text-[var(--text-secondary)] mb-8">
                  Fill in the details below and attach your resume. We review every application and aim to respond within 5–7 working days.
                </p>
                <ApplyForm jobId={job.id} jobTitle={job.title} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
