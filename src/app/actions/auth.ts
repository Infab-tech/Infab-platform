'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/supabase/prisma';

export async function loginUser(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = await createClient();

    let { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { success: false, message: error.message };
    }

    // Role-Based Routing
    const userRole = await prisma.userRole.findUnique({
        where: { email: email.toLowerCase() }
    });

    if (userRole && userRole.role === 'ADMIN') {
        redirect('/admin');
    }

    // If successful, redirect them to the secure dashboard
    redirect('/dashboard');
}

// Add this at the bottom of src/app/actions/auth.ts
export async function logoutUser() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/login');
}

export async function registerUser(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const organization = formData.get('organization') as string;

    if (password !== confirmPassword) {
        return { success: false, message: "Passwords do not match." };
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
                organization: organization,
            }
        }
    });

    if (error) {
        return { success: false, message: error.message };
    }

    // Since the user requested "Option B" (Email verification off),
    // Supabase will immediately log them in if email verification is turned off in settings.
    // However, if it's still ON in their Supabase dashboard, we need to tell them.
    if (!data.session) {
        return { 
            success: false, 
            message: "Account created! Please check your email to confirm your account before logging in." 
        };
    }

    redirect('/dashboard');
}