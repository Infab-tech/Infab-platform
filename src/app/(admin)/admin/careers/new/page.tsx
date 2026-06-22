'use client';

import { useState } from 'react';
import { addJobOpening } from '@/app/actions/admin';
import Link from 'next/link';

export default function NewJobOpeningPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    await addJobOpening(formData);
    // redirects on success
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto pt-8 sm:pt-4">
      <div className="mb-6">
        <Link href="/admin/careers" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-2 inline-flex items-center gap-1">
          <i className="ph ph-arrow-left"></i> Back to Careers
        </Link>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mt-2">Add Job Opening</h1>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Job Title *</label>
            <input name="title" type="text" required placeholder="e.g. Cleanroom Engineer" className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col gap-2 flex-1">
                <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Department *</label>
                <input name="department" type="text" required placeholder="e.g. Engineering" className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
            </div>
            
            <div className="flex flex-col gap-2 flex-1">
                <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Job Type *</label>
                <select name="type" required className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors">
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="INTERNSHIP">Internship</option>
                </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Location</label>
            <input name="location" type="text" defaultValue="Bangalore, India" className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Description *</label>
            <textarea name="description" required rows={4} className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-y" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Requirements (one per line)</label>
            <textarea name="requirements" rows={5} placeholder="B.Tech/M.Tech in Engineering&#10;Experience in MEMS&#10;Good communication skills" className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-y" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Application Link (Optional)</label>
            <input name="applyLink" type="url" placeholder="https://forms.gle/..." className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Deadline (Optional)</label>
            <input name="deadline" type="date" className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
          </div>

          <button type="submit" disabled={isSubmitting} className="mt-4 bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
            {isSubmitting ? 'Saving...' : 'Save Job Opening'}
          </button>
        </form>
      </div>
    </div>
  );
}
