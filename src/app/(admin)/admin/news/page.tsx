import { prisma } from '@/lib/supabase/prisma';
import { toggleNewsPublished, deleteNewsArticle } from '@/app/actions/admin';
import Link from 'next/link';

export const metadata = { title: 'News Management | Admin Console' };

const CATEGORY_COLOURS: Record<string, string> = {
  'Product Launches': 'text-cyan-400 bg-cyan-400/10',
  'Partnerships & MoUs': 'text-purple-400 bg-purple-400/10',
  'Awards & Recognition': 'text-yellow-400 bg-yellow-400/10',
  'Funding & Investors': 'text-green-400 bg-green-400/10',
  'Research & Papers': 'text-blue-400 bg-blue-400/10',
  'Events & Conferences': 'text-orange-400 bg-orange-400/10',
};

function categoryClass(cat: string) {
  return CATEGORY_COLOURS[cat] ?? 'text-[var(--text-secondary)] bg-[var(--text-primary)]/5';
}

export default async function AdminNewsPage() {
  let articles: Awaited<ReturnType<typeof prisma.newsArticle.findMany>> = [];
  try {
    articles = await prisma.newsArticle.findMany({ orderBy: { publishedAt: 'desc' } });
  } catch {
    // DB not connected yet
  }

  return (
    <div className="max-w-6xl mx-auto pt-8 sm:pt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
        <div className="mt-8 sm:mt-0">
          <h1 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">News Articles</h1>
          <p className="text-[var(--text-secondary)]">Manage press releases, events, and company updates shown on the public News page.</p>
        </div>
        <Link
          href="/admin/news/new"
          className="px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
        >
          + New Article
        </Link>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--text-primary)]/[0.02] border-b border-[var(--text-primary)]/10 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                <th className="p-5 font-semibold">Date</th>
                <th className="p-5 font-semibold">Category</th>
                <th className="p-5 font-semibold">Title</th>
                <th className="p-5 font-semibold">Link</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {articles.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-[var(--text-secondary)]">
                    No articles yet. Click &ldquo;+ New Article&rdquo; to add one.
                  </td>
                </tr>
              )}
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-[var(--text-primary)]/5 hover:bg-[var(--text-primary)]/[0.02] transition-colors text-[var(--text-primary)]"
                >
                  <td className="p-5 whitespace-nowrap font-mono text-xs text-[var(--text-secondary)]">
                    {article.publishedAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-mono uppercase ${categoryClass(article.category)}`}>
                      {article.category}
                    </span>
                  </td>
                  <td className="p-5 max-w-sm">
                    <div className="font-semibold text-[var(--text-primary)] line-clamp-1">{article.title}</div>
                    <div className="text-xs text-[var(--text-secondary)] line-clamp-1 mt-0.5">{article.description}</div>
                  </td>
                  <td className="p-5">
                    {article.link ? (
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--accent-primary)] hover:underline flex items-center gap-1"
                      >
                        <i className="ph ph-arrow-square-out"></i> View
                      </a>
                    ) : (
                      <span className="text-xs text-[var(--text-secondary)]/40">—</span>
                    )}
                  </td>
                  <td className="p-5">
                    {article.isPublished ? (
                      <span className="text-green-500 font-bold text-xs uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Published
                      </span>
                    ) : (
                      <span className="text-yellow-500 font-bold text-xs uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Draft
                      </span>
                    )}
                  </td>
                  <td className="p-5">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/news/${article.id}/edit`}
                        className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-[var(--text-primary)]/20 hover:bg-[var(--text-primary)]/10 transition-colors"
                      >
                        Edit
                      </Link>

                      <form action={async () => {
                        'use server';
                        await toggleNewsPublished(article.id, article.isPublished);
                      }}>
                        <button
                          type="submit"
                          className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-[var(--text-primary)]/20 hover:bg-[var(--text-primary)]/10 transition-colors"
                        >
                          {article.isPublished ? 'Unpublish' : 'Publish'}
                        </button>
                      </form>

                      <form action={async () => {
                        'use server';
                        await deleteNewsArticle(article.id);
                      }}>
                        <button
                          type="submit"
                          className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
