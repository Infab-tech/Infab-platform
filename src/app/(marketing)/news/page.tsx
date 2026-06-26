import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/supabase/prisma';
import { FALLBACK_NEWS } from '@/lib/content-defaults';

export const metadata: Metadata = {
  title: 'News & Events | INFAB Semiconductor',
  description: 'Latest announcements, product launches, research milestones, and events from INFAB Semiconductor.',
};

interface ArticleShape {
  id: string;
  date: Date;
  category: string;
  title: string;
  description: string;
  link: string | null;
}

const FALLBACK_ARTICLES: ArticleShape[] = FALLBACK_NEWS.map((a, i) => ({
  id: `default-${i}`,
  date: a.publishedAt,
  category: a.category,
  title: a.title,
  description: a.description,
  link: a.link,
}));


function fmt(date: Date) {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}
function fmtShort(date: Date) {
  return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}

export default async function NewsPage() {
  let dbArticles: typeof FALLBACK_ARTICLES = [];
  try {
    const rows = await prisma.newsArticle.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    });
    dbArticles = rows.map((r) => ({
      id: r.id,
      date: r.publishedAt,
      category: r.category,
      title: r.title,
      description: r.description,
      link: r.link,
    }));
  } catch {
    // DB not connected — use fallback
  }

  const articles = dbArticles.length > 0 ? dbArticles : FALLBACK_ARTICLES;

  const categoryCounts: Record<string, number> = {};
  for (const article of articles) {
    const cat = article.category || 'Uncategorized';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  }
  
  const dynamicCategories = Object.keys(categoryCounts)
    .sort()
    .map(label => ({ label, count: categoryCounts[label] }));

  return (
    <div className="bg-[var(--bg-primary)]">

      {/* Page Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
            Press &amp; Updates
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight max-w-3xl">
            News &amp; Events
          </h1>
          <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            Latest announcements, product launches, research milestones, and events from INFAB Semiconductor Pvt. Ltd.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Articles — left (wider) */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden transition-all duration-300 hover:border-[var(--accent-primary)]/30"
                >
                  <div className="h-2 bg-gradient-to-r from-[var(--accent-primary)]/60 to-[var(--accent-primary)]/10"></div>

                  <div className="p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-flex items-center px-3 py-1 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-xs font-mono font-bold uppercase tracking-wider rounded">
                        {fmtShort(article.date)}
                      </span>
                      <span className="text-xs text-[var(--text-secondary)] font-mono uppercase tracking-wider">
                        {article.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 leading-snug group-hover:text-[var(--accent-primary)] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--text-secondary)]">{fmt(article.date)}</span>
                      {article.link ? (
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors"
                        >
                          Read Article <i className="ph ph-arrow-square-out"></i>
                        </a>
                      ) : (
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors"
                        >
                          Contact Us <i className="ph ph-arrow-right transition-transform group-hover:translate-x-1"></i>
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-8">

              {/* Categories */}
              <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] mb-6">
                  Categories
                </h3>
                <ul className="flex flex-col gap-1">
                  {dynamicCategories.map((cat) => (
                    <li key={cat.label}>
                      <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/5 hover:text-[var(--text-primary)] transition-colors text-left">
                        <span>{cat.label}</span>
                        <span className="font-mono text-xs bg-[var(--bg-primary)] border border-[var(--border-primary)] px-2 py-0.5 rounded">
                          {cat.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Featured Articles */}
              <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] mb-6">
                  Featured News
                </h3>
                <ul className="flex flex-col gap-6">
                  {articles.slice(0, 3).map((a) => (
                    <li key={a.id} className="border-b border-[var(--border-primary)] pb-6 last:border-0 last:pb-0">
                      <a href={a.link} target="_blank" rel="noopener noreferrer" className="group block">
                        <p className="text-xs font-mono text-[var(--accent-primary)] mb-2">{fmtShort(a.date)}</p>
                        <h4 className="text-sm font-bold text-[var(--text-primary)] leading-snug line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
                          {a.title}
                        </h4>
                        <div className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">
                          Read More <i className="ph ph-arrow-right transition-transform group-hover:translate-x-1"></i>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Follow */}
              <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] mb-6">
                  Follow INFAB
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/company/infab-semiconductor-pvt-ltd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-primary)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)]/50 hover:text-[var(--accent-primary)]"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v96a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM216,208a8,8,0,0,1-8-8V160a36,36,0,0,0-72,0v40a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A52,52,0,0,1,216,160v40A8,8,0,0,1,216,208ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path></svg>
                  </a>
                  <a
                    href="mailto:info@infab-tech.com.com"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-primary)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)]/50 hover:text-[var(--accent-primary)]"
                    aria-label="Email"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"></path></svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Connect CTA */}
      <div className="border-t border-[var(--border-primary)] bg-[var(--bg-secondary)] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Have a question or partnership inquiry?</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Reach out to the INFAB team directly — we typically respond within one business day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919980909371"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-md bg-[#25D366] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72,24,24,0,0,1,19.29-23.54l11.48,22.95L101,117.11a8,8,0,0,0-.73,7.65,56.47,56.47,0,0,0,30.15,30.15,8,8,0,0,0,7.65-.73l13.7-9.29L174.54,156.7A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a88,88,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216l12.47-37.4a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path></svg>
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-md border border-[var(--accent-primary)] px-8 text-sm font-semibold uppercase tracking-wider text-[var(--accent-primary)] transition-all hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)]"
            >
              Contact Page
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
