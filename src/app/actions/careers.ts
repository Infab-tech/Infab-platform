'use server';

import { prisma } from '@/lib/supabase/prisma';
import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export async function submitJobApplication(
  formData: FormData,
): Promise<{ success: false; message: string } | void> {
  const jobId = formData.get('jobId') as string;
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const phone = (formData.get('phone') as string)?.trim() || null;
  const coverLetter = (formData.get('coverLetter') as string)?.trim() || null;
  const resumeFile = formData.get('resume') as File | null;

  if (!jobId || !name || !email) {
    return { success: false, message: 'Name and email are required.' };
  }
  if (!resumeFile || resumeFile.size === 0) {
    return { success: false, message: 'Please attach your resume (PDF).' };
  }
  if (resumeFile.size > 5 * 1024 * 1024) {
    return { success: false, message: 'Resume must be under 5 MB.' };
  }

  const job = await prisma.jobOpening.findUnique({ where: { id: jobId } });
  if (!job || !job.isActive) {
    return { success: false, message: 'This position is no longer accepting applications.' };
  }

  // Upload resume to Supabase Storage
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const ext = resumeFile.name.split('.').pop() ?? 'pdf';
  const safeName = name.replace(/[^a-zA-Z0-9]/g, '_');
  const path = `${jobId}/${Date.now()}_${safeName}.${ext}`;

  const buffer = Buffer.from(await resumeFile.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from('resumes')
    .upload(path, buffer, { contentType: resumeFile.type, upsert: false });

  if (uploadError) {
    return { success: false, message: `Resume upload failed: ${uploadError.message}` };
  }

  const { data: urlData } = supabase.storage.from('resumes').getPublicUrl(path);

  await prisma.jobApplication.create({
    data: { jobId, name, email, phone, coverLetter, resumeUrl: urlData.publicUrl },
  });

  redirect(`/careers/apply/success?role=${encodeURIComponent(job.title)}`);
}
