import { prisma } from '@/lib/supabase/prisma';
import { toggleJobOpeningActive, deleteJobOpening } from '@/app/actions/admin';
import Link from 'next/link';

import Pagination from '@/components/ui/Pagination';

export const metadata = { title: 'Careers Management | Admin Console' };

export default async function AdminCareersPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || '1', 10));
  const PAGE_SIZE = 10;

  const totalJobs = await prisma.jobOpening.count();
  const totalPages = Math.ceil(totalJobs / PAGE_SIZE);

  let jobs: Awaited<ReturnType<typeof prisma.jobOpening.findMany>> = [];
  try {
    jobs = await prisma.jobOpening.findMany({ 
        orderBy: [{ createdAt: 'desc' }],
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
    });
  } catch {
    // DB not connected yet
  }

  return (
    <div className="max-w-6xl mx-auto pt-8 sm:pt-4">

      <div className="mb-6 flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
        <div className="flex items-center gap-3">
          <i className="ph ph-check-circle text-green-400 text-lg"></i>
          <p className="text-green-400 text-sm font-semibold">
            Live — website is showing {totalJobs} job opening{totalJobs !== 1 ? 's' : ''}.
          </p>
        </div>
        <Link href="/careers" target="_blank" className="text-xs font-mono font-bold text-green-400 hover:text-green-300 flex items-center gap-1">
          View on site <i className="ph ph-arrow-square-out"></i>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
        <div className="mt-2 sm:mt-0">
          <h1 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">Careers & Job Openings</h1>
          <p className="text-[var(--text-secondary)]">Manage the job listings shown on the careers page.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/careers" target="_blank" className="px-4 py-3 rounded-lg border border-[var(--text-primary)]/20 text-[var(--text-secondary)] font-bold text-sm hover:bg-[var(--text-primary)]/5 transition-colors flex items-center gap-2">
            <i className="ph ph-eye"></i> Preview
          </Link>
          <Link
            href="/admin/careers/new"
            className="px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
          >
            + Add Job
          </Link>
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--text-primary)]/[0.02] border-b border-[var(--text-primary)]/10 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                <th className="p-5 font-semibold">Title</th>
                <th className="p-5 font-semibold">Department</th>
                <th className="p-5 font-semibold">Type</th>
                <th className="p-5 font-semibold">Location</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-[var(--text-secondary)]">
                    No job openings yet. Click &ldquo;+ Add Job&rdquo;.
                  </td>
                </tr>
              )}
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-[var(--text-primary)]/5 hover:bg-[var(--text-primary)]/[0.02] transition-colors text-[var(--text-primary)]">
                  <td className="p-5">
                    <div className="font-semibold text-[var(--text-primary)]">{job.title}</div>
                    <div className="text-xs text-[var(--text-secondary)] line-clamp-1 mt-0.5">{job.description}</div>
                    {job.applyLink ? (
                      <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-1 text-[10px] font-mono text-[var(--accent-primary)] hover:underline truncate max-w-xs">
                        <i className="ph ph-link text-xs"></i> {job.applyLink}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-mono text-[var(--text-secondary)]/50">
                        <i className="ph ph-envelope-simple text-xs"></i> mailto fallback
                      </span>
                    )}
                  </td>
                  <td className="p-5">
                    <span className="px-2 py-1 bg-[var(--text-primary)]/5 rounded text-xs">{job.department}</span>
                  </td>
                  <td className="p-5">
                    <span className="text-xs text-[var(--text-secondary)]">{job.type}</span>
                  </td>
                  <td className="p-5">
                    <span className="text-xs text-[var(--text-secondary)]">{job.location}</span>
                  </td>
                  <td className="p-5">
                    {job.isActive ? (
                      <span className="text-green-500 font-bold text-xs uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Active
                      </span>
                    ) : (
                      <span className="text-red-500 font-bold text-xs uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> Hidden
                      </span>
                    )}
                  </td>
                  <td className="p-5">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/careers/${job.id}/edit`}
                        className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors"
                      >
                        Edit
                      </Link>

                      <form action={async () => {
                        'use server';
                        await toggleJobOpeningActive(job.id, job.isActive);
                      }}>
                        <button type="submit" className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-[var(--text-primary)]/20 hover:bg-[var(--text-primary)]/10 transition-colors">
                          {job.isActive ? 'Hide' : 'Show'}
                        </button>
                      </form>

                      <form action={async () => {
                        'use server';
                        await deleteJobOpening(job.id);
                      }}>
                        <button type="submit" className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
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
      </div>
      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
    </div>
  );
}
