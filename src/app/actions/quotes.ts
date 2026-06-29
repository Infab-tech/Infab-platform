'use server';

import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/supabase/prisma';
import { revalidatePath } from 'next/cache';
import { sendEmail } from '@/lib/email';

export async function sendQuoteMessage(quoteId: string, text: string) {
    if (!text || text.trim() === '') return { success: false, message: 'Message is empty' };

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        throw new Error('Unauthorized');
    }

    // Verify the user actually owns this quote request OR is an admin
    const quote = await prisma.quoteRequest.findUnique({
        where: { id: quoteId }
    });

    if (!quote) {
        throw new Error('Quote request not found');
    }

    const userRole = await prisma.userRole.findUnique({
        where: { email: user.email.toLowerCase() }
    });

    const isAdmin = userRole && userRole.role === 'ADMIN';

    // If they aren't an admin, and they aren't the owner, block it.
    if (!isAdmin && quote.userId !== user.id) {
        throw new Error('Unauthorized');
    }

    // Save the message
    await prisma.quoteMessage.create({
        data: {
            quoteRequestId: quoteId,
            senderRole: isAdmin ? 'ADMIN' : 'CUSTOMER',
            senderEmail: user.email,
            text: text.trim()
        }
    });

    revalidatePath(`/orders/${quoteId}`);
    revalidatePath(`/admin/orders/${quoteId}`);

    // Send email notification asynchronously
    if (isAdmin) {
        sendEmail({
            to: quote.userEmail,
            subject: `New message regarding your Quote #${quoteId.slice(-6).toUpperCase()}`,
            html: `<p>An admin has replied to your quote request:</p><p><em>"${text.trim()}"</em></p><p><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/orders/${quoteId}">View Quote</a></p>`
        }).catch(console.error);
    } else {
        sendEmail({
            to: process.env.ADMIN_EMAIL || 'info@infab-tech.com',
            subject: `New message on Quote #${quoteId.slice(-6).toUpperCase()}`,
            html: `<p>Customer ${user.email} has replied to quote request #${quoteId.slice(-6).toUpperCase()}:</p><p><em>"${text.trim()}"</em></p>`
        }).catch(console.error);
    }

    return { success: true };
}
