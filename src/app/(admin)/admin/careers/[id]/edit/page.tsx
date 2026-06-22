import { prisma } from '@/lib/supabase/prisma';
import { notFound } from 'next/navigation';
import EditJobOpeningForm from './EditJobOpeningForm';

export default async function EditJobOpeningPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await prisma.jobOpening.findUnique({ where: { id } });

  if (!job) notFound();

  return <EditJobOpeningForm job={job} />;
}
