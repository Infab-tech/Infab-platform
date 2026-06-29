import Link from 'next/link';
import { prisma } from '@/lib/supabase/prisma';
import { FALLBACK_NEWS } from '@/lib/content-defaults';

interface ArticleShape {
  id: string;
  date: Date;
  category: string;
  title: string;
  description: string;
  link: string | null;
}

function fmtShort(date: Date) {
  return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }).toUpperCase();
}

export default async function News() {
  let articles: ArticleShape[] = [];

  try {
    const rows = await prisma.newsArticle.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    });
    articles = rows.map((r) => ({
      id: r.id,
      date: r.publishedAt,
      category: r.category,
      title: r.title,
      description: r.description,
      link: r.link,
    }));
  } catch {
    // DB not available — fall through to fallback
  }

  if (articles.length === 0) {
    articles = FALLBACK_NEWS.slice(0, 3).map((a, i) => ({
      id: `default-${i}`,
      date: a.publishedAt,
      category: a.category,
      title: a.title,
      description: a.description,
      link: a.link,
    }));
  }

  return (
    <section className="py-24 bg-[var(--bg-primary)] border-t border-[var(--border-primary)]" id="news">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
              Press &amp; Updates
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Latest from INFAB
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors border border-[var(--border-primary)] px-6 py-3 rounded-lg hover:border-[var(--accent-primary)]/50"
          >
            View All News
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-primary)] overflow-hidden hover:border-[var(--accent-primary)]/30 transition-all duration-300"
            >
              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-primary)]/70">
                    {item.category}
                  </p>
                  <span className="inline-flex items-center px-2 py-1 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-[10px] font-mono font-bold uppercase tracking-wider rounded">
                    {fmtShort(item.date)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 leading-snug group-hover:text-[var(--accent-primary)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>

                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mt-auto"
                  >
                    Read Article <i className="ph ph-arrow-square-out"></i>
                  </a>
                ) : (
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mt-auto"
                  >
                    Read Article <i className="ph ph-arrow-right transition-transform group-hover:translate-x-1"></i>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
