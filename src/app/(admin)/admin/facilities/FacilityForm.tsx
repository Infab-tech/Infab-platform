'use client';

import { useActionState } from 'react';
import { createFacility } from '@/app/actions/facilities';
import SingleImageUploader from '@/components/ui/SingleImageUploader';

const ICONS = [
  'ph-wrench', 'ph-magnifying-glass', 'ph-waves', 'ph-sun', 'ph-drop',
  'ph-flask', 'ph-printer', 'ph-microscope', 'ph-factory', 'ph-cpu',
  'ph-test-tube', 'ph-gear', 'ph-package', 'ph-stack',
];

export default function FacilityForm() {
  const [state, action, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => createFacility(formData),
    null
  );

  return (
    <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Title *</label>
        <input name="title" required className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60" />
      </div>
      <div className="md:col-span-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Description *</label>
        <textarea name="description" required rows={3} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60 resize-none" />
      </div>
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Icon (Phosphor class)</label>
        <select name="icon" className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60">
          {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Photo (optional)</label>
        <SingleImageUploader name="photoUrl" bucket="facility-photos" />
      </div>
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Display Order</label>
        <input name="order" type="number" defaultValue={0} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60" />
      </div>
      <div className="flex items-center gap-4 pt-5">
        <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
          <input name="isFeatured" type="checkbox" value="true" className="accent-[var(--accent-primary)]" />
          Featured / Highlighted
        </label>
      </div>

      {state && 'error' in state && (
        <div className="md:col-span-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm text-red-400">{state.error}</div>
      )}
      {state && 'success' in state && (
        <div className="md:col-span-2 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-2 text-sm text-green-400">Facility added successfully.</div>
      )}

      <div className="md:col-span-2">
        <button type="submit" disabled={pending} className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[var(--accent-primary)] text-white text-sm font-semibold disabled:opacity-50 hover:brightness-110 transition-all">
          {pending ? 'Saving…' : 'Add Facility'}
        </button>
      </div>
    </form>
  );
}
