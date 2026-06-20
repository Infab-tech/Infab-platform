'use server';

import { prisma } from '@/lib/supabase/prisma';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createClient as createVanillaClient } from '@supabase/supabase-js';

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

export async function addAdminRole(formData: FormData) {
    try {
        await verifyAdmin();
        
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password || password.length < 6) {
            return { success: false, message: 'Valid email and password (min 6 chars) are required.' };
        }

        const lowerEmail = email.toLowerCase().trim();
        
        // 1. Create Supabase Auth User WITHOUT affecting the current admin's cookies
        const vanillaSupabase = createVanillaClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data: authData, error: authError } = await vanillaSupabase.auth.signUp({
            email: lowerEmail,
            password: password,
            options: {
                data: {
                    first_name: 'Admin',
                    last_name: 'Staff',
                }
            }
        });

        if (authError) {
            return { success: false, message: authError.message };
        }
        
        // 2. Add them to Prisma UserRole
        await prisma.userRole.upsert({
            where: { email: lowerEmail },
            update: { role: 'ADMIN' },
            create: { email: lowerEmail, role: 'ADMIN' }
        });
        
        revalidatePath('/admin/staff');
        return { success: true, message: `Admin account created for ${lowerEmail}!` };
    } catch (error: any) {
        return { success: false, message: error.message || 'An error occurred' };
    }
}

export async function removeAdminRole(email: string) {
    await verifyAdmin();
    
    const lowerEmail = email.toLowerCase().trim();
    
    // Prevent removing yourself
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user?.email?.toLowerCase() === lowerEmail) {
        throw new Error('You cannot remove your own admin privileges.');
    }
    
    await prisma.userRole.update({
        where: { email: lowerEmail },
        data: { role: 'CUSTOMER' }
    });
    
    revalidatePath('/admin/staff');
}
