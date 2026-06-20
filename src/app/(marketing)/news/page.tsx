import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'News & Events | INFAB Semiconductor',
  description: 'Latest announcements, product launches, research milestones, and events from INFAB Semiconductor.',
};

const articles = [
  {
    id: 1,
    date: 'March 25, 2026',
    dateShort: 'Mar 2026',
    category: 'Product Launches',
    title: 'INFAB Semiconductor Expands Aerospace Product Portfolio with New Differential Pressure Transducers',
    description:
      'INFAB Semiconductor announces the launch of its next-generation TP Series differential pressure transducers, offering enhanced accuracy and extended operating temperature range for commercial aviation and UAV applications.',
  },
  {
    id: 2,
    date: 'January 30, 2026',
    dateShort: 'Jan 2026',
    category: 'Awards & Recognition',
    title: 'New Organ-on-Chip Platform for Pharmaceutical Research Receives CE Mark Approval',
    description:
      "INFAB Semiconductor's latest microfluidic organ-on-chip platform has received European CE Mark certification, opening doors for clinical research partnerships across the EU and validating INFAB's quality management processes.",
  },
  {
    id: 3,
    date: 'December 10, 2025',
    dateShort: 'Dec 2025',
    category: 'Awards & Recognition',
    title: 'INFAB Recognised with "Best Deep-Tech Startup" Award at India Semiconductor Summit 2025',
    description:
      'INFAB Semiconductor received the Best Deep-Tech Startup of the Year award at the India Semiconductor Summit held in Bengaluru, acknowledging the company\'s contributions to the domestic semiconductor ecosystem.',
  },
  {
    id: 4,
    date: 'October 5, 2025',
    dateShort: 'Oct 2025',
    category: 'Partnerships & MoUs',
    title: 'INFAB Semiconductor Signs MoU with HAL for Co-Development of Avionics Pressure Sensors',
    description:
      'INFAB Semiconductor signed a Memorandum of Understanding with Hindustan Aeronautics Limited (HAL) to co-develop indigenous MEMS pressure sensors for the Light Combat Aircraft (LCA) Tejas programme.',
  },
  {
    id: 5,
    date: 'July 18, 2025',
    dateShort: 'Jul 2025',
    category: 'Funding & Investors',
    title: 'INFAB Receives Series A Funding to Scale MEMS Manufacturing Capacity',
    description:
      'INFAB Semiconductor has successfully closed a Series A funding round led by a consortium of deep-tech investors and supported by the CDIIC initiative, enabling a 3x expansion of cleanroom capacity and workforce growth.',
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

export default function NewsPage() {
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
                  {/* Top bar */}
                  <div className="h-2 bg-gradient-to-r from-[var(--accent-primary)]/60 to-[var(--accent-primary)]/10"></div>

                  <div className="p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-flex items-center px-3 py-1 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-xs font-mono font-bold uppercase tracking-wider rounded">
                        {article.dateShort}
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
                      <span className="text-xs text-[var(--text-secondary)]">{article.date}</span>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors"
                      >
                        Read More <i className="ph ph-arrow-right transition-transform group-hover:translate-x-1"></i>
                      </Link>
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
                        <p className="text-xs font-mono text-[var(--accent-primary)] mb-1">{a.dateShort}</p>
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
