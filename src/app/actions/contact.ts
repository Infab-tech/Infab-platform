'use server';

import { prisma } from '@/lib/supabase/prisma';

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

    return { success: true, message: "Inquiry saved successfully." };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, message: "Failed to submit inquiry to the server." };
  }
}
