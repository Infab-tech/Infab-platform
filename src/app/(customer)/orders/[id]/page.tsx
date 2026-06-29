import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/supabase/prisma';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import Chatbox from '@/components/ui/Chatbox';

export default async function CustomerQuoteDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { id } = await params;

    // Mark unread messages from ADMIN as read
    await prisma.quoteMessage.updateMany({
        where: { quoteRequestId: id, senderRole: 'ADMIN', isRead: false },
        data: { isRead: true }
    });

    const quote = await prisma.quoteRequest.findUnique({
        where: { id, userId: user.id },
        include: {
            items: {
                include: { product: true }
            },
            messages: {
                orderBy: { createdAt: 'asc' }
            }
        }
    });

    if (!quote) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex justify-between items-center mb-6 flex-shrink-0">
                <div>
                    <Link href="/orders" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-2 inline-flex items-center gap-1">
                        <i className="ph ph-arrow-left"></i> Back to Orders
                    </Link>
                    <h2 className="text-3xl font-bold">Quote #{quote.id.slice(-6).toUpperCase()}</h2>
                </div>
                <div>
                    <span className={`px-4 py-2 rounded text-sm font-bold uppercase tracking-wider ${
                        quote.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                        quote.status === 'QUOTED' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                    }`}>
                        {quote.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
                {/* Details Column */}
                <div className="md:col-span-1 bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl p-6 overflow-y-auto">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-4">Request Details</h3>
                    <div className="mb-6">
                        <div className="text-[var(--text-primary)] font-bold text-sm">Date Submitted</div>
                        <div className="text-[var(--text-secondary)] text-sm">{new Date(quote.createdAt).toLocaleDateString()}</div>
                    </div>
                    
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-4">Products</h3>
                    <div className="flex flex-col gap-4">
                        {quote.items.map((item) => (
                            <div key={item.id} className="bg-[var(--text-primary)]/5 p-4 rounded-lg">
                                <div className="font-bold text-[var(--text-primary)] text-sm">{item.product.name}</div>
                                <div className="text-xs text-[var(--text-secondary)] mt-1">Quantity: {item.quantity}</div>
                            </div>
                        ))}
                    </div>

                    {quote.notes && (
                        <div className="mt-6">
                            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">Notes</h3>
                            <p className="text-sm text-[var(--text-secondary)] italic">{quote.notes}</p>
                        </div>
                    )}
                </div>

                {/* Messaging Column */}
                <Chatbox quoteId={quote.id} messages={quote.messages} currentRole="CUSTOMER" />
            </div>
        </div>
    );
}
