'use client';

import { useState } from 'react';
import { updatePublication } from '@/app/actions/admin';
import Link from 'next/link';
import type { Publication } from '@prisma/client';

export default function EditPublicationForm({ pub }: { pub: Publication }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const result = await updatePublication(pub.id, new FormData(e.currentTarget));
    if (result && !result.success) {
      setError(result.message ?? 'Something went wrong.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10 flex items-center gap-4">
        <Link href="/admin/publications" className="w-10 h-10 rounded-full bg-[var(--text-primary)]/5 flex items-center justify-center hover:bg-[var(--text-primary)]/10 transition-colors text-[var(--text-primary)]">
          <i className="ph ph-arrow-left"></i>
        </Link>
        <div>
          <h1 className="text-3xl font-bold mb-1 text-[var(--text-primary)]">Edit Publication</h1>
          <p className="text-[var(--text-secondary)] line-clamp-1">{pub.title}</p>
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Paper Title *</label>
            <input type="text" id="title" name="title" required defaultValue={pub.title}
              className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="authors" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Authors *</label>
            <input type="text" id="authors" name="authors" required defaultValue={pub.authors}
              className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
            <p className="text-xs text-[var(--text-secondary)]">Separate multiple authors with commas.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="journal" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Journal / Conference <span className="normal-case font-normal">(optional)</span></label>
              <input type="text" id="journal" name="journal" defaultValue={pub.journal ?? ''}
                className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="year" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Year *</label>
              <input type="number" id="year" name="year" required min={1990} max={2100} defaultValue={pub.year}
                className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="abstract" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Abstract / Summary <span className="normal-case font-normal">(optional)</span></label>
            <textarea id="abstract" name="abstract" rows={5} defaultValue={pub.abstract ?? ''}
              className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="link" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Paper URL <span className="normal-case font-normal">(optional)</span></label>
              <input type="url" id="link" name="link" defaultValue={pub.link ?? ''} placeholder="https://doi.org/…"
                className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="order" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Display Order</label>
              <input type="number" id="order" name="order" defaultValue={pub.order} min={0}
                className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
            </div>
          </div>

          {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium">{error}</div>}

          <div className="pt-6 border-t border-[var(--text-primary)]/10 flex justify-end gap-4">
            <Link href="/admin/publications" className="px-6 py-3 rounded-lg border border-[var(--text-primary)]/20 text-[var(--text-primary)] font-semibold text-sm hover:bg-[var(--text-primary)]/10 transition-colors">
              Cancel
            </Link>
            <button type="submit" disabled={isSubmitting}
              className="px-8 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
              {isSubmitting ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
