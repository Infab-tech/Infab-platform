'use server';

import { prisma } from '@/lib/supabase/prisma';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { sendEmail } from '@/lib/email';
import { getAdminEmailNotificationSetting } from '@/app/actions/settings';

export async function submitQuoteRequest(formData: FormData) {
    try {
        // 1. Verify the user is securely logged in
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { success: false, message: "Unauthorized." };
        }

        // 2. Extract data from the form
        const productId = formData.get('productId') as string;
        const quantity = parseInt(formData.get('quantity') as string, 10);
        const notes = formData.get('notes') as string;

        if (!productId || isNaN(quantity) || quantity < 1 || productId.startsWith('default-')) {
            return { success: false, message: "Invalid product selection or quantity. Fallback products cannot be quoted." };
        }

        // Verify product exists in DB
        const productExists = await prisma.product.findUnique({ where: { id: productId } });
        if (!productExists) {
            return { success: false, message: "Selected product does not exist." };
        }

        // 3. Create the Quote Request and the Quote Item in one transaction
        await prisma.quoteRequest.create({
            data: {
                userId: user.id,
                userEmail: user.email || 'unknown',
                notes: notes || null,
                items: {
                    create: [
                        {
                            productId: productId,
                            quantity: quantity
                        }
                    ]
                }
            }
        });

        // 4. Tell Next.js to refresh the dashboard data
        revalidatePath('/dashboard');
        revalidatePath('/orders');

        // 5. Send notification if enabled
        const emailNotificationsEnabled = await getAdminEmailNotificationSetting();
        if (emailNotificationsEnabled) {
            await sendEmail({
                to: process.env.ADMIN_EMAIL || 'info@infab-tech.com',
                subject: 'New Quote Request Submitted',
                html: `<p>A new quote request has been submitted by ${user.email}.</p><p>Notes: ${notes || 'None'}</p>`
            }).catch(console.error);
        }

        return { success: true, message: "Quote requested successfully." };
    } catch (error) {
        console.error("Failed to submit quote:", error);
        return { success: false, message: "Failed to submit quote request." };
    }
}

export interface RFQCartItem {
    productId: string;
    quantity: number;
}

export async function submitMultiItemQuote(items: RFQCartItem[], notes: string) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { success: false, message: 'Unauthorized.' };

        if (!items.length) return { success: false, message: 'Your cart is empty.' };

        // Filter out items with fake IDs or negative quantities
        const validItems = items.filter(i => i.quantity >= 1 && !i.productId.startsWith('default-'));
        if (!validItems.length) {
            return { success: false, message: 'Your cart contains invalid items or fallback products that cannot be quoted.' };
        }

        // Verify products exist in DB to prevent foreign key errors
        const dbProducts = await prisma.product.findMany({
            where: { id: { in: validItems.map(i => i.productId) } },
            select: { id: true }
        });
        const validProductIds = new Set(dbProducts.map(p => p.id));
        const finalItems = validItems.filter(i => validProductIds.has(i.productId));

        if (!finalItems.length) {
            return { success: false, message: 'None of the products in your cart are currently available.' };
        }

        await prisma.quoteRequest.create({
            data: {
                userId: user.id,
                userEmail: user.email || 'unknown',
                notes: notes || null,
                items: {
                    create: finalItems.map((i) => ({
                        productId: i.productId,
                        quantity: i.quantity,
                    })),
                },
            },
        });

        revalidatePath('/dashboard');
        revalidatePath('/orders');
        revalidatePath('/admin/orders');
        revalidatePath('/admin');

        const emailNotificationsEnabled = await getAdminEmailNotificationSetting();
        if (emailNotificationsEnabled) {
            await sendEmail({
                to: process.env.ADMIN_EMAIL || 'info@infab-tech.com',
                subject: 'New Multi-Item Quote Request',
                html: `<p>A new multi-item quote request has been submitted by ${user.email}.</p><p>Items: ${finalItems.length}</p><p>Notes: ${notes || 'None'}</p>`
            }).catch(console.error);
        }

        return { success: true, message: 'Quote request submitted successfully.' };
    } catch (error) {
        console.error('Failed to submit multi-item quote:', error);
        return { success: false, message: 'Failed to submit quote request.' };
    }
}