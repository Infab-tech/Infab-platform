'use server';

import { prisma } from '@/lib/supabase/prisma';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

const ADMIN_EMAIL_KEY = 'adminEmailNotifications';

export async function getAdminEmailNotificationSetting(): Promise<boolean> {
  try {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: ADMIN_EMAIL_KEY }
    });
    // Default to true if not found
    return setting ? setting.value === 'true' : true;
  } catch (error) {
    console.error('Failed to get setting:', error);
    return true; // fail-safe default
  }
}

export async function setAdminEmailNotificationSetting(enabled: boolean) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
      throw new Error('Unauthorized');
    }

    const userRole = await prisma.userRole.findUnique({
      where: { email: user.email.toLowerCase() }
    });

    if (!userRole || userRole.role !== 'ADMIN') {
      throw new Error('Unauthorized: Admin access required');
    }

    await prisma.systemSetting.upsert({
      where: { key: ADMIN_EMAIL_KEY },
      update: { value: enabled ? 'true' : 'false' },
      create: { key: ADMIN_EMAIL_KEY, value: enabled ? 'true' : 'false' }
    });

    revalidatePath('/admin/settings');
    return { success: true, message: 'Settings updated successfully' };
  } catch (error) {
    console.error('Failed to update setting:', error);
    return { success: false, message: 'Failed to update settings' };
  }
}


