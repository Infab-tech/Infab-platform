import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/supabase/prisma';
import Link from 'next/link';

export const metadata = {
  title: 'My Quotes & Orders | INFAB Client Portal',
};

export default async function OrdersPage() {
  // 1. Get the securely logged-in user
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // 2. Fetch their quotes from the database, including the nested product details
  const quotes = await prisma.quoteRequest.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
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
    <div className="max-w-5xl">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Quotes & Orders</h2>
          <p className="text-[var(--text-secondary)]">Track the status of your engineering requests.</p>
        </div>
        <Link href="/orders/new" className="px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[#03060c] font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors">
          + Request New Quote
        </Link>
      </div>

      {quotes.length === 0 ? (
        <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-xl p-12 text-center text-[var(--text-secondary)] flex flex-col items-center">
          <i className="ph ph-receipt text-5xl mb-4 opacity-50"></i>
          <p className="text-lg font-medium text-[var(--text-primary)] mb-2">No quotes found.</p>
          <p>You haven't requested any quotes yet. Click the button above to get started.</p>
        </div>
      ) : (
        <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-[var(--text-primary)]/10 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                  <th className="p-5 font-semibold">Quote ID</th>
                  <th className="p-5 font-semibold">Date</th>
                  <th className="p-5 font-semibold">Product(s)</th>
                  <th className="p-5 font-semibold">Status</th>
                  <th className="p-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="border-b border-[var(--text-primary)]/10 hover:bg-white/[0.02] transition-colors">
                    <td className="p-5 font-mono text-[var(--text-secondary)]">
                      #{quote.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="p-5 text-[var(--text-primary)]">
                      {new Date(quote.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-5">
                      {quote.items.map((item, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="font-semibold text-[var(--text-primary)]">{item.product.name}</span>
                          <span className="text-xs text-[var(--text-secondary)]">Vol: {item.quantity} units</span>
                        </div>
                      ))}
                    </td>
                    <td className="p-5">
                      {quote.status === 'PENDING' && <span className="inline-flex px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded text-xs font-bold uppercase tracking-wider">Pending</span>}
                      {quote.status === 'REVIEWING' && <span className="inline-flex px-3 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded text-xs font-bold uppercase tracking-wider">In Review</span>}
                      {quote.status === 'QUOTED' && <span className="inline-flex px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded text-xs font-bold uppercase tracking-wider">Quoted</span>}
                    </td>
                    <td className="p-5 text-right">
                      <div className="relative inline-block">
                        <Link href={`/orders/${quote.id}`} className="text-[var(--accent-primary)] hover:text-[var(--text-primary)] font-medium transition-colors">
                          View Details
                        </Link>
                        {quote.messages[0]?.senderRole === 'ADMIN' && !quote.messages[0]?.isRead && (
                          <span className="absolute -top-1 -right-2 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}