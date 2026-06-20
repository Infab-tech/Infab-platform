import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/supabase/prisma';
import Link from 'next/link';

export const metadata = {
    title: 'Dashboard | INFAB Client Portal',
};

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) return null;

    // Fetch user's quotes
    const quotes = await prisma.quoteRequest.findMany({
        where: { userEmail: user.email },
        orderBy: { createdAt: 'desc' },
        include: {
            items: {
                include: { product: true }
            }
        }
    });

    // Calculate Stats
    const activeQuotesCount = quotes.filter(q => q.status === 'PENDING' || q.status === 'REVIEWING' || q.status === 'QUOTED').length;
    const ordersInProductionCount = quotes.filter(q => q.status === 'ACCEPTED').length;

    return (
        <div className="max-w-5xl">
            <h2 className="text-3xl font-bold mb-2">Welcome back.</h2>
            <p className="text-[var(--text-secondary)] mb-10">
                Manage your active quotes, order history, and engineering requests.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 p-6 rounded-xl">
                    <div className="text-[var(--text-secondary)] font-mono text-xs uppercase tracking-wider mb-2">Active Quotes</div>
                    <div className="text-4xl font-bold text-[var(--text-primary)]">{activeQuotesCount}</div>
                </div>
                <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 p-6 rounded-xl">
                    <div className="text-[var(--text-secondary)] font-mono text-xs uppercase tracking-wider mb-2">Orders in Production</div>
                    <div className="text-4xl font-bold text-[var(--text-primary)]">{ordersInProductionCount}</div>
                </div>
                <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 p-6 rounded-xl">
                    <div className="text-[var(--text-secondary)] font-mono text-xs uppercase tracking-wider mb-2">Unread Messages</div>
                    <div className="text-4xl font-bold text-[var(--text-primary)]">0</div>
                </div>
            </div>

            {/* Recent Activity Area */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[var(--text-primary)]/10 flex justify-between items-center">
                    <h3 className="font-bold text-[var(--text-primary)]">Recent Activity</h3>
                    <Link href="/orders" className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-colors">
                        View All
                    </Link>
                </div>
                
                {quotes.length === 0 ? (
                    <div className="p-12 text-center text-[var(--text-secondary)] flex flex-col items-center">
                        <i className="ph ph-folder-open text-4xl mb-3 opacity-50"></i>
                        <p>No recent activity.</p>
                        <p className="text-sm mt-2">When you request a quote from our products page, it will appear here.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-[var(--text-primary)]/10">
                        {quotes.slice(0, 5).map((quote) => (
                            <div key={quote.id} className="p-6 hover:bg-[var(--text-primary)]/[0.02] transition-colors flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-[var(--text-primary)] mb-1">
                                        Quote Request #{quote.id.slice(-6).toUpperCase()}
                                    </div>
                                    <div className="text-sm text-[var(--text-secondary)] flex gap-4">
                                        <span>{new Date(quote.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        <span>•</span>
                                        <span>{quote.items.length} product(s)</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                        quote.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500' :
                                        quote.status === 'QUOTED' ? 'bg-blue-500/10 text-blue-500' :
                                        quote.status === 'ACCEPTED' ? 'bg-green-500/10 text-green-500' :
                                        'bg-gray-500/10 text-gray-500'
                                    }`}>
                                        {quote.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}