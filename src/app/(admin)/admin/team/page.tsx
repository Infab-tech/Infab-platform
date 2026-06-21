import { prisma } from '@/lib/supabase/prisma';
import { toggleTeamMemberActive, deleteTeamMember, seedDefaultTeam } from '@/app/actions/admin';
import Link from 'next/link';
import Image from 'next/image';

import Pagination from '@/components/ui/Pagination';

export const metadata = { title: 'Team Management | Admin Console' };

const SECTION_LABELS: Record<string, string> = {
  FOUNDER:     'Founder',
  RESEARCH:    'Research & Science',
  ENGINEERING: 'Engineering',
  CONSULTANTS: 'Consultants',
  BUSINESS:    'Business & Admin',
  INTERN:      'Interns',
};

const SECTION_COLOURS: Record<string, string> = {
  FOUNDER:     'text-cyan-400 bg-cyan-400/10',
  RESEARCH:    'text-purple-400 bg-purple-400/10',
  ENGINEERING: 'text-blue-400 bg-blue-400/10',
  CONSULTANTS: 'text-yellow-400 bg-yellow-400/10',
  BUSINESS:    'text-green-400 bg-green-400/10',
  INTERN:      'text-pink-400 bg-pink-400/10',
};

function sectionClass(s: string) {
  return SECTION_COLOURS[s] ?? 'text-[var(--text-secondary)] bg-[var(--text-primary)]/5';
}

export default async function AdminTeamPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || '1', 10));
  const PAGE_SIZE = 10;

  const totalMembers = await prisma.teamMember.count();
  const totalPages = Math.ceil(totalMembers / PAGE_SIZE);

  let members: Awaited<ReturnType<typeof prisma.teamMember.findMany>> = [];
  try {
    members = await prisma.teamMember.findMany({ 
        orderBy: [{ section: 'asc' }, { order: 'asc' }],
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
    });
  } catch {
    // DB not connected yet
  }

  const isUsingFallback = members.length === 0;

  return (
    <div className="max-w-6xl mx-auto pt-8 sm:pt-4">

      {/* Status banner */}
      {isUsingFallback ? (
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <i className="ph ph-warning text-yellow-400 text-xl mt-0.5 flex-shrink-0"></i>
            <div>
              <p className="font-bold text-yellow-400 text-sm">Frontend is showing hardcoded fallback team data</p>
              <p className="text-yellow-400/70 text-xs mt-0.5">The database has no team members yet. Seed the defaults to take control — any edits you make after seeding will appear live on <strong>/team</strong>.</p>
            </div>
          </div>
          <form action={async () => {
            'use server';
            await seedDefaultTeam();
          }}>
            <button
              type="submit"
              className="whitespace-nowrap px-5 py-2.5 rounded-lg bg-yellow-500 text-black font-bold text-sm hover:bg-yellow-400 transition-colors"
            >
              Seed 13 Defaults →
            </button>
          </form>
        </div>
      ) : (
        <div className="mb-6 flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
          <div className="flex items-center gap-3">
            <i className="ph ph-check-circle text-green-400 text-lg"></i>
            <p className="text-green-400 text-sm font-semibold">
              Live — frontend <code className="font-mono text-xs bg-green-500/10 px-1 py-0.5 rounded">/team</code> is showing {members.filter(m => m.isActive).length} active member{members.filter(m => m.isActive).length !== 1 ? 's' : ''}.
            </p>
          </div>
          <Link href="/team" target="_blank" className="text-xs font-mono font-bold text-green-400 hover:text-green-300 flex items-center gap-1">
            View on site <i className="ph ph-arrow-square-out"></i>
          </Link>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
        <div className="mt-2 sm:mt-0">
          <h1 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">Team Members</h1>
          <p className="text-[var(--text-secondary)]">Manage profiles, sections, and photos shown on the public Team page.</p>
        </div>
        <div className="flex items-center gap-3">
          {!isUsingFallback && (
            <Link href="/team" target="_blank" className="px-4 py-3 rounded-lg border border-[var(--text-primary)]/20 text-[var(--text-secondary)] font-bold text-sm hover:bg-[var(--text-primary)]/5 transition-colors flex items-center gap-2">
              <i className="ph ph-eye"></i> Preview
            </Link>
          )}
          <Link
            href="/admin/team/new"
            className="px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
          >
            + Add Member
          </Link>
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--text-primary)]/[0.02] border-b border-[var(--text-primary)]/10 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                <th className="p-5 font-semibold w-14">Photo</th>
                <th className="p-5 font-semibold">Section</th>
                <th className="p-5 font-semibold">Name &amp; Title</th>
                <th className="p-5 font-semibold">Order</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {members.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-[var(--text-secondary)]">
                    No team members yet. Use &ldquo;Seed 13 Defaults&rdquo; above or click &ldquo;+ Add Member&rdquo;.
                  </td>
                </tr>
              )}
              {members.map((m) => (
                <tr key={m.id} className="border-b border-[var(--text-primary)]/5 hover:bg-[var(--text-primary)]/[0.02] transition-colors text-[var(--text-primary)]">
                  <td className="p-5">
                    {m.photoUrl ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden relative border border-[var(--text-primary)]/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.photoUrl} alt="" className="w-full h-full object-cover object-top" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center font-bold text-sm text-[var(--accent-primary)]">
                        {m.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                      </div>
                    )}
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-mono uppercase ${sectionClass(m.section)}`}>
                      {SECTION_LABELS[m.section] ?? m.section}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="font-semibold text-[var(--text-primary)]">{m.name}</div>
                    <div className="text-xs text-[var(--accent-primary)] font-mono mt-0.5">{m.title}</div>
                    {m.bio && <div className="text-xs text-[var(--text-secondary)] line-clamp-1 mt-0.5 max-w-sm">{m.bio}</div>}
                  </td>
                  <td className="p-5 font-mono text-xs text-[var(--text-secondary)]">
                    #{m.order}
                  </td>
                  <td className="p-5">
                    {m.isActive ? (
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
                        href={`/admin/team/${m.id}/edit`}
                        className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors"
                      >
                        Edit
                      </Link>

                      <form action={async () => {
                        'use server';
                        await toggleTeamMemberActive(m.id, m.isActive);
                      }}>
                        <button type="submit" className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-[var(--text-primary)]/20 hover:bg-[var(--text-primary)]/10 transition-colors">
                          {m.isActive ? 'Hide' : 'Show'}
                        </button>
                      </form>

                      <form action={async () => {
                        'use server';
                        await deleteTeamMember(m.id);
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
