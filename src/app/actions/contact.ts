'use server';

import { prisma } from '@/lib/supabase/prisma';
import { getAdminEmailNotificationSetting } from '@/app/actions/settings';
import { sendEmail } from '@/lib/email';

export async function submitInquiry(formData: FormData) {
  try {
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
      const emailBody = `
        <h3>New Inquiry Received</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization || 'N/A'}</p>
        <p><strong>Interest:</strong> ${interest}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; margin-left: 0;">${message.replace(/\n/g, '<br>')}</blockquote>
      `;

      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'info@infab-tech.com',
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
