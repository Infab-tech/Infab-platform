'use client';

import { useTransition } from 'react';
import { deleteFacility } from '@/app/actions/facilities';

export default function DeleteFacilityButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => { void deleteFacility(id); })}
      disabled={pending}
      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
    >
      <i className="ph ph-trash"></i> {pending ? '…' : 'Delete'}
    </button>
  );
}
