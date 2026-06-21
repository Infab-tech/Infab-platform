import { prisma } from '@/lib/supabase/prisma';
import Link from 'next/link';

export const metadata = {
    title: 'Admin Console | INFAB',
};

export default async function AdminDashboardPage() {
    const [pendingInquiriesCount, totalProductsCount, pendingQuotesCount] = await prisma.$transaction([
        prisma.inquiry.count({ where: { status: 'PENDING' } }),
        prisma.product.count({ where: { isActive: true } }),
        prisma.quoteRequest.count({ where: { status: 'PENDING' } }),
    ]);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">Command Center</h1>
                <p className="text-[var(--text-secondary)]">Overview of system activity and pending actions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                {/* Stat Card 1 */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20"><i className="ph ph-envelope-simple text-6xl"></i></div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">Pending Inquiries</h3>
                    <div className="text-5xl font-bold text-[var(--text-primary)] mb-4">{pendingInquiriesCount}</div>
                    <Link href="/admin/inquiries" className="text-sm text-[var(--accent-primary)] font-semibold hover:text-[var(--text-primary)] transition-colors">
                        View Inquiries &rarr;
                    </Link>
                </div>

                {/* Stat Card 2 */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20"><i className="ph ph-receipt text-6xl"></i></div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">Pending Quotes</h3>
                    <div className="text-5xl font-bold text-[var(--text-primary)] mb-4">{pendingQuotesCount}</div>
                    <Link href="/admin/orders" className="text-sm text-[var(--accent-primary)] font-semibold hover:text-[var(--text-primary)] transition-colors">
                        Manage Quotes &rarr;
                    </Link>
                </div>

                {/* Stat Card 3 */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20"><i className="ph ph-microchip text-6xl"></i></div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">Active Products</h3>
                    <div className="text-5xl font-bold text-[var(--text-primary)] mb-4">{totalProductsCount}</div>
                    <Link href="/admin/products" className="text-sm text-[var(--accent-primary)] font-semibold hover:text-[var(--text-primary)] transition-colors">
                        Edit Catalog &rarr;
                    </Link>
                </div>

            </div>
        </div>
    );
}