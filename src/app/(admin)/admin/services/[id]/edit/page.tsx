import { prisma } from '@/lib/supabase/prisma';
import { notFound } from 'next/navigation';
import EditServiceItemForm from './EditServiceItemForm';

export default async function EditServiceItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.serviceItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Service Item</h1>
      <EditServiceItemForm item={item} />
    </div>
  );
}
