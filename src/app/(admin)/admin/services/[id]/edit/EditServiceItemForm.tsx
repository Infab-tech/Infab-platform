'use client';

import { useActionState } from 'react';
import { updateServiceItem } from '@/app/actions/services-admin';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CATEGORIES = [
  { value: 'mems-capability', label: 'MEMS Capabilities' },
  { value: 'mems-process', label: 'MEMS Core Processes' },
  { value: 'micro-design', label: 'Microfluidics Design' },
  { value: 'micro-fab', label: 'Microfluidics Fabrication' },
  { value: 'micro-device', label: 'Microfluidic Devices' },
];

const ICONS = [
  'ph-gear', 'ph-pencil-ruler', 'ph-cpu', 'ph-stack', 'ph-package',
  'ph-flask', 'ph-factory', 'ph-waves', 'ph-drop', 'ph-sun',
  'ph-chart-line-up', 'ph-test-tube', 'ph-timer', 'ph-squares-four',
  'ph-link', 'ph-circles-three', 'ph-cell-signal-full', 'ph-dna',
];

interface ServiceItem {
  id: string; category: string; icon: string; title: string;
  description: string; detail: string | null; order: number; isActive: boolean;
}

export default function EditServiceItemForm({ item }: { item: ServiceItem }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => updateServiceItem(item.id, formData),
    null
  );

  useEffect(() => {
    if (state && 'success' in state) router.push('/admin/services');
  }, [state, router]);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Category *</label>
          <select name="category" required defaultValue={item.category} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60">
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Icon</label>
          <select name="icon" defaultValue={item.icon} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60">
            {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Title *</label>
        <input name="title" required defaultValue={item.title} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60" />
      </div>
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Description *</label>
        <textarea name="description" required rows={3} defaultValue={item.description} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60 resize-none" />
      </div>
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Detail / Spec</label>
        <textarea name="detail" rows={2} defaultValue={item.detail ?? ''} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60 resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Order</label>
          <input name="order" type="number" defaultValue={item.order} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60" />
        </div>
        <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer pb-2">
          <input name="isActive" type="checkbox" value="true" defaultChecked={item.isActive} className="accent-[var(--accent-primary)]" />
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
