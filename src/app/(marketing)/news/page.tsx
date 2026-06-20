import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/supabase/prisma';

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

const FALLBACK_ARTICLES: ArticleShape[] = [
  {
    id: '1',
    date: new Date('2025-09-05'),
    category: 'Events & Conferences',
    title: 'Meet Us @ electronica India 2025',
    description: 'INFAB Semiconductor will be exhibiting at electronica India 2025, one of South Asia\'s premier trade fairs for electronics and sensor technologies. Visit our booth to see our latest MEMS pressure sensors and microfluidic platforms in action.',
    link: 'https://electronica-india.com/en/trade-fair/',
  },
  {
    id: '2',
    date: new Date('2025-09-05'),
    category: 'Awards & Recognition',
    title: 'GRAND CHALLENGE Winner',
    description: 'INFAB Semiconductor won the Grand Challenge award, recognising our breakthrough work in indigenous MEMS sensor development. The award was presented through the IIoT Sensors platform, acknowledging our contributions to India\'s deep-tech ecosystem.',
    link: 'https://www.iiotsensors.org/grant-challenge-results',
  },
  {
    id: '3',
    date: new Date('2025-09-05'),
    category: 'Research & Papers',
    title: 'Indian MEMS Startup INFAB Shares Perspective on Surging Domestic Market',
    description: 'INFAB Semiconductor featured in Digitimes, sharing insights on the rapidly growing Indian MEMS market. The article covers our view on domestic semiconductor manufacturing opportunities, the role of IISc incubation, and India\'s path to MEMS self-reliance.',
    link: 'https://www.digitimes.com/news/a20230328VL205/ic-manufacturing-india-mems-startup.html',
  },
  {
    id: '4',
    date: new Date('2025-09-05'),
    category: 'Partnerships & MoUs',
    title: 'INFAB Semiconductor — IISc Spinoff Advancing India\'s Semiconductor Manufacturing',
    description: 'A feature on INFAB Semiconductor as a spinoff from the Indian Institute of Science, highlighting our journey from cleanroom research at CeNSE to commercial MEMS sensor manufacturing for aerospace, healthcare, and semiconductor applications.',
    link: null,
  },
  {
    id: '5',
    date: new Date('2025-08-01'),
    category: 'Research & Papers',
    title: 'INFAB: Powering India\'s Deep-Tech Future from the Inside Out',
    description: 'YourStory profiles INFAB Semiconductor\'s mission to build world-class MEMS technology in India. The piece covers our founding story at IISc CeNSE, our product portfolio spanning aerospace and microfluidics, and the vision behind making India a global MEMS hub.',
    link: 'https://yourstory.com/2025/08/infab-semiconductor-mems-innovation',
  },
];

const categories = [
  { label: 'Product Launches', count: 8 },
  { label: 'Partnerships & MoUs', count: 4 },
  { label: 'Awards & Recognition', count: 5 },
  { label: 'Funding & Investors', count: 3 },
  { label: 'Research & Papers', count: 12 },
  { label: 'Events & Conferences', count: 9 },
];

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
                  {categories.map((cat) => (
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

              {/* Recent Articles */}
              <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] mb-6">
                  Recent
                </h3>
                <ul className="flex flex-col gap-5">
                  {articles.slice(0, 3).map((a) => (
                    <li key={a.id} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"></span>
                      <div>
                        <p className="text-xs font-mono text-[var(--accent-primary)] mb-1">{fmtShort(a.date)}</p>
                        <p className="text-sm text-[var(--text-primary)] leading-snug line-clamp-2">{a.title}</p>
                      </div>
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
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-primary)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)]/50 hover:text-[var(--accent-primary)]"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v96a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM216,208a8,8,0,0,1-8-8V160a36,36,0,0,0-72,0v40a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A52,52,0,0,1,216,160v40A8,8,0,0,1,216,208ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path></svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-primary)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)]/50 hover:text-[var(--accent-primary)]"
                    aria-label="Twitter / X"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M214.75,211.71l-62.6-98.36,61.77-67.95a8,8,0,0,0-11.84-10.76l-58.36,64.17L99.27,44.29A8,8,0,0,0,92.23,40H48a8,8,0,0,0-6.75,12.29l62.6,98.36L41.08,218.61a8,8,0,1,0,11.84,10.76l58.36-64.17,56.45,88.71A8,8,0,0,0,174.77,256H219.23a8,8,0,0,0,6.75-12.29ZM186.34,240l-56-88H146.2l-21.26,23.39L62.06,64H87.66l129.28,176Z"></path></svg>
                  </a>
                  <a
                    href="mailto:info@infabsemi.com"
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

      {/* Subscribe CTA */}
      <div className="border-t border-[var(--border-primary)] bg-[var(--bg-secondary)] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Stay up to date</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Get the latest INFAB news, product launches, and research updates.
          </p>
          <a
            href="mailto:info@infabsemi.com?subject=Subscribe to INFAB Updates"
            className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--accent-primary)] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110"
          >
            Subscribe via Email
          </a>
        </div>
      </div>

    </div>
  );
}
