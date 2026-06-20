'use server';

import { prisma } from '@/lib/supabase/prisma';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

// Helper function to double-check admin authorization on the server
async function verifyAdmin() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        throw new Error('Unauthorized');
    }

    const userRole = await prisma.userRole.findUnique({
        where: { email: user.email.toLowerCase() }
    });

    if (!userRole || userRole.role !== 'ADMIN') {
        throw new Error('Unauthorized');
    }
}

export async function updateInquiryStatus(id: string, status: string) {
    await verifyAdmin();
    await prisma.inquiry.update({
        where: { id },
        data: { status }
    });
    revalidatePath('/admin/inquiries');
    revalidatePath('/admin');
}

export async function updateQuoteStatus(id: string, status: string) {
    await verifyAdmin();
    await prisma.quoteRequest.update({
        where: { id },
        data: { status }
    });
    revalidatePath('/admin/orders');
    revalidatePath('/admin');
}

export async function deleteInquiry(id: string) {
    try {
        await verifyAdmin();
        const inquiry = await prisma.inquiry.findUnique({ where: { id } });
        if (!inquiry) throw new Error('Inquiry not found');
        if (inquiry.status !== 'RESOLVED') {
            throw new Error('Only resolved inquiries can be deleted');
        }
        await prisma.inquiry.delete({
            where: { id }
        });
        revalidatePath('/admin/inquiries');
        revalidatePath('/admin');
        return { success: true };
    } catch (e: any) {
        console.error('Failed to delete inquiry:', e);
        return { success: false, message: e.message || 'Failed to delete inquiry' };
    }
}

export async function deleteQuoteRequest(id: string) {
    try {
        await verifyAdmin();
        const quote = await prisma.quoteRequest.findUnique({ where: { id } });
        if (!quote) throw new Error('Quote request not found');
        if (quote.status !== 'QUOTED') {
            throw new Error('Only quoted/resolved requests can be deleted');
        }
        await prisma.quoteRequest.update({
            where: { id },
            data: { deletedByAdmin: true }
        });
        revalidatePath('/admin/orders');
        revalidatePath('/admin');
        return { success: true };
    } catch (e: any) {
        console.error('Failed to delete quote request:', e);
        return { success: false, message: e.message || 'Failed to delete quote request' };
    }
}

// Add these to the bottom of src/app/actions/admin.ts

export async function toggleProductStatus(id: string, currentStatus: boolean) {
    await verifyAdmin();
    await prisma.product.update({
        where: { id },
        data: { isActive: !currentStatus }
    });
    revalidatePath('/admin/products');
    revalidatePath('/products'); // Updates the public page too!
}

export async function deleteProduct(id: string) {
    await verifyAdmin();
    await prisma.product.delete({
        where: { id }
    });
    revalidatePath('/admin/products');
    revalidatePath('/products');
}

// Add this to the bottom of src/app/actions/admin.ts

export async function addNewProduct(formData: FormData) {
    await verifyAdmin(); // Ensure the user is still a valid admin

    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;

    if (!name || !category || !description) {
        return { success: false, message: "Missing required fields." };
    }

    // Create a URL-friendly slug (e.g., "New Sensor!" -> "new-sensor-167890")
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-6);

    try {
        await prisma.product.create({
            data: {
                name,
                slug,
                category,
                description,
                isActive: true, // New products are active by default
            }
        });

        // Refresh the caches so the new product appears instantly
        revalidatePath('/admin/products');
        revalidatePath('/products');

    } catch (error) {
        console.error("Failed to add product:", error);
        return { success: false, message: "Database error. Could not save product." };
    }

    // Redirect back to the products table after successful creation
    redirect('/admin/products');
}