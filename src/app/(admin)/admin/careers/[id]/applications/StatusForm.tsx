'use client';

import { updateApplicationStatus } from '@/app/actions/admin';

const STATUS_STYLES: Record<string, string> = {
  NEW: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  REVIEWED: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  SHORTLISTED: 'bg-green-500/10 text-green-400 border border-green-500/20',
  REJECTED: 'bg-red-500/10 text-red-400 border border-red-500/20',
};

const ALL_STATUSES = ['NEW', 'REVIEWED', 'SHORTLISTED', 'REJECTED'];

export default function StatusForm({ appId, currentStatus }: { appId: string; currentStatus: string }) {
  return (
    <form action={async (fd: FormData) => {
      const newStatus = fd.get('status') as string;
      await updateApplicationStatus(appId, newStatus);
    }}>
      <select
        name="status"
        defaultValue={currentStatus}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className={`text-xs font-bold rounded px-2 py-1 border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)] ${STATUS_STYLES[currentStatus] || ''}`}
      >
        {ALL_STATUSES.map((s) => (
          <option key={s} value={s} className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
            {s}
          </option>
        ))}
      </select>
    </form>
  );
}
