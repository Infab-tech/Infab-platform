import { prisma } from '@/lib/supabase/prisma';
import { togglePartnerActive, deletePartner, seedDefaultPartners } from '@/app/actions/admin';
import Link from 'next/link';
import Image from 'next/image';

import Pagination from '@/components/ui/Pagination';

export const metadata = { title: 'Partners Management | Admin Console' };

export default async function AdminPartnersPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || '1', 10));
  const PAGE_SIZE = 10;

  const totalPartners = await prisma.partner.count();
  const totalPages = Math.ceil(totalPartners / PAGE_SIZE);

  let partners: Awaited<ReturnType<typeof prisma.partner.findMany>> = [];
  try {
    partners = await prisma.partner.findMany({ 
        orderBy: [{ order: 'asc' }],
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
    });
  } catch {
    // DB not connected yet
  }

  const isUsingFallback = partners.length === 0 && totalPartners === 0;

  return (
    <div className="max-w-6xl mx-auto pt-8 sm:pt-4">

      {/* Seed banner */}
      {isUsingFallback ? (
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <i className="ph ph-warning text-yellow-400 text-xl mt-0.5 flex-shrink-0"></i>
            <div>
              <p className="font-bold text-yellow-400 text-sm">Homepage is showing hardcoded fallback partners</p>
              <p className="text-yellow-400/70 text-xs mt-0.5">The database has no partners yet. Seed the defaults to take control — you can then edit or add logos to each entry.</p>
            </div>
          </div>
          <form action={async () => { 'use server'; await seedDefaultPartners(); }}>
            <button type="submit" className="whitespace-nowrap px-5 py-2.5 rounded-lg bg-yellow-500 text-black font-bold text-sm hover:bg-yellow-400 transition-colors">
              Seed 18 Defaults →
            </button>
          </form>
        </div>
      ) : (
        <div className="mb-6 flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
          <div className="flex items-center gap-3">
            <i className="ph ph-check-circle text-green-400 text-lg"></i>
            <p className="text-green-400 text-sm font-semibold">
              Live — homepage is showing {totalPartners} DB partner{totalPartners !== 1 ? 's' : ''}.
            </p>
          </div>
          <Link href="/" target="_blank" className="text-xs font-mono font-bold text-green-400 hover:text-green-300 flex items-center gap-1">
            View on site <i className="ph ph-arrow-square-out"></i>
          </Link>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
        <div className="mt-2 sm:mt-0">
          <h1 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">Partners & Supporters</h1>
          <p className="text-[var(--text-secondary)]">Manage the scrolling logos shown on the homepage.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="px-4 py-3 rounded-lg border border-[var(--text-primary)]/20 text-[var(--text-secondary)] font-bold text-sm hover:bg-[var(--text-primary)]/5 transition-colors flex items-center gap-2">
            <i className="ph ph-eye"></i> Preview
          </Link>
          <Link
            href="/admin/partners/new"
            className="px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
          >
            + Add Partner
          </Link>
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--text-primary)]/[0.02] border-b border-[var(--text-primary)]/10 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                <th className="p-5 font-semibold w-24">Logo</th>
                <th className="p-5 font-semibold">Name</th>
                <th className="p-5 font-semibold">Website URL</th>
                <th className="p-5 font-semibold">Order</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {partners.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-[var(--text-secondary)]">
                    No partners yet. Click &ldquo;+ Add Partner&rdquo;.
                  </td>
                </tr>
              )}
              {partners.map((p) => (
                <tr key={p.id} className="border-b border-[var(--text-primary)]/5 hover:bg-[var(--text-primary)]/[0.02] transition-colors text-[var(--text-primary)]">
                  <td className="p-5">
                    {p.logoUrl ? (
                      <div className="w-16 h-10 overflow-hidden relative flex items-center">
                        <Image src={p.logoUrl} alt={p.name} width={64} height={40} className="object-contain" />
                      </div>
                    ) : (
                      <div className="text-xs text-[var(--text-secondary)] italic">No Logo</div>
                    )}
                  </td>
                  <td className="p-5">
                    <div className="font-semibold text-[var(--text-primary)]">{p.name}</div>
                  </td>
                  <td className="p-5">
                    {p.websiteUrl ? (
                      <a href={p.websiteUrl} target="_blank" rel="noreferrer" className="text-xs text-[var(--accent-primary)] hover:underline">
                        {p.websiteUrl}
                      </a>
                    ) : (
                      <span className="text-xs text-[var(--text-secondary)]">-</span>
                    )}
                  </td>
                  <td className="p-5 font-mono text-xs text-[var(--text-secondary)]">
                    #{p.order}
                  </td>
                  <td className="p-5">
                    {p.isActive ? (
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
                        href={`/admin/partners/${p.id}/edit`}
                        className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors"
                      >
                        Edit
                      </Link>

                      <form action={async () => {
                        'use server';
                        await togglePartnerActive(p.id, p.isActive);
                      }}>
                        <button type="submit" className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-[var(--text-primary)]/20 hover:bg-[var(--text-primary)]/10 transition-colors">
                          {p.isActive ? 'Hide' : 'Show'}
                        </button>
                      </form>

                      <form action={async () => {
                        'use server';
                        await deletePartner(p.id);
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
