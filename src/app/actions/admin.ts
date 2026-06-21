'use server';

import { prisma } from '@/lib/supabase/prisma';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { FALLBACK_PRODUCTS, FALLBACK_NEWS, FALLBACK_TEAM, FALLBACK_PUBLICATIONS } from '@/lib/content-defaults';

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
    let hasError = false;
    try {
        await prisma.product.delete({
            where: { id }
        });
    } catch (e: any) {
        if (e.code === 'P2003') {
            hasError = true;
        } else {
            throw e;
        }
    }
    revalidatePath('/admin/products');
    revalidatePath('/products');
    
    if (hasError) {
        redirect('/admin/products?error=has_quotes');
    }
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

// ── Seed default content into the DB ─────────────────────────────────────────

export async function seedDefaultProducts() {
    await verifyAdmin();
    const count = await prisma.product.count();
    if (count > 0) return { skipped: true, message: 'Products already in database — seed skipped.' };

    for (const p of FALLBACK_PRODUCTS) {
        const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-6);
        await prisma.product.create({
            data: {
                name: p.name,
                slug,
                category: p.category,
                description: p.description,
                specs: p.specs,
                imageUrl: p.imageUrl ?? null,
                imageUrls: p.imageUrl ? [p.imageUrl] : [],
                isActive: true,
            },
        });
    }
    revalidatePath('/admin/products');
    revalidatePath('/products');
    return { skipped: false, message: `Seeded ${FALLBACK_PRODUCTS.length} products into the database.` };
}

export async function seedDefaultNews() {
    await verifyAdmin();
    const count = await prisma.newsArticle.count();
    if (count > 0) return { skipped: true, message: 'Articles already in database — seed skipped.' };

    for (const a of FALLBACK_NEWS) {
        await prisma.newsArticle.create({
            data: {
                title: a.title,
                description: a.description,
                category: a.category,
                link: a.link,
                publishedAt: a.publishedAt,
                isPublished: true,
            },
        });
    }
    revalidatePath('/admin/news');
    revalidatePath('/news');
    return { skipped: false, message: `Seeded ${FALLBACK_NEWS.length} articles into the database.` };
}

// ── Team Member Actions ───────────────────────────────────────────────────────

export async function addTeamMember(formData: FormData) {
    await verifyAdmin();

    const name = formData.get('name') as string;
    const title = formData.get('title') as string;
    const bio = formData.get('bio') as string;
    const section = formData.get('section') as string;
    const photoUrl = formData.get('photoUrl') as string;
    const linkedinUrl = formData.get('linkedinUrl') as string;
    const order = parseInt(formData.get('order') as string, 10) || 0;

    if (!name || !title || !section) {
        return { success: false, message: 'Name, title, and section are required.' };
    }

    try {
        await prisma.teamMember.create({
            data: { name, title, bio: bio || null, section, photoUrl: photoUrl || null, linkedinUrl: linkedinUrl || null, order, isActive: true },
        });
        revalidatePath('/admin/team');
        revalidatePath('/team');
    } catch (error) {
        console.error('Failed to add team member:', error);
        return { success: false, message: 'Database error. Could not save team member.' };
    }

    redirect('/admin/team');
}

export async function updateTeamMember(id: string, formData: FormData) {
    await verifyAdmin();

    const name = formData.get('name') as string;
    const title = formData.get('title') as string;
    const bio = formData.get('bio') as string;
    const section = formData.get('section') as string;
    const photoUrl = formData.get('photoUrl') as string;
    const linkedinUrl = formData.get('linkedinUrl') as string;
    const order = parseInt(formData.get('order') as string, 10) || 0;

    if (!name || !title || !section) {
        return { success: false, message: 'Name, title, and section are required.' };
    }

    try {
        await prisma.teamMember.update({
            where: { id },
            data: { name, title, bio: bio || null, section, photoUrl: photoUrl || null, linkedinUrl: linkedinUrl || null, order },
        });
        revalidatePath('/admin/team');
        revalidatePath('/team');
    } catch (error) {
        console.error('Failed to update team member:', error);
        return { success: false, message: 'Database error. Could not update team member.' };
    }

    redirect('/admin/team');
}

