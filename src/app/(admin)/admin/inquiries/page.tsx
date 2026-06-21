import { prisma } from '@/lib/supabase/prisma';
import { updateInquiryStatus } from '@/app/actions/admin';
import DeleteInquiryButton from './DeleteInquiryButton';
import Pagination from '@/components/ui/Pagination';

export const metadata = {
    title: 'Inquiries | Admin Console',
};

export default async function AdminInquiriesPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
    const { page, q } = await searchParams;
    const currentPage = Math.max(1, parseInt(page || '1', 10));
    const PAGE_SIZE = 10;
    const search = q?.trim() || '';

    const where = search ? {
        OR: [
            { firstName: { contains: search, mode: 'insensitive' as const } },
            { lastName:  { contains: search, mode: 'insensitive' as const } },
            { email:     { contains: search, mode: 'insensitive' as const } },
            { organization: { contains: search, mode: 'insensitive' as const } },
        ],
    } : {};

    const [totalInquiries, inquiries] = await prisma.$transaction([
        prisma.inquiry.count({ where }),
        prisma.inquiry.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip: (currentPage - 1) * PAGE_SIZE,
            take: PAGE_SIZE,
        }),
    ]);
    const totalPages = Math.ceil(totalInquiries / PAGE_SIZE);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Public Inquiries</h1>
                <p className="text-[var(--text-secondary)]">Messages submitted from the website contact form.</p>
            </div>

            {/* Search bar */}
            <form method="GET" className="mb-6 flex gap-3">
                <div className="relative flex-1 max-w-sm">
                    <i className="ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"></i>
                    <input
                        type="text"
                        name="q"
                        defaultValue={search}
                        placeholder="Search by name, email, or organisation…"
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-primary)]/50"
                    />
                </div>
                <button type="submit" className="px-4 py-2.5 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] text-sm font-bold hover:opacity-90 transition-opacity">
                    Search
                </button>
                {search && (
                    <a href="/admin/inquiries" className="px-4 py-2.5 rounded-lg border border-[var(--text-primary)]/10 text-sm text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/5 transition-colors">
                        Clear
                    </a>
                )}
            </form>

            <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/5 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[var(--text-primary)]/[0.02] border-b border-[var(--text-primary)]/5 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                                <th className="p-5 font-semibold">Date</th>
                                <th className="p-5 font-semibold">Sender</th>
                                <th className="p-5 font-semibold">Message / Interest</th>
                                <th className="p-5 font-semibold">Status</th>
                                <th className="p-5 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {inquiries.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-[var(--text-secondary)]">
                                        {search ? `No inquiries matching "${search}".` : 'No inquiries found.'}
                                    </td>
                                </tr>
                            )}
                            {inquiries.map((inquiry) => (
                                <tr key={inquiry.id} className="border-b border-[var(--text-primary)]/5 hover:bg-[var(--text-primary)]/[0.02] transition-colors">
                                    <td className="p-5 whitespace-nowrap text-[var(--text-secondary)]">
                                        {new Date(inquiry.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-5">
                                        <div className="font-bold text-[var(--text-primary)]">{inquiry.firstName} {inquiry.lastName}</div>
                                        <div className="text-xs text-[var(--accent-primary)]">{inquiry.email}</div>
                                        <div className="text-xs text-[var(--text-secondary)]">{inquiry.organization}</div>
                                    </td>
                                    <td className="p-5 max-w-xs">
                                        <span className="inline-block px-2 py-1 bg-[var(--text-primary)]/5 rounded text-xs font-mono uppercase text-[var(--text-secondary)] mb-2">
                                            {inquiry.interest}
                                        </span>
                                        <p className="text-[var(--text-secondary)] line-clamp-2" title={inquiry.message}>
                                            {inquiry.message}
                                        </p>
                                    </td>
                                    <td className="p-5">
                                        {inquiry.status === 'PENDING' && <span className="text-yellow-500 font-bold text-xs uppercase">Pending</span>}
                                        {inquiry.status === 'RESOLVED' && <span className="text-green-500 font-bold text-xs uppercase">Resolved</span>}
                                    </td>
                                    <td className="p-5 text-right">
                                        {inquiry.status === 'PENDING' && (
                                            <form action={async () => {
                                                'use server';
                                                await updateInquiryStatus(inquiry.id, 'RESOLVED');
                                            }}>
                                                <button type="submit" className="px-4 py-2 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-black transition-colors rounded text-xs font-bold uppercase">
                                                    Mark Resolved
                                                </button>
                                            </form>
                                        )}
                                        {inquiry.status === 'RESOLVED' && (
                                            <div className="flex gap-2 justify-end">
                                                <form action={async () => {
                                                    'use server';
                                                    await updateInquiryStatus(inquiry.id, 'PENDING');
                                                }}>
                                                    <button type="submit" className="px-4 py-2 bg-[var(--text-primary)]/10 text-[var(--text-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors rounded text-xs font-bold uppercase">
                                                        Unresolve
                                                    </button>
                                                </form>
                                                <DeleteInquiryButton inquiryId={inquiry.id} />
                                            </div>
                                        )}
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
