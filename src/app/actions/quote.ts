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