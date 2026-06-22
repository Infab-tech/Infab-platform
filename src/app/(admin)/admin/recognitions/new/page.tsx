'use client';

import { useState } from 'react';
import { addRecognition } from '@/app/actions/admin';
import Link from 'next/link';
import ImageUploader from '@/components/ui/ImageUploader';
import { useRouter } from 'next/navigation';

export default function NewRecognitionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append('logoUrl', logoUrl);
    
    await addRecognition(formData);
    // redirects on success
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto pt-8 sm:pt-4">
      <div className="mb-6">
        <Link href="/admin/recognitions" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-2 inline-flex items-center gap-1">
          <i className="ph ph-arrow-left"></i> Back to Recognitions
        </Link>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mt-2">Add Recognition</h1>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Title *</label>
            <input name="title" type="text" required placeholder="e.g. ISO 9001:2015" className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Body / Short Description *</label>
            <input name="body" type="text" required placeholder="e.g. Quality Management System" className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Certificate Number (Optional)</label>
            <input name="certNumber" type="text" className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Issuer (Optional)</label>
            <input name="issuer" type="text" placeholder="e.g. Bureau Veritas" className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Display Order</label>
            <input name="order" type="number" defaultValue="0" className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
            <p className="text-xs text-[var(--text-secondary)]">Lower numbers appear first. Default is 0.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Logo Image</label>
            <div className="w-full max-w-sm">
                <ImageUploader 
                    bucket="product-images" 
                    existingUrls={logoUrl ? [logoUrl] : []}
                    onChange={(urls) => setLogoUrl(urls[0] || '')}
                />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="mt-4 bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
            {isSubmitting ? 'Saving...' : 'Save Recognition'}
          </button>
        </form>
      </div>
    </div>
  );
}
