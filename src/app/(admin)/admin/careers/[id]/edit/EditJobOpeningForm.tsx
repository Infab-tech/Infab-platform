'use client';

import { useState } from 'react';
import { updateJobOpening } from '@/app/actions/admin';
import Link from 'next/link';
import { JobType } from '@prisma/client';

type JobOpening = {
  id: string;
  title: string;
  department: string;
  type: JobType;
  location: string;
  description: string;
  requirements: string[];
  applyLink: string | null;
  deadline: Date | null;
};

export default function EditJobOpeningForm({ job }: { job: JobOpening }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    await updateJobOpening(job.id, formData);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto pt-8 sm:pt-4">
      <div className="mb-6">
        <Link href="/admin/careers" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-2 inline-flex items-center gap-1">
          <i className="ph ph-arrow-left"></i> Back to Careers
        </Link>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mt-2">Edit Job Opening</h1>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Job Title *</label>
            <input name="title" type="text" required defaultValue={job.title} className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col gap-2 flex-1">
                <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Department *</label>
                <input name="department" type="text" required defaultValue={job.department} className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
            </div>
            
            <div className="flex flex-col gap-2 flex-1">
                <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Job Type *</label>
                <select name="type" required defaultValue={job.type} className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors">
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="INTERNSHIP">Internship</option>
                </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Location</label>
            <input name="location" type="text" defaultValue={job.location} className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Description *</label>
            <textarea name="description" required rows={4} defaultValue={job.description} className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-y" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Requirements (one per line)</label>
            <textarea name="requirements" rows={5} defaultValue={job.requirements.join('\n')} className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-y" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Application Link (Optional)</label>
            <input name="applyLink" type="url" defaultValue={job.applyLink || ''} className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Deadline (Optional)</label>
            <input name="deadline" type="date" defaultValue={job.deadline ? job.deadline.toISOString().split('T')[0] : ''} className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
          </div>

          <button type="submit" disabled={isSubmitting} className="mt-4 bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
