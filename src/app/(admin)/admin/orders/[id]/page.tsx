import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/supabase/prisma';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { sendQuoteMessage } from '@/app/actions/quotes';
import { updateQuoteStatus, verifyAdmin } from '@/app/actions/admin';

export default async function AdminQuoteDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect('/login');

    await verifyAdmin();

    const { id } = await params;

    // Mark unread messages from CUSTOMER as read
    await prisma.quoteMessage.updateMany({
        where: { quoteRequestId: id, senderRole: 'CUSTOMER', isRead: false },
        data: { isRead: true }
    });

    const quote = await prisma.quoteRequest.findUnique({
        where: { id },
        include: {
            items: {
                include: { product: true }
            },
            messages: {
                orderBy: { createdAt: 'asc' }
            }
        }
    });

    if (!quote) notFound();

    return (
        <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex justify-between items-center mb-6 flex-shrink-0">
                <div>
                    <a href="/admin/orders" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-2 inline-flex items-center gap-1">
                        <i className="ph ph-arrow-left"></i> Back to Quote Requests
                    </a>
                    <h2 className="text-3xl font-bold flex items-center gap-4">
                        Quote #{quote.id.slice(-6).toUpperCase()}
                        <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                            quote.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                            quote.status === 'QUOTED' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                            'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                        }`}>
                            {quote.status}
                        </span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-sm mt-1">Client: {quote.userEmail}</p>
                </div>
                
                {/* Admin Status Controls */}
                <div className="flex gap-2">
                    {quote.status === 'PENDING' && (
                        <form action={async () => {
                            'use server';
                            await updateQuoteStatus(quote.id, 'QUOTED');
                        }}>
                            <button type="submit" className="px-4 py-2 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-black transition-colors rounded text-sm font-bold uppercase">
                                Mark Quoted
                            </button>
                        </form>
                    )}
                    {quote.status === 'QUOTED' && (
                        <form action={async () => {
                            'use server';
                            await updateQuoteStatus(quote.id, 'PENDING');
                        }}>
                            <button type="submit" className="px-4 py-2 bg-[var(--text-primary)]/10 text-[var(--text-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors rounded text-sm font-bold uppercase">
                                Unquote
                            </button>
                        </form>
                    )}
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
                    
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-4">Requested Products</h3>
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
                            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">Client Notes</h3>
                            <p className="text-sm text-[var(--text-secondary)] italic bg-[var(--text-primary)]/5 p-4 rounded-lg">{quote.notes}</p>
                        </div>
                    )}
                </div>

                {/* Messaging Column */}
                <div className="md:col-span-2 bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-[var(--text-primary)]/10 bg-[var(--text-primary)]/5">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] font-bold">Client Communication</h3>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                        {quote.messages.length === 0 && (
                            <div className="flex-1 flex items-center justify-center text-[var(--text-secondary)] text-sm italic opacity-50">
                                No messages in this thread.
                            </div>
                        )}
                        {quote.messages.map((msg) => {
                            const isAdmin = msg.senderRole === 'ADMIN';
                            return (
                                <div key={msg.id} className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}>
                                    <div className="text-[10px] text-[var(--text-secondary)] mb-1 mx-1 flex gap-2">
                                        {isAdmin ? (
                                            <>
                                                <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                <span className="text-[var(--accent-primary)] font-bold">You (Admin)</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="font-bold">{msg.senderEmail}</span>
                                                <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </>
                                        )}
                                    </div>
                                    <div className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                                        isAdmin 
                                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-tr-none' 
                                        : 'bg-[var(--text-primary)]/10 text-[var(--text-primary)] rounded-tl-none'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="p-4 border-t border-[var(--text-primary)]/10 bg-[var(--text-primary)]/[0.02]">
                        <form action={async (formData) => {
                            'use server';
                            const text = formData.get('message') as string;
                            await sendQuoteMessage(quote.id, text);
                        }} className="flex gap-2">
                            <input 
                                type="text" 
                                name="message"
                                placeholder="Type a message to the client..." 
                                required
                                className="flex-1 bg-white border border-[var(--text-primary)]/20 rounded-lg px-4 py-3 text-sm text-black focus:outline-none focus:border-[var(--accent-primary)] transition-colors shadow-inner"
                            />
                            <button type="submit" className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 py-3 rounded-lg font-bold text-sm uppercase hover:bg-[var(--accent-primary)] hover:text-black transition-colors shadow-lg">
                                Send Reply
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
