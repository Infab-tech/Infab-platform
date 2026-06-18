import React from 'react';

const newsItems = [
    {
        id: 1,
        date: "Mar 2026",
        title: "INFAB Semiconductor Expands Aerospace Product Portfolio",
        description: "Launch of next-generation TP Series differential pressure transducers, offering enhanced accuracy and extended operating temperature range.",
        link: "#news"
    },
    {
        id: 2,
        date: "Jan 2026",
        title: "New Microfluidic Platform for Organ-on-Chip Research",
        description: "Our latest microfluidic organ-on-chip platform has received European CE Mark certification, opening doors for clinical research.",
        link: "#news"
    },
    {
        id: 3,
        date: "Dec 2025",
        title: "INFAB Recognised at India Semiconductor Summit 2025",
        description: "Received the Best Deep-Tech Startup award, acknowledging our contributions to the domestic semiconductor ecosystem.",
        link: "#news"
    }
];

export default function News() {
    return (
        <section className="py-24 bg-[var(--bg-primary)] border-t border-[var(--border-primary)]" id="news">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
                            Press & Updates
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
                            Latest from INFAB
                        </h2>
                    </div>
                    <a href="#all-news" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors border border-[var(--border-primary)] px-6 py-3 rounded-lg hover:border-[var(--accent-primary)]/50">
                        View All News
                    </a>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {newsItems.map((item) => (
                        <div key={item.id} className="group relative flex flex-col bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-primary)] overflow-hidden hover:border-[var(--accent-primary)]/30 transition-all duration-300">

                            {/* Abstract Graphic top */}
                            <div className="h-32 bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-primary)] border-b border-[var(--border-primary)] relative overflow-hidden flex items-start justify-end p-6">
                                {/* Decorative element */}
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="opacity-10 absolute -bottom-4 -left-4">
                                    <rect x="10" y="10" width="40" height="40" stroke="currentColor" strokeWidth="2" />
                                    <line x1="10" y1="30" x2="50" y2="30" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                {/* Date Badge */}
                                <span className="inline-flex items-center px-3 py-1 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-xs font-mono font-bold uppercase tracking-wider rounded">
                                    {item.date}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 leading-snug group-hover:text-[var(--accent-primary)] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 flex-grow">
                                    {item.description}
                                </p>
                                <a href={item.link} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mt-auto">
                                    Read Article <i className="ph ph-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}