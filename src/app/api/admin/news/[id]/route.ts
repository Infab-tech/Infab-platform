import { NextResponse } from 'next/server';
import { prisma } from '@/lib/supabase/prisma';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userRole = await prisma.userRole.findUnique({ where: { email: user.email.toLowerCase() } });
  if (!userRole || userRole.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const article = await prisma.newsArticle.findUnique({ where: { id } });
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(article);
}
