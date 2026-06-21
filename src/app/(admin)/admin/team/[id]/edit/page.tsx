import { prisma } from '@/lib/supabase/prisma';
import { notFound } from 'next/navigation';
import EditTeamMemberForm from './EditTeamMemberForm';

export const metadata = { title: 'Edit Team Member | Admin Console' };

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();
  return <EditTeamMemberForm member={member} />;
}
