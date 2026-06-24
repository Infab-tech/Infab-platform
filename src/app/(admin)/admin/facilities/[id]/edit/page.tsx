import { prisma } from '@/lib/supabase/prisma';
import { notFound } from 'next/navigation';
import EditFacilityForm from './EditFacilityForm';

export default async function EditFacilityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const facility = await prisma.facilityItem.findUnique({ where: { id } });
  if (!facility) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Facility</h1>
      <EditFacilityForm facility={facility} />
    </div>
  );
}
