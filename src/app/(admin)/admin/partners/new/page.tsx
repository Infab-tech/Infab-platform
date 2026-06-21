'use client';

import { useState } from 'react';
import { addPartner } from '@/app/actions/admin';
import Link from 'next/link';
import ImageUploader from '@/components/ui/ImageUploader';
import { useRouter } from 'next/navigation';

export default function NewPartnerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append('logoUrl', logoUrl);
    
    await addPartner(formData);
    // addPartner redirects on success, if we get here it failed
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto pt-8 sm:pt-4">
      <div className="mb-6">
        <Link href="/admin/partners" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-2 inline-flex items-center gap-1">
          <i className="ph ph-arrow-left"></i> Back to Partners
        </Link>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mt-2">Add Partner</h1>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Partner Name</label>
            <input name="name" type="text" required className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Website URL (Optional)</label>
            <input name="websiteUrl" type="url" className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" />
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
            <p className="text-xs text-[var(--text-secondary)] mt-1">Recommended size: 400x200px or similar wide aspect ratio.</p>
          </div>

          <button type="submit" disabled={isSubmitting} className="mt-4 bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
            {isSubmitting ? 'Saving...' : 'Save Partner'}
          </button>
        </form>
      </div>
    </div>
  );
}
