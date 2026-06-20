'use client';

import AnimatedNumber from '@/components/ui/AnimatedNumber';

export default function About() {
  return (
    <section className="relative py-32 bg-[var(--bg-primary)] overflow-hidden" id="about">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left Column: Clean, editorial typography */}
          <div>
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
              Deep-Tech Pioneering
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-[var(--text-primary)] leading-tight">
              Engineering the future of micro-systems.
            </h2>
            <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>

            <p className="text-[var(--text-secondary)] mb-6 text-lg leading-relaxed">
              Incubated at <strong className="text-[var(--text-primary)] font-medium">CeNSE, Indian Institute of Science (IISc), Bangalore</strong>, INFAB Semiconductor is a pioneering technology company specializing in the design, development, and high-precision manufacturing of advanced MEMS sensors and microfluidic chips.
            </p>
            <p className="text-[var(--text-secondary)] mb-10 text-lg leading-relaxed">
              From aerospace pressure transducers to custom glass-bonding mRNA chips, we deliver international-standard solutions engineered entirely in India.
            </p>

            {/* Refined Pillars */}
            <div className="flex flex-col gap-8">
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 mt-1">
                  <i className="ph ph-lightbulb-filament text-2xl text-[var(--text-primary)]"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Proprietary Innovation</h3>
                  <p className="text-[var(--text-secondary)]">Advanced MEMS and microfluidics design intellectual property.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 mt-1">
                  <i className="ph ph-shield-check text-2xl text-[var(--text-primary)]"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Uncompromising Quality</h3>
                  <p className="text-[var(--text-secondary)]">Adherence to strict semiconductor standards and aerospace testing.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Solid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Card 1 */}
            <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
              <div className="text-3xl text-[var(--text-secondary)] mb-4 flex justify-center"><i className="ph ph-certificate"></i></div>
              <div className="font-sans text-5xl font-bold leading-none text-[var(--text-primary)] mb-3">
                <AnimatedNumber target={1} suffix="st" />
              </div>
              <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">CeNSE IISc Incubatee</p>
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
              <div className="text-3xl text-[var(--text-secondary)] mb-4 flex justify-center"><i className="ph ph-sparkles"></i></div>
              <div className="font-sans text-5xl font-bold leading-none text-[var(--text-primary)] mb-3">
                <AnimatedNumber target={10} suffix="+" />
              </div>
              <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Govt. Partners</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}