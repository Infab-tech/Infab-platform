import { prisma } from '@/lib/supabase/prisma';
import { updateApplicationStatus, deleteApplication } from '@/app/actions/admin';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StatusForm from './StatusForm';

export const metadata = { title: 'Applications | Admin Console' };

const STATUS_STYLES: Record<string, string> = {
  NEW:         'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  REVIEWED:    'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  SHORTLISTED: 'bg-green-500/10 text-green-400 border border-green-500/20',
  REJECTED:    'bg-red-500/10 text-red-400 border border-red-500/20',
};

const ALL_STATUSES = ['NEW', 'REVIEWED', 'SHORTLISTED', 'REJECTED'];

export default async function ApplicationsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const job = await prisma.jobOpening.findUnique({
    where: { id },
    include: {
      applications: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!job) notFound();

  const apps = job.applications;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-start gap-4">
        <Link
          href="/admin/careers"
          className="mt-1 w-9 h-9 rounded-full bg-[var(--text-primary)]/5 flex items-center justify-center hover:bg-[var(--text-primary)]/10 transition-colors text-[var(--text-primary)] flex-shrink-0"
        >
          <i className="ph ph-arrow-left text-sm"></i>
        </Link>
        <div>
          <p className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)] tracking-wider mb-1">Job Applications</p>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">{job.title}</h1>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-0.5 rounded bg-[var(--text-primary)]/5 text-xs font-mono text-[var(--text-secondary)]">{job.department}</span>
            <span className="px-2 py-0.5 rounded bg-[var(--text-primary)]/5 text-xs font-mono text-[var(--text-secondary)]">{job.location}</span>
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${job.isActive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              {job.isActive ? 'Active' : 'Hidden'}
            </span>
          </div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-3xl font-bold text-[var(--accent-primary)]">{apps.length}</div>
          <div className="text-xs text-[var(--text-secondary)] font-mono uppercase tracking-wider">Total</div>
        </div>
      </div>

      {/* Status summary */}
      {apps.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {ALL_STATUSES.map((s) => {
            const count = apps.filter((a) => a.status === s).length;
            return (
              <div key={s} className={`rounded-xl p-4 text-center ${STATUS_STYLES[s]}`}>
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-xs font-mono uppercase tracking-wider mt-1 opacity-80">{s}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Applications table */}
      <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl overflow-hidden shadow-xl">
        {apps.length === 0 ? (
          <div className="p-16 text-center">
            <i className="ph ph-envelope-open text-4xl text-[var(--text-secondary)]/30 mb-4 inline-block"></i>
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">No applications yet</h3>
            <p className="text-sm text-[var(--text-secondary)]">Applications submitted through the website will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--text-primary)]/[0.02] border-b border-[var(--text-primary)]/10 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                  <th className="p-5 font-semibold">Applicant</th>
                  <th className="p-5 font-semibold">Contact</th>
                  <th className="p-5 font-semibold">Date</th>
                  <th className="p-5 font-semibold">Status</th>
                  <th className="p-5 font-semibold">Resume</th>
                  <th className="p-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-[var(--text-primary)]/5">
                {apps.map((app) => (
                  <tr key={app.id} className="hover:bg-[var(--text-primary)]/[0.02] transition-colors">
                    {/* Applicant */}
                    <td className="p-5">
                      <div className="font-semibold text-[var(--text-primary)]">{app.name}</div>
                      {app.coverLetter && (
                        <details className="mt-1">
                          <summary className="text-xs text-[var(--accent-primary)] cursor-pointer hover:underline select-none">View cover letter</summary>
                          <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap max-w-sm bg-[var(--text-primary)]/5 rounded-lg p-3">
                            {app.coverLetter}
                          </p>
                        </details>
                      )}
                    </td>

                    {/* Contact */}
                    <td className="p-5">
                      <a href={`mailto:${app.email}`} className="text-xs text-[var(--accent-primary)] hover:underline block">{app.email}</a>
                      {app.phone && <span className="text-xs text-[var(--text-secondary)] mt-0.5 block">{app.phone}</span>}
                    </td>

                    {/* Date */}
                    <td className="p-5">
                      <span className="text-xs text-[var(--text-secondary)]">
                        {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-5">
                      <StatusForm appId={app.id} currentStatus={app.status} />
                    </td>

                    {/* Resume */}
                    <td className="p-5">
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] hover:underline"
                      >
                        <i className="ph ph-file-pdf text-base"></i> View / Download
                      </a>
                    </td>

                    {/* Delete */}
                    <td className="p-5">
                      <div className="flex justify-end">
                        <form action={async () => {
                          'use server';
                          await deleteApplication(app.id);
                        }}>
                          <button
                            type="submit"
                            className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
