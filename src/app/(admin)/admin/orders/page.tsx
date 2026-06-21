import { prisma } from '@/lib/supabase/prisma';
import { updateQuoteStatus } from '@/app/actions/admin';
import DeleteQuoteRequestButton from './DeleteQuoteRequestButton';

import Pagination from '@/components/ui/Pagination';

export const metadata = {
    title: 'Quote Requests | Admin Console',
};

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const { page } = await searchParams;
    const currentPage = Math.max(1, parseInt(page || '1', 10));
    const PAGE_SIZE = 10;

    const totalQuotes = await prisma.quoteRequest.count({ where: { deletedByAdmin: false } });
    const totalPages = Math.ceil(totalQuotes / PAGE_SIZE);

    // Fetch quotes with the nested product data
    const quotes = await prisma.quoteRequest.findMany({
        where: { deletedByAdmin: false },
        orderBy: { createdAt: 'desc' },
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        include: {
            items: {
                include: { product: true }
            },
            messages: {
                orderBy: { createdAt: 'desc' },
                take: 1
            }
        }
    });

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">Quote Requests</h1>
                <p className="text-[var(--text-secondary)]">Manage product quotation requests from verified clients.</p>
            </div>

            <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/5 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[var(--text-primary)]/[0.02] border-b border-[var(--text-primary)]/5 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                                <th className="p-5 font-semibold">Quote ID / Client</th>
                                <th className="p-5 font-semibold">Requested Products</th>
                                <th className="p-5 font-semibold">Engineering Notes</th>
                                <th className="p-5 font-semibold">Status</th>
                                <th className="p-5 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {quotes.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-[var(--text-secondary)]">No quote requests found.</td>
                                </tr>
                            )}
                            {quotes.map((quote) => (
                                <tr key={quote.id} className="border-b border-[var(--text-primary)]/5 hover:bg-[var(--text-primary)]/[0.02] transition-colors">
                                    <td className="p-5">
                                        <div className="font-mono text-xs text-[var(--text-secondary)] mb-1">
                                            #{quote.id.slice(-8).toUpperCase()}
                                        </div>
                                        <div className="font-bold text-[var(--text-primary)]">{quote.userEmail}</div>
                                        <div className="text-xs text-[var(--text-secondary)] mt-1">
                                            {new Date(quote.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        {quote.items.map((item, idx) => (
                                            <div key={idx} className="mb-2 last:mb-0">
                                                <div className="font-bold text-[var(--accent-primary)]">{item.product.name}</div>
                                                <div className="text-xs text-[var(--text-secondary)]">Quantity: {item.quantity} units</div>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="p-5 max-w-xs">
                                        <p className="text-[var(--text-secondary)] text-xs italic">
                                            {quote.notes || 'No custom notes provided.'}
                                        </p>
                                    </td>
                                    <td className="p-5">
                                        {quote.status === 'PENDING' && <span className="inline-flex px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded text-xs font-bold uppercase">Pending</span>}
                                        {quote.status === 'QUOTED' && <span className="inline-flex px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-bold uppercase">Quoted</span>}
                                    </td>
                                    <td className="p-5 text-right">
                                        {quote.status === 'PENDING' && (
                                            <div className="flex gap-2 justify-end">
                                                <form action={async () => {
                                                    'use server';
                                                    await updateQuoteStatus(quote.id, 'QUOTED');
                                                }}>
                                                    <button type="submit" className="px-4 py-2 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-black transition-colors rounded text-xs font-bold uppercase">
                                                        Mark Quoted
                                                    </button>
                                                </form>
                                                <div className="relative flex">
                                                    <a href={`/admin/orders/${quote.id}`} className="px-4 py-2 bg-[var(--text-primary)]/10 text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors rounded text-xs font-bold uppercase">
                                                        View & Message
                                                    </a>
                                                    {quote.messages[0]?.senderRole === 'CUSTOMER' && !quote.messages[0]?.isRead && (
                                                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {quote.status === 'QUOTED' && (
                                            <div className="flex gap-2 justify-end">
                                                <form action={async () => {
                                                    'use server';
                                                    await updateQuoteStatus(quote.id, 'PENDING');
                                                }}>
                                                    <button type="submit" className="px-4 py-2 bg-[var(--text-primary)]/10 text-[var(--text-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors rounded text-xs font-bold uppercase">
                                                        Unquote
                                                    </button>
                                                </form>
                                                <div className="relative flex">
                                                    <a href={`/admin/orders/${quote.id}`} className="px-4 py-2 bg-[var(--text-primary)]/10 text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors rounded text-xs font-bold uppercase">
                                                        View & Message
                                                    </a>
                                                    {quote.messages[0]?.senderRole === 'CUSTOMER' && !quote.messages[0]?.isRead && (
                                                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                                        </span>
                                                    )}
                                                </div>
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