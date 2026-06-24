'use client';

import { useTransition } from 'react';
import { deleteServiceItem } from '@/app/actions/services-admin';

export default function DeleteServiceItemButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => { void deleteServiceItem(id); })}
      disabled={pending}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
    >
      <i className="ph ph-trash"></i>
    </button>
  );
}
