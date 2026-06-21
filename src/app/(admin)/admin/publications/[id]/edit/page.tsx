import { prisma } from '@/lib/supabase/prisma';
import { notFound } from 'next/navigation';
import EditPublicationForm from './EditPublicationForm';

export default async function EditPublicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pub = await prisma.publication.findUnique({ where: { id } });
  if (!pub) notFound();
  return <EditPublicationForm pub={pub} />;
}
