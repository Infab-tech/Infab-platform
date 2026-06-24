'use server';

import { prisma } from '@/lib/supabase/prisma';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { FALLBACK_FACILITIES } from '@/lib/content-defaults';

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) redirect('/login');
  const role = await prisma.userRole.findUnique({ where: { email: user.email.toLowerCase() } });
  if (!role || role.role !== 'ADMIN') redirect('/dashboard');
}

export async function seedFacilities() {
  await requireAdmin();
  const existing = await prisma.facilityItem.count();
  if (existing > 0) return { error: 'Facilities already seeded.' };
  await prisma.facilityItem.createMany({ data: FALLBACK_FACILITIES });
  revalidatePath('/services');
  revalidatePath('/admin/facilities');
  return { success: true };
}

export async function createFacility(formData: FormData) {
  await requireAdmin();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const icon = (formData.get('icon') as string) || 'ph-wrench';
  const photoUrl = (formData.get('photoUrl') as string) || null;
  const isFeatured = formData.get('isFeatured') === 'true';
  const order = parseInt((formData.get('order') as string) || '0', 10);

  if (!title || !description) return { error: 'Title and description are required.' };

  await prisma.facilityItem.create({
    data: { title, description, icon, photoUrl, isFeatured, order },
  });
  revalidatePath('/services');
  revalidatePath('/admin/facilities');
  return { success: true };
}

export async function updateFacility(id: string, formData: FormData) {
  await requireAdmin();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const icon = (formData.get('icon') as string) || 'ph-wrench';
  const photoUrl = (formData.get('photoUrl') as string) || null;
  const isFeatured = formData.get('isFeatured') === 'true';
  const order = parseInt((formData.get('order') as string) || '0', 10);
  const isActive = formData.get('isActive') !== 'false';

  if (!title || !description) return { error: 'Title and description are required.' };

  await prisma.facilityItem.update({
    where: { id },
    data: { title, description, icon, photoUrl, isFeatured, order, isActive },
  });
  revalidatePath('/services');
  revalidatePath('/admin/facilities');
  return { success: true };
}

export async function deleteFacility(id: string) {
  await requireAdmin();
  await prisma.facilityItem.delete({ where: { id } });
  revalidatePath('/services');
  revalidatePath('/admin/facilities');
  return { success: true };
}
