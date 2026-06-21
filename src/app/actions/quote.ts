'use server';

import { prisma } from '@/lib/supabase/prisma';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

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

        if (!productId || isNaN(quantity) || quantity < 1) {
            return { success: false, message: "Invalid product selection or quantity." };
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

        await prisma.quoteRequest.create({
            data: {
                userId: user.id,
                userEmail: user.email || 'unknown',
                notes: notes || null,
                items: {
                    create: items.map((i) => ({
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

        return { success: true, message: 'Quote request submitted successfully.' };
    } catch (error) {
        console.error('Failed to submit multi-item quote:', error);
        return { success: false, message: 'Failed to submit quote request.' };
    }
}