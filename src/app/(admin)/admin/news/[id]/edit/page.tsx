'use client';

import { useState, useEffect } from 'react';
import { updateNewsArticle } from '@/app/actions/admin';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const CATEGORIES = [
  'Product Launches',
  'Partnerships & MoUs',
  'Awards & Recognition',
  'Funding & Investors',
  'Research & Papers',
  'Events & Conferences',
];

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string | null;
  publishedAt: string;
  isPublished: boolean;
}

export default function EditNewsArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/news/${id}`)
      .then((r) => r.json())
      .then((data) => { setArticle(data); setLoading(false); })
      .catch(() => { setError('Failed to load article.'); setLoading(false); });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const result = await updateNewsArticle(id, new FormData(e.currentTarget));
    if (result && !result.success) {
      setError(result.message ?? 'Something went wrong.');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto pt-20 flex items-center justify-center gap-3 text-[var(--text-secondary)]">
        <i className="ph ph-spinner-gap animate-spin text-xl"></i> Loading article…
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto pt-20 text-center">
        <p className="text-red-400">Article not found.</p>
        <Link href="/admin/news" className="text-[var(--accent-primary)] text-sm mt-4 inline-block">← Back to News</Link>
      </div>
    );
  }

  const dateValue = article.publishedAt.split('T')[0];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10 flex items-center gap-4">
        <Link
          href="/admin/news"
          className="w-10 h-10 rounded-full bg-[var(--text-primary)]/5 flex items-center justify-center hover:bg-[var(--text-primary)]/10 transition-colors text-[var(--text-primary)]"
        >
          <i className="ph ph-arrow-left"></i>
        </Link>
        <div>
          <h1 className="text-3xl font-bold mb-1 text-[var(--text-primary)]">Edit Article</h1>
          <p className="text-[var(--text-secondary)]">Update the headline, summary, or link for this news item.</p>
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Headline *</label>
            <input
              type="text" id="title" name="title" required defaultValue={article.title}
              className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--text-primary)]/[0.05] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Category *</label>
              <select
                id="category" name="category" required defaultValue={article.category}
                className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] appearance-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="text-black">{c}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="publishedAt" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">
                Publication Date <span className="normal-case font-normal">(optional)</span>
              </label>
              <input
                type="date" id="publishedAt" name="publishedAt" defaultValue={dateValue}
                className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Summary *</label>
            <textarea
              id="description" name="description" rows={5} required defaultValue={article.description}
              className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--text-primary)]/[0.05] transition-colors resize-none"
            ></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="link" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">
              Article Link <span className="normal-case font-normal">(optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
                <i className="ph ph-link-simple"></i>
              </span>
              <input
                type="url" id="link" name="link" defaultValue={article.link ?? ''}
                placeholder="https://example.com/full-article"
                className="w-full bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg pl-10 pr-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--text-primary)]/[0.05] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[var(--text-primary)]/[0.02] border border-[var(--text-primary)]/10 rounded-xl">
            <input
              type="checkbox" id="isPublished" name="isPublished"
              defaultChecked={article.isPublished}
              className="w-4 h-4 accent-[var(--accent-primary)]"
            />
            <div>
              <label htmlFor="isPublished" className="text-sm font-semibold text-[var(--text-primary)] cursor-pointer">Published</label>
              <p className="text-xs text-[var(--text-secondary)]">Uncheck to move back to draft — hides it from the public News page.</p>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium">{error}</div>
          )}

          <div className="pt-6 border-t border-[var(--text-primary)]/10 flex justify-end gap-4">
            <Link
              href="/admin/news"
              className="px-6 py-3 rounded-lg border border-[var(--text-primary)]/20 text-[var(--text-primary)] font-semibold text-sm hover:bg-[var(--text-primary)]/10 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit" disabled={isSubmitting}
              className="px-8 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
