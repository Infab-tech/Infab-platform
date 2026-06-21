'use client';

import { useState } from 'react';
import { addTeamMember } from '@/app/actions/admin';
import Link from 'next/link';

const SECTIONS = [
  { value: 'FOUNDER', label: 'Founder' },
  { value: 'RESEARCH', label: 'Research & Science' },
  { value: 'ENGINEERING', label: 'Engineering' },
  { value: 'CONSULTANTS', label: 'Consultants' },
  { value: 'BUSINESS', label: 'Business & Administration' },
];

export default function NewTeamMemberPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const result = await addTeamMember(new FormData(e.currentTarget));
    if (result && !result.success) {
      setError(result.message ?? 'Something went wrong.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10 flex items-center gap-4">
        <Link href="/admin/team" className="w-10 h-10 rounded-full bg-[var(--text-primary)]/5 flex items-center justify-center hover:bg-[var(--text-primary)]/10 transition-colors text-[var(--text-primary)]">
          <i className="ph ph-arrow-left"></i>
        </Link>
        <div>
          <h1 className="text-3xl font-bold mb-1 text-[var(--text-primary)]">Add Team Member</h1>
          <p className="text-[var(--text-secondary)]">Add a new person to the public Team page.</p>
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Full Name *</label>
              <input
                type="text" id="name" name="name" required
                placeholder="e.g., Dr. Jane Smith"
                className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Job Title *</label>
              <input
                type="text" id="title" name="title" required
                placeholder="e.g., Principal Scientist"
                className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="section" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Section *</label>
              <select
                id="section" name="section" required defaultValue=""
                className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors appearance-none"
              >
                <option value="" disabled className="text-black">Select a section</option>
                {SECTIONS.map(s => (
                  <option key={s.value} value={s.value} className="text-black">{s.label}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="order" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Display Order</label>
              <input
                type="number" id="order" name="order" defaultValue={0} min={0}
                className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
              />
              <p className="text-xs text-[var(--text-secondary)]">Lower numbers appear first within the section.</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="photoUrl" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Photo URL <span className="normal-case font-normal">(optional)</span></label>
            <input
              type="text" id="photoUrl" name="photoUrl"
              placeholder="e.g., /assests/team/jane-smith.jpg"
              className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
            />
            <p className="text-xs text-[var(--text-secondary)]">Path relative to <code className="font-mono text-[var(--accent-primary)]">/public</code> (e.g. <code className="font-mono">/assests/team/name.jpg</code>). Leave blank to show initials placeholder.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="bio" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Bio <span className="normal-case font-normal">(optional)</span></label>
            <textarea
              id="bio" name="bio" rows={4}
              placeholder="Short professional biography shown on the team card…"
              className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
            ></textarea>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium">{error}</div>
          )}

          <div className="pt-6 border-t border-[var(--text-primary)]/10 flex justify-end gap-4">
            <Link href="/admin/team" className="px-6 py-3 rounded-lg border border-[var(--text-primary)]/20 text-[var(--text-primary)] font-semibold text-sm hover:bg-[var(--text-primary)]/10 transition-colors">
              Cancel
            </Link>
            <button
              type="submit" disabled={isSubmitting}
              className="px-8 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? 'Saving…' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
