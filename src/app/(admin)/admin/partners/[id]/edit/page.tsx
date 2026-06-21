import { prisma } from '@/lib/supabase/prisma';
import { notFound } from 'next/navigation';
import EditPartnerForm from './EditPartnerForm';

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = await prisma.partner.findUnique({ where: { id } });

  if (!partner) notFound();

  return <EditPartnerForm partner={partner} />;
}
