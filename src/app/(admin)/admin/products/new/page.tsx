'use client';

import { useState } from 'react';
import { addNewProduct } from '@/app/actions/admin';
import ImageUploader from '@/components/ui/ImageUploader';
import Link from 'next/link';

export default function NewProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    fd.set('imageUrls', JSON.stringify(imageUrls));
    const result = await addNewProduct(fd);
    if (result && !result.success) {
      setError(result.message ?? 'Something went wrong.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10 flex items-center gap-4">
        <Link
          href="/admin/products"
          className="w-10 h-10 rounded-full bg-[var(--text-primary)]/5 flex items-center justify-center hover:bg-[var(--text-primary)]/10 transition-colors text-[var(--text-primary)]"
        >
          <i className="ph ph-arrow-left"></i>
        </Link>
        <div>
          <h1 className="text-3xl font-bold mb-1 text-[var(--text-primary)]">Add New Product</h1>
          <p className="text-[var(--text-secondary)]">Publish a new MEMS sensor or microfluidic device to the catalog.</p>
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Product Name *</label>
            <input
              type="text" id="name" name="name" required
              placeholder="e.g., MP-100 High Temp Pressure Sensor"
              className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--text-primary)]/[0.05] transition-colors"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Market Vertical *</label>
            <select
              id="category" name="category" required defaultValue=""
              className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--text-primary)]/[0.05] transition-colors appearance-none"
            >
              <option value="" disabled className="text-black">Select a category</option>
              <option value="AEROSPACE" className="text-black">Aerospace &amp; Defence</option>
              <option value="HEALTHCARE" className="text-black">Healthcare &amp; Life Sciences</option>
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Technical Description *</label>
            <textarea
              id="description" name="description" rows={5} required
              placeholder="Detailed description of the product's capabilities and use-cases…"
              className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--text-primary)]/[0.05] transition-colors resize-none"
            ></textarea>
          </div>

          {/* Specs */}
          <div className="flex flex-col gap-2">
            <label htmlFor="specs" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">
              Spec Tags <span className="normal-case font-normal">(optional)</span>
            </label>
            <input
              type="text" id="specs" name="specs"
              placeholder="0–700 bar, Capacitive, SOI, AEC-Q100"
              className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--text-primary)]/[0.05] transition-colors"
            />
            <p className="text-xs text-[var(--text-secondary)]">Comma-separated. Each value becomes a pill badge on the product card.</p>
          </div>

          {/* Document Links */}
          <div className="flex flex-col gap-4 p-5 rounded-xl border border-[var(--text-primary)]/10 bg-[var(--text-primary)]/[0.02]">
            <h3 className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)] mb-2 border-b border-[var(--text-primary)]/10 pb-2">Downloadable Files</h3>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="datasheetUrl" className="font-mono text-[10px] font-semibold uppercase text-[var(--text-secondary)]">Datasheet URL</label>
              <input type="url" id="datasheetUrl" name="datasheetUrl" placeholder="https://..." className="bg-[var(--bg-primary)] border border-[var(--text-primary)]/10 rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="drawingUrl" className="font-mono text-[10px] font-semibold uppercase text-[var(--text-secondary)]">2D Drawing URL</label>
              <input type="url" id="drawingUrl" name="drawingUrl" placeholder="https://..." className="bg-[var(--bg-primary)] border border-[var(--text-primary)]/10 rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cadFileUrls" className="font-mono text-[10px] font-semibold uppercase text-[var(--text-secondary)]">3D CAD Files URLs (JSON Array)</label>
              <input type="text" id="cadFileUrls" name="cadFileUrls" placeholder='["https://..."]' className="bg-[var(--bg-primary)] border border-[var(--text-primary)]/10 rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
            </div>
          </div>

          {/* Images */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">
              Product Images <span className="normal-case font-normal">(optional)</span>
            </p>
            <p className="text-xs text-[var(--text-secondary)] -mt-1">
              Requires the <code className="font-mono text-[var(--accent-primary)]">product-images</code> Supabase Storage bucket to be created and set to public.
            </p>
            <ImageUploader onChange={setImageUrls} />
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium">{error}</div>
          )}

          <div className="pt-6 border-t border-[var(--text-primary)]/10 flex justify-end gap-4">
            <Link
              href="/admin/products"
              className="px-6 py-3 rounded-lg border border-[var(--text-primary)]/20 text-[var(--text-primary)] font-semibold text-sm hover:bg-[var(--text-primary)]/10 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit" disabled={isSubmitting}
              className="px-8 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? 'Publishing…' : 'Publish Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
