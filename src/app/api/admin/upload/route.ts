import { NextRequest, NextResponse } from 'next/server';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/supabase/prisma';
import { createAdminClient } from '@/lib/supabase/admin';

async function verifyAdmin() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return false;
  const role = await prisma.userRole.findUnique({ where: { email: user.email.toLowerCase() } });
  return role?.role === 'ADMIN';
}

async function ensureBucket(supabase: ReturnType<typeof createAdminClient>, bucket: string) {
  const { error } = await supabase.storage.createBucket(bucket, { public: true });
  // Ignore "already exists" errors (code 23505 or message contains 'already exists')
  if (error && !error.message.includes('already exists') && !error.message.includes('The resource already exists')) {
    throw new Error(`Could not create bucket "${bucket}": ${error.message}`);
  }
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Prevent reading oversized requests into memory
  const contentLength = req.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'Payload too large. Maximum file size is 5MB.' }, { status: 413 });
  }

  let adminClient: ReturnType<typeof createAdminClient>;
  try {
    adminClient = createAdminClient();
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Service role key not configured.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const bucket = (formData.get('bucket') as string) || 'product-images';

  if (!file) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' }, { status: 415 });
  }

  // Ensure bucket exists (creates it if not)
  try {
    await ensureBucket(adminClient, bucket);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Bucket setup failed.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();

  const { error: uploadError } = await adminClient.storage
    .from(bucket)
    .upload(path, arrayBuffer, { contentType: file.type, upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 });
  }

  const { data } = adminClient.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
