'use client';

import { useActionState } from 'react';
import { updateFacility } from '@/app/actions/facilities';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ICONS = [
  'ph-wrench', 'ph-magnifying-glass', 'ph-waves', 'ph-sun', 'ph-drop',
  'ph-flask', 'ph-printer', 'ph-microscope', 'ph-factory', 'ph-cpu',
  'ph-test-tube', 'ph-gear', 'ph-package', 'ph-stack',
];

interface Facility {
  id: string; icon: string; title: string; description: string;
  photoUrl: string | null; isFeatured: boolean; order: number; isActive: boolean;
}

export default function EditFacilityForm({ facility }: { facility: Facility }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => updateFacility(facility.id, formData),
    null
  );

  useEffect(() => {
    if (state && 'success' in state) router.push('/admin/facilities');
  }, [state, router]);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Title *</label>
        <input name="title" required defaultValue={facility.title} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60" />
      </div>
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Description *</label>
        <textarea name="description" required rows={4} defaultValue={facility.description} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60 resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Icon</label>
          <select name="icon" defaultValue={facility.icon} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60">
            {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Order</label>
          <input name="order" type="number" defaultValue={facility.order} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Photo URL</label>
        <input name="photoUrl" defaultValue={facility.photoUrl ?? ''} placeholder="/assests/services/..." className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60" />
      </div>
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
          <input name="isFeatured" type="checkbox" value="true" defaultChecked={facility.isFeatured} className="accent-[var(--accent-primary)]" />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
          <input name="isActive" type="checkbox" value="true" defaultChecked={facility.isActive} className="accent-[var(--accent-primary)]" />
          Active (visible on site)
        </label>
      </div>

      {state && 'error' in state && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm text-red-400">{state.error}</div>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={pending} className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[var(--accent-primary)] text-white text-sm font-semibold disabled:opacity-50 hover:brightness-110 transition-all">
          {pending ? 'Saving…' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.back()} className="px-5 py-2 rounded-lg border border-[var(--border-primary)] text-sm font-semibold hover:bg-[var(--bg-secondary)] transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