export async function deleteTeamMember(id: string) {
    try {
        await verifyAdmin();
        await prisma.teamMember.delete({ where: { id } });
        revalidatePath('/admin/team');
        revalidatePath('/team');
        return { success: true };
    } catch (e: unknown) {
        console.error('Failed to delete team member:', e);
        return { success: false, message: 'Failed to delete team member.' };
    }
}

export async function toggleTeamMemberActive(id: string, currentStatus: boolean) {
    await verifyAdmin();
    await prisma.teamMember.update({
        where: { id },
        data: { isActive: !currentStatus },
    });
    revalidatePath('/admin/team');
    revalidatePath('/team');
}

export async function seedDefaultTeam() {
    await verifyAdmin();
    const count = await prisma.teamMember.count();
    if (count > 0) return { skipped: true, message: 'Team already in database — seed skipped.' };

    for (const m of FALLBACK_TEAM) {
        await prisma.teamMember.create({
            data: {
                name: m.name,
                title: m.title,
                bio: m.bio ?? null,
                section: m.section,
                photoUrl: m.photoUrl ?? null,
                order: m.order,
                isActive: true,
            },
        });
    }
    revalidatePath('/admin/team');
    revalidatePath('/team');
    return { skipped: false, message: `Seeded ${FALLBACK_TEAM.length} team members into the database.` };
}

// ── PUBLICATIONS ─────────────────────────────────────────────────────────────

export async function addPublication(formData: FormData) {
    await verifyAdmin();
    const title    = formData.get('title') as string;
    const authors  = formData.get('authors') as string;
    const journal  = formData.get('journal') as string;
    const year     = parseInt(formData.get('year') as string, 10);
    const abstract = formData.get('abstract') as string;
    const link     = formData.get('link') as string;
    const order    = parseInt(formData.get('order') as string, 10) || 0;

    if (!title || !authors || isNaN(year)) {
        return { success: false, message: 'Title, authors, and year are required.' };
    }
    try {
        await prisma.publication.create({
            data: { title, authors, journal: journal || null, year, abstract: abstract || null, link: link || null, order, isPublished: true },
        });
        revalidatePath('/admin/publications');
        revalidatePath('/');
    } catch (e) {
        console.error(e);
        return { success: false, message: 'Database error.' };
    }
    redirect('/admin/publications');
}

export async function updatePublication(id: string, formData: FormData) {
    await verifyAdmin();
    const title    = formData.get('title') as string;
    const authors  = formData.get('authors') as string;
    const journal  = formData.get('journal') as string;
    const year     = parseInt(formData.get('year') as string, 10);
    const abstract = formData.get('abstract') as string;
    const link     = formData.get('link') as string;
    const order    = parseInt(formData.get('order') as string, 10) || 0;

    if (!title || !authors || isNaN(year)) {
        return { success: false, message: 'Title, authors, and year are required.' };
    }
    try {
        await prisma.publication.update({
            where: { id },
            data: { title, authors, journal: journal || null, year, abstract: abstract || null, link: link || null, order },
        });
        revalidatePath('/admin/publications');
        revalidatePath('/');
    } catch (e) {
        console.error(e);
        return { success: false, message: 'Database error.' };
    }
    redirect('/admin/publications');
}

export async function togglePublicationPublished(id: string, current: boolean) {
    await verifyAdmin();
    await prisma.publication.update({ where: { id }, data: { isPublished: !current } });
    revalidatePath('/admin/publications');
    revalidatePath('/');
}

export async function deletePublication(id: string) {
    await verifyAdmin();
    await prisma.publication.delete({ where: { id } });
    revalidatePath('/admin/publications');
    revalidatePath('/');
}

export async function seedDefaultPublications() {
    await verifyAdmin();
    const count = await prisma.publication.count();
    if (count > 0) return { skipped: true, message: 'Publications already in database — seed skipped.' };
    for (const p of FALLBACK_PUBLICATIONS) {
        await prisma.publication.create({ data: { ...p, isPublished: true } });
    }
    revalidatePath('/admin/publications');
    revalidatePath('/');
    return { skipped: false, message: `Seeded ${FALLBACK_PUBLICATIONS.length} publications.` };
}