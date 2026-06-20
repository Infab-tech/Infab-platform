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

export async function addNewProduct(formData: FormData) {
    await verifyAdmin();

    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const specsRaw = formData.get('specs') as string;
    const imageUrlsRaw = formData.get('imageUrls') as string;

    if (!name || !category || !description) {
        return { success: false, message: 'Missing required fields.' };
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-6);
    const specs = specsRaw ? specsRaw.split(',').map((s) => s.trim()).filter(Boolean) : [];
    const imageUrls: string[] = imageUrlsRaw ? JSON.parse(imageUrlsRaw) : [];

    try {
        await prisma.product.create({
            data: {
                name,
                slug,
                category,
                description,
                specs,
                imageUrl: imageUrls[0] ?? null,
                imageUrls,
                isActive: true,
            },
        });
        revalidatePath('/admin/products');
        revalidatePath('/products');
    } catch (error) {
        console.error('Failed to add product:', error);
        return { success: false, message: 'Database error. Could not save product.' };
    }

    redirect('/admin/products');
}

export async function updateProduct(id: string, formData: FormData) {
    await verifyAdmin();

    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const specsRaw = formData.get('specs') as string;
    const imageUrlsRaw = formData.get('imageUrls') as string;

    if (!name || !category || !description) {
        return { success: false, message: 'Missing required fields.' };
    }

    const specs = specsRaw ? specsRaw.split(',').map((s) => s.trim()).filter(Boolean) : [];
    const imageUrls: string[] = imageUrlsRaw ? JSON.parse(imageUrlsRaw) : [];

    try {
        await prisma.product.update({
            where: { id },
            data: {
                name,
                category,
                description,
                specs,
                imageUrl: imageUrls[0] ?? null,
                imageUrls,
            },
        });
        revalidatePath('/admin/products');
        revalidatePath('/products');
    } catch (error) {
        console.error('Failed to update product:', error);
        return { success: false, message: 'Database error. Could not update product.' };
    }

    redirect('/admin/products');
}

// ── News Article Actions ──────────────────────────────────────────────────────

export async function addNewsArticle(formData: FormData) {
    await verifyAdmin();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const link = formData.get('link') as string;
    const publishedAt = formData.get('publishedAt') as string;
    const isPublished = formData.get('isPublished') === 'on';

    if (!title || !description) {
        return { success: false, message: 'Title and description are required.' };
    }

    try {
        await prisma.newsArticle.create({
            data: {
                title,
                description,
                category: category || 'General',
                link: link || null,
                publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
                isPublished,
            },
        });
        revalidatePath('/admin/news');
        revalidatePath('/news');
    } catch (error) {
        console.error('Failed to add news article:', error);
        return { success: false, message: 'Database error. Could not save article.' };
    }

    redirect('/admin/news');
}

export async function updateNewsArticle(id: string, formData: FormData) {
    await verifyAdmin();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const link = formData.get('link') as string;
    const publishedAt = formData.get('publishedAt') as string;
    const isPublished = formData.get('isPublished') === 'on';

    if (!title || !description) {
        return { success: false, message: 'Title and description are required.' };
    }

    try {
        await prisma.newsArticle.update({
            where: { id },
            data: {
                title,
                description,
                category: category || 'General',
                link: link || null,
                publishedAt: publishedAt ? new Date(publishedAt) : undefined,
                isPublished,
            },
        });
        revalidatePath('/admin/news');
        revalidatePath('/news');
    } catch (error) {
        console.error('Failed to update news article:', error);
        return { success: false, message: 'Database error. Could not update article.' };
    }

    redirect('/admin/news');
}

export async function deleteNewsArticle(id: string) {
    try {
        await verifyAdmin();
        await prisma.newsArticle.delete({ where: { id } });
        revalidatePath('/admin/news');
        revalidatePath('/news');
        return { success: true };
    } catch (e: unknown) {
        console.error('Failed to delete news article:', e);
        return { success: false, message: 'Failed to delete article.' };
    }
}

export async function toggleNewsPublished(id: string, currentStatus: boolean) {
    await verifyAdmin();
    await prisma.newsArticle.update({
        where: { id },
        data: { isPublished: !currentStatus },
    });
    revalidatePath('/admin/news');
    revalidatePath('/news');
}