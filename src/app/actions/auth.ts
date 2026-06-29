'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/supabase/prisma';
import { headers } from 'next/headers';
import crypto from 'crypto';

// In-memory rate limiter (resets on serverless cold start — acceptable for low-traffic auth)
const _rl = new Map<string, { count: number; resetAt: number }>();
function rateLimited(ip: string, max: number, windowMs: number): boolean {
  const key = `${ip}:${windowMs}`;
  const now = Date.now();
  const e = _rl.get(key);
  if (!e || now > e.resetAt) { _rl.set(key, { count: 1, resetAt: now + windowMs }); return false; }
  if (e.count >= max) return true;
  e.count++;
  return false;
}
async function getIp(): Promise<string> {
  const hdrs = await headers();
  return hdrs.get('x-forwarded-for')?.split(',')[0].trim() ?? hdrs.get('x-real-ip') ?? 'unknown';
}

function generateCustomerId() {
    return 'INFAB-' + crypto.randomBytes(3).toString('hex').toUpperCase();
}

export async function loginUser(formData: FormData) {
    const ip = await getIp();
    if (rateLimited(ip, 10, 15 * 60 * 1000)) {
        return { success: false, message: 'Too many login attempts. Please try again in 15 minutes.' };
    }

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = await createClient();

    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { success: false, message: error.message };
    }

    // Backfill customer_id if missing
    if (data.user && !data.user.user_metadata?.customer_id) {
        const adminAuth = (await import('@/lib/supabase/admin')).createAdminClient().auth.admin;
        await adminAuth.updateUserById(data.user.id, {
            user_metadata: { ...data.user.user_metadata, customer_id: generateCustomerId() }
        });
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
    const ip = await getIp();
    if (rateLimited(ip, 5, 60 * 60 * 1000)) {
        return { success: false, message: 'Too many registration attempts. Please try again later.' };
    }

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
                customer_id: generateCustomerId(),
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

import { createAdminClient } from '@/lib/supabase/admin';
import { sendEmail } from '@/lib/email';

export async function updatePassword(formData: FormData) {
    const password = formData.get('password') as string;
    
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
        return { success: false, message: error.message };
    }

    return { success: true, message: 'Password updated successfully.' };
}

export async function sendPasswordResetOtp(formData: FormData) {
    const ip = await getIp();
    if (rateLimited(ip, 3, 15 * 60 * 1000)) {
        return { success: false, message: 'Too many reset attempts. Please try again in 15 minutes.' };
    }

    const email = formData.get('email') as string;

    // Generate a secure 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save token to DB, expires in 15 minutes
    await prisma.passwordResetToken.create({
        data: {
            email,
            token: otp,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000)
        }
    });

    // Send email via Resend
    const html = `
      <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
        <h2>Password Reset Code</h2>
        <p>You requested to reset your password. Here is your 6-digit verification code:</p>
        <h1 style="letter-spacing: 5px; color: #0070f3;">${otp}</h1>
        <p>This code will expire in 15 minutes. If you didn't request this, you can safely ignore this email.</p>
      </div>
    `;

    const { success, error } = await sendEmail({ 
        to: email, 
        subject: 'Your Password Reset Code', 
        html 
    });

    if (!success) {
        return { success: false, message: `Failed to send email: ${error}` };
    }

    return { success: true, message: 'OTP sent! Please check your email.' };
}

export async function verifyOtpAndResetPassword(formData: FormData) {
    const email = formData.get('email') as string;
    const token = formData.get('token') as string;
    const newPassword = formData.get('password') as string;

    // Verify OTP in Database
    const record = await prisma.passwordResetToken.findFirst({
        where: { email, token },
        orderBy: { createdAt: 'desc' }
    });

    if (!record) {
        return { success: false, message: 'Invalid OTP code.' };
    }

    if (record.expiresAt < new Date()) {
        return { success: false, message: 'This OTP has expired. Please request a new one.' };
    }

    // OTP is valid. Use Admin API to force-update password.
    const adminAuth = createAdminClient().auth.admin;
    
    // We have to list users to find the user ID by email since Supabase doesn't have getUserByEmail
    const { data: { users }, error: listError } = await adminAuth.listUsers();
    
    if (listError) {
        return { success: false, message: 'Failed to access user directory.' };
    }

    const user = users.find(u => u.email === email);
    if (!user) {
        return { success: false, message: 'No account found with this email.' };
    }

    // Update password
    const { error: updateError } = await adminAuth.updateUserById(user.id, {
        password: newPassword
    });

    if (updateError) {
        return { success: false, message: updateError.message };
    }

    // Cleanup token
    await prisma.passwordResetToken.deleteMany({
        where: { email }
    });

    return { success: true, message: 'Password has been reset successfully! You can now log in.' };
}