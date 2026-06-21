'use client';

import { useCart } from '@/lib/cart-context';

export default function CartBadge() {
  const { count } = useCart();
  if (count === 0) return null;

  return (
    <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-[var(--accent-primary)] text-[var(--bg-primary)] text-[10px] font-bold px-1">
      {count > 99 ? '99+' : count}
    </span>
  );
}
