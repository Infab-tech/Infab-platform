'use client';

import { useCart } from '@/lib/cart-context';
import { submitMultiItemQuote } from '@/app/actions/quote';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CATEGORY_LABELS: Record<string, string> = {
  AEROSPACE:  'Aerospace & Defence',
  HEALTHCARE: 'Healthcare & Life Sciences',
  MEMS:       'MEMS & Semiconductor',
};

export default function CartPage() {
  const { items, remove, updateQty, clear, count } = useCart();
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!items.length) return;
    setSubmitting(true);
    setError(null);

    const result = await submitMultiItemQuote(
      items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      notes
    );

    if (result.success) {
      clear();
      router.push('/orders?submitted=1');
    } else {
      setError(result.message ?? 'Something went wrong.');
      setSubmitting(false);
    }
  };

  if (count === 0) {
    return (
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">RFQ Cart</h2>
        <p className="text-[var(--text-secondary)] mb-10">Your cart is empty.</p>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-12 text-center flex flex-col items-center gap-4">
          <i className="ph ph-shopping-cart text-5xl text-[var(--text-secondary)]/30"></i>
          <p className="text-[var(--text-primary)] font-semibold">No products added yet</p>
          <p className="text-sm text-[var(--text-secondary)]">Browse our catalog and add products you&apos;d like to request a quote for.</p>
          <Link
            href="/catalog"
            className="mt-2 px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-1 text-[var(--text-primary)]">RFQ Cart</h2>
          <p className="text-[var(--text-secondary)]">{count} product{count !== 1 ? 's' : ''} ready for quotation.</p>
        </div>
        <Link href="/catalog" className="text-sm text-[var(--accent-primary)] hover:underline font-medium">
          + Add More Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Item list */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-4 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl p-4 items-start">
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-lg bg-[#080d18] border border-[var(--border-primary)] flex-shrink-0 flex items-center justify-center overflow-hidden">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="object-contain max-h-14" />
                ) : (
                  <i className="ph ph-microchip text-2xl text-[var(--text-secondary)]/20"></i>
                )}
              </div>

              {/* Details */}
              <div className="flex-grow min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent-primary)] mb-0.5">
                  {CATEGORY_LABELS[item.category] ?? item.category}
                </p>
                <p className="text-sm font-bold text-[var(--text-primary)] leading-snug mb-3">{item.name}</p>

                {/* Quantity control */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--text-secondary)] font-mono uppercase tracking-wider">Qty:</span>
                  <div className="flex items-center rounded-lg border border-[var(--border-primary)] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateQty(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/5 transition-colors disabled:opacity-30"
                    >
                      <i className="ph ph-minus text-xs"></i>
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => updateQty(item.productId, parseInt(e.target.value) || 1)}
                      className="w-12 h-8 text-center text-sm font-bold text-[var(--text-primary)] bg-transparent border-x border-[var(--border-primary)] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => updateQty(item.productId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/5 transition-colors"
                    >
                      <i className="ph ph-plus text-xs"></i>
                    </button>
                  </div>
                  <span className="text-xs text-[var(--text-secondary)]">units</span>
                </div>
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => remove(item.productId)}
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-red-500/10 hover:text-red-400 transition-colors"
                title="Remove"
              >
                <i className="ph ph-trash text-sm"></i>
              </button>
            </div>
          ))}
        </div>

        {/* Summary + Submit */}
        <div className="flex flex-col gap-4">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl p-6 flex flex-col gap-5">
            <h3 className="font-bold text-[var(--text-primary)]">Request Summary</h3>

            {/* Items summary */}
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between items-start gap-2 text-xs">
                  <span className="text-[var(--text-secondary)] leading-snug line-clamp-2 flex-1">{item.name}</span>
                  <span className="font-mono font-bold text-[var(--text-primary)] whitespace-nowrap">×{item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-[var(--border-primary)]"></div>

            {/* Notes */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">
                Notes / Requirements
              </label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Custom specs, delivery timeline, temperature range requirements…"
                className="bg-[var(--text-primary)]/[0.03] border border-[var(--border-primary)] rounded-lg px-3 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] resize-none transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full h-12 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <><i className="ph ph-spinner-gap animate-spin"></i> Submitting…</>
              ) : (
                <><i className="ph ph-paper-plane-tilt"></i> Submit RFQ</>
              )}
            </button>

            <p className="text-[10px] text-[var(--text-secondary)] text-center leading-relaxed">
              An INFAB engineer will review your request and respond within 24–48 hours.
            </p>
          </div>

          <button
            type="button"
            onClick={clear}
            className="text-xs text-[var(--text-secondary)] hover:text-red-400 transition-colors text-center"
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}
