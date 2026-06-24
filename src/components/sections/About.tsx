'use client';

import AnimatedNumber from '@/components/ui/AnimatedNumber';

export default function About() {
  return (
    <section className="relative py-32 bg-[var(--bg-primary)] overflow-hidden" id="about">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left Column */}
          <div>
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-[var(--text-primary)] leading-tight">
              Precision-built MEMS.<br />Made in India.
            </h2>
            <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>

            <p className="text-[var(--text-secondary)] mb-6 text-lg leading-relaxed">
              INFAB Semiconductor designs and manufactures MEMS sensors, microfluidic chips, and semiconductor devices — handling everything in-house from design through fabrication, test, and packaging. Incubated at <strong className="text-[var(--text-primary)] font-medium">InCeNSE, Bengaluru</strong>.
            </p>
            <p className="text-[var(--text-secondary)] mb-10 text-lg leading-relaxed">
              Our devices fly in aircraft, enable drug discovery in labs, and push India&apos;s semiconductor capability forward — serving aerospace, healthcare, and MEMS fabrication clients from a single Bengaluru facility.
            </p>

            {/* Three Pillars */}
            <div className="flex flex-col gap-7">
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 mt-1">
                  <i className="ph ph-lightbulb-filament text-2xl text-[var(--text-primary)]"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Designed Here</h3>
                  <p className="text-[var(--text-secondary)]">Every device is engineered from scratch for your application — not adapted from a catalog. Concept feasibility to tape-out-ready layouts, entirely in-house.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 mt-1">
                  <i className="ph ph-shield-check text-2xl text-[var(--text-primary)]"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Certified Quality</h3>
                  <p className="text-[var(--text-secondary)]">ISO 9001:2015 and AS 9100D certified. Every device ships with full test data and traceability — no shortcuts on process qualification.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 mt-1">
                  <i className="ph ph-globe-hemisphere-east text-2xl text-[var(--text-primary)]"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">3 Markets</h3>
                  <p className="text-[var(--text-secondary)]">Aerospace &amp; Defence, Healthcare &amp; Life Sciences, Semiconductor MEMS — all served from one facility, without outsourcing your IP.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Card 1 */}
            <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
              <div className="text-3xl text-[var(--text-secondary)] mb-4 flex justify-center"><i className="ph ph-certificate"></i></div>
              <div className="font-sans text-3xl font-bold leading-none text-[var(--text-primary)] mb-3">
                InCeNSE
              </div>
              <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Incubated</p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5 lg:translate-y-8">
              <div className="text-3xl text-[var(--text-secondary)] mb-4 flex justify-center"><i className="ph ph-microscope"></i></div>
              <div className="font-sans text-5xl font-bold leading-none text-[var(--text-primary)] mb-3">
                <AnimatedNumber target={3} suffix="" />
              </div>
              <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Market Domains</p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
              <div className="text-3xl text-[var(--text-secondary)] mb-4 flex justify-center"><i className="ph ph-shield-star"></i></div>
              <div className="font-sans text-5xl font-bold leading-none text-[var(--text-primary)] mb-3">
                <AnimatedNumber target={100} suffix="%" />
              </div>
              <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Indigenous Design</p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5 lg:translate-y-8">
              <div className="text-3xl text-[var(--text-secondary)] mb-4 flex justify-center"><i className="ph ph-seal-check"></i></div>
              <div className="font-sans text-4xl font-bold leading-none text-[var(--text-primary)] mb-3">
                ISO
              </div>
              <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Certified</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
