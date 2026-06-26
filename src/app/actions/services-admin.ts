'use server';

import { prisma } from '@/lib/supabase/prisma';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { FALLBACK_SERVICE_ITEMS } from '@/lib/content-defaults';

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) redirect('/login');
  const role = await prisma.userRole.findUnique({ where: { email: user.email.toLowerCase() } });
  if (!role || role.role !== 'ADMIN') redirect('/dashboard');
}

export async function seedServiceItems() {
  await requireAdmin();
  const existing = await prisma.serviceItem.count();
  if (existing > 0) return { error: 'Service items already seeded.' };
  await prisma.serviceItem.createMany({ data: FALLBACK_SERVICE_ITEMS });
  revalidatePath('/services');
  revalidatePath('/admin/services');
  return { success: true };
}

export async function resetServiceItems() {
  await requireAdmin();
  await prisma.serviceItem.deleteMany({});
  await prisma.serviceItem.createMany({ data: FALLBACK_SERVICE_ITEMS });
  revalidatePath('/services');
  revalidatePath('/admin/services');
  return { success: true };
}

export async function createServiceItem(formData: FormData) {
  await requireAdmin();
  const category = formData.get('category') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const icon = (formData.get('icon') as string) || 'ph-gear';
  const detail = (formData.get('detail') as string) || null;
  const order = parseInt((formData.get('order') as string) || '0', 10);

  if (!category || !title || !description) return { error: 'Category, title and description are required.' };

  await prisma.serviceItem.create({ data: { category, title, description, icon, detail, order } });
  revalidatePath('/services');
  revalidatePath('/admin/services');
  return { success: true };
}

export async function updateServiceItem(id: string, formData: FormData) {
  await requireAdmin();
  const category = formData.get('category') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const icon = (formData.get('icon') as string) || 'ph-gear';
  const detail = (formData.get('detail') as string) || null;
  const order = parseInt((formData.get('order') as string) || '0', 10);
  const isActive = formData.get('isActive') !== 'false';

  if (!category || !title || !description) return { error: 'Category, title and description are required.' };

  await prisma.serviceItem.update({
    where: { id },
    data: { category, title, description, icon, detail, order, isActive },
  });
  revalidatePath('/services');
  revalidatePath('/admin/services');
  return { success: true };
}

export async function deleteServiceItem(id: string) {
  await requireAdmin();
  await prisma.serviceItem.delete({ where: { id } });
  revalidatePath('/services');
  revalidatePath('/admin/services');
  return { success: true };
}
