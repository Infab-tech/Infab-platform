import { prisma } from '@/lib/supabase/prisma';
import { notFound } from 'next/navigation';
import EditRecognitionForm from './EditRecognitionForm';

export default async function EditRecognitionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recognition = await prisma.recognition.findUnique({ where: { id } });

  if (!recognition) notFound();

  return <EditRecognitionForm recognition={recognition} />;
}
