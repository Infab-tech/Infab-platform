'use server';

import { prisma } from '@/lib/supabase/prisma';
import { getAdminEmailNotificationSetting } from '@/app/actions/settings';
import { sendEmail } from '@/lib/email';
import { headers } from 'next/headers';

// In-memory rate limit: max 5 submissions per IP per hour
const _rl = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 60 * 60 * 1000; // 1 hour
  const entry = _rl.get(ip);
  if (!entry || now > entry.resetAt) {
    _rl.set(ip, { count: 1, resetAt: now + window });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

export async function submitInquiry(formData: FormData) {
  try {
    // Rate limit by IP
    const hdrs = await headers();
    const ip = hdrs.get('x-forwarded-for')?.split(',')[0].trim() ?? hdrs.get('x-real-ip') ?? 'unknown';
    if (isRateLimited(ip)) {
      return { success: false, message: 'Too many submissions. Please try again later.' };
    }

    // 1. Extract data from the incoming form
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const organization = formData.get('organization') as string;
    const interest = formData.get('interest') as string;
    const message = formData.get('message') as string;

    // Basic validation
    if (!firstName || !email || !message) {
      return { success: false, message: "Missing required fields." };
    }

    // 2. Save securely to Supabase via Prisma
    await prisma.inquiry.create({
      data: {
        firstName,
        lastName,
        email,
        organization: organization || null,
        interest,
        message,
      },
    });

    // 3. Send email to admin if notifications are enabled
    const emailNotificationsEnabled = await getAdminEmailNotificationSetting();
    if (emailNotificationsEnabled) {
      const esc = (s: string) =>
        s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

      const emailBody = `
        <h3>New Inquiry Received</h3>
        <p><strong>Name:</strong> ${esc(firstName)} ${esc(lastName)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Organization:</strong> ${esc(organization || 'N/A')}</p>
        <p><strong>Interest:</strong> ${esc(interest)}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; margin-left: 0;">${esc(message).replace(/\n/g, '<br>')}</blockquote>
      `;

      await sendEmail({
        to: process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',') : [],
        subject: `New Inquiry from ${firstName} ${lastName} - ${interest}`,
        html: emailBody
      }).catch(console.error); // Catch email errors so it doesn't fail the submission
    }

    return { success: true, message: "Inquiry saved successfully." };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, message: "Failed to submit inquiry to the server." };
  }
}
