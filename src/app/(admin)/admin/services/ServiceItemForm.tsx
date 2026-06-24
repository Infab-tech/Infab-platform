'use client';

import { useActionState } from 'react';
import { createServiceItem } from '@/app/actions/services-admin';

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

export default function ServiceItemForm() {
  const [state, action, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => createServiceItem(formData),
    null
  );

  return (
    <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Category *</label>
        <select name="category" required className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60">
          {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Icon</label>
        <select name="icon" className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60">
          {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Title *</label>
        <input name="title" required className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60" />
      </div>
      <div className="md:col-span-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Description *</label>
        <textarea name="description" required rows={2} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60 resize-none" />
      </div>
      <div className="md:col-span-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Detail / Spec (optional)</label>
        <textarea name="detail" rows={2} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60 resize-none" />
      </div>
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">Order</label>
        <input name="order" type="number" defaultValue={0} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]/60" />
      </div>

      {state && 'error' in state && (
        <div className="md:col-span-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm text-red-400">{state.error}</div>
      )}
      {state && 'success' in state && (
        <div className="md:col-span-2 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-2 text-sm text-green-400">Service item added.</div>
      )}

      <div>
        <button type="submit" disabled={pending} className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[var(--accent-primary)] text-white text-sm font-semibold disabled:opacity-50 hover:brightness-110 transition-all">
          {pending ? 'Saving…' : 'Add Item'}
        </button>
      </div>
    </form>
  );
}
