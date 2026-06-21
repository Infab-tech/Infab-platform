import { prisma } from '@/lib/supabase/prisma';
import { togglePublicationPublished, deletePublication, seedDefaultPublications } from '@/app/actions/admin';
import Link from 'next/link';

export const metadata = { title: 'Publications | Admin Console' };

export default async function AdminPublicationsPage() {
  let pubs: Awaited<ReturnType<typeof prisma.publication.findMany>> = [];
  try {
    pubs = await prisma.publication.findMany({ orderBy: [{ order: 'asc' }, { year: 'desc' }] });
  } catch { /* DB not connected */ }

  const isUsingFallback = pubs.length === 0;

  return (
    <div className="max-w-6xl mx-auto pt-8 sm:pt-4">

      {/* Status banner */}
      {isUsingFallback ? (
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <i className="ph ph-warning text-yellow-400 text-xl mt-0.5 flex-shrink-0"></i>
            <div>
              <p className="font-bold text-yellow-400 text-sm">No publications in the database yet</p>
              <p className="text-yellow-400/70 text-xs mt-0.5">Seed sample publications to get started, or add your own with &ldquo;+ Add Publication&rdquo;.</p>
            </div>
          </div>
          <form action={async () => { 'use server'; await seedDefaultPublications(); }}>
            <button type="submit" className="whitespace-nowrap px-5 py-2.5 rounded-lg bg-yellow-500 text-black font-bold text-sm hover:bg-yellow-400 transition-colors">
              Seed 4 Samples →
            </button>
          </form>
        </div>
      ) : (
        <div className="mb-6 flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
          <div className="flex items-center gap-3">
            <i className="ph ph-check-circle text-green-400 text-lg"></i>
            <p className="text-green-400 text-sm font-semibold">
              Live — {pubs.filter(p => p.isPublished).length} published publication{pubs.filter(p => p.isPublished).length !== 1 ? 's' : ''} shown on the homepage.
            </p>
          </div>
          <Link href="/#publications" target="_blank" className="text-xs font-mono font-bold text-green-400 hover:text-green-300 flex items-center gap-1">
            View on site <i className="ph ph-arrow-square-out"></i>
          </Link>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">Publications</h1>
          <p className="text-[var(--text-secondary)]">Manage research papers and journal articles shown on the homepage.</p>
        </div>
        <Link href="/admin/publications/new" className="px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity">
          + Add Publication
        </Link>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--text-primary)]/[0.02] border-b border-[var(--text-primary)]/10 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                <th className="p-5 font-semibold">Year</th>
                <th className="p-5 font-semibold">Title & Authors</th>
                <th className="p-5 font-semibold">Journal / Conference</th>
                <th className="p-5 font-semibold">Link</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {pubs.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-[var(--text-secondary)]">
                    No publications yet. Seed samples or click &ldquo;+ Add Publication&rdquo;.
                  </td>
                </tr>
              )}
              {pubs.map((pub) => (
                <tr key={pub.id} className="border-b border-[var(--text-primary)]/5 hover:bg-[var(--text-primary)]/[0.02] transition-colors">
                  <td className="p-5 whitespace-nowrap font-mono text-sm font-bold text-[var(--accent-primary)]">
                    {pub.year}
                  </td>
                  <td className="p-5 max-w-sm">
                    <div className="font-semibold text-[var(--text-primary)] line-clamp-1">{pub.title}</div>
                    <div className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-1">{pub.authors}</div>
                  </td>
                  <td className="p-5 max-w-xs">
                    {pub.journal ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-xs font-mono">
                        <i className="ph ph-book-open"></i> {pub.journal}
                      </span>
                    ) : (
                      <span className="text-xs text-[var(--text-secondary)]/40">—</span>
                    )}
                  </td>
                  <td className="p-5">
                    {pub.link ? (
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent-primary)] hover:underline flex items-center gap-1">
                        <i className="ph ph-arrow-square-out"></i> View
                      </a>
                    ) : (
                      <span className="text-xs text-[var(--text-secondary)]/40">—</span>
                    )}
                  </td>
                  <td className="p-5">
                    {pub.isPublished ? (
                      <span className="text-green-500 font-bold text-xs uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Published
                      </span>
                    ) : (
                      <span className="text-yellow-500 font-bold text-xs uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Hidden
                      </span>
                    )}
                  </td>
                  <td className="p-5">
                    <div className="flex justify-end gap-3">
                      <Link href={`/admin/publications/${pub.id}/edit`} className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors">
                        Edit
                      </Link>
                      <form action={async () => { 'use server'; await togglePublicationPublished(pub.id, pub.isPublished); }}>
                        <button type="submit" className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-[var(--text-primary)]/20 hover:bg-[var(--text-primary)]/10 transition-colors">
                          {pub.isPublished ? 'Hide' : 'Show'}
                        </button>
                      </form>
                      <form action={async () => { 'use server'; await deletePublication(pub.id); }}>
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
    </div>
  );
}
