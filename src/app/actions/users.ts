'use server';

import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/supabase/prisma';
import { revalidatePath } from 'next/cache';

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

export async function deleteCustomerAccount(userId: string, userEmail: string) {
    await verifyAdmin();

    // Ensure they are not trying to delete an admin
    const userRole = await prisma.userRole.findUnique({
        where: { email: userEmail.toLowerCase() }
    });

    if (userRole && userRole.role === 'ADMIN') {
        throw new Error('Cannot delete an Administrator account.');
    }

    try {
        // 1. Delete from auth.users using raw SQL
        await prisma.$executeRawUnsafe(`DELETE FROM auth.users WHERE id = $1`, userId);

        // 2. Delete any UserRole entry (just in case they were listed as CUSTOMER)
        await prisma.userRole.deleteMany({
            where: { email: userEmail.toLowerCase() }
        });

        // Optional: Delete their quotes
        await prisma.quoteRequest.deleteMany({
            where: { userEmail: userEmail.toLowerCase() }
        });

        revalidatePath('/admin/users');
        return { success: true };
    } catch (e: any) {
        console.error('Failed to delete user:', e);
        return { success: false, message: e.message || 'Failed to delete user' };
    }
}
