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
              Engineering the future of <br />Semiconductor.
            </h2>
            <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>

            <p className="text-[var(--text-secondary)] mb-6 text-lg leading-relaxed">
              Incubated at INCeNSE, Indian Institute of Science (IISc), Bengaluru, INFAB Semiconductor Pvt. Ltd is a pioneering Indian deep tech company specialising in the design, development, and manufacturing of advanced MEMS sensors, actuators, and microfluidic devices.
            </p>
            <p className="text-[var(--text-secondary)] mb-10 text-lg leading-relaxed">
              Combining world class facilities with cutting edge expertise, we build Made in India innovations from aerospace pressure transducers to lab-on-a-chip (LOC) for the world.
            </p>

            {/* Three Pillars */}
            <div className="flex flex-col gap-7">
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 mt-1">
                  <i className="ph ph-lightbulb-filament text-2xl text-[var(--text-primary)]"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Innovation</h3>
                  <p className="text-[var(--text-secondary)]">Leveraging advanced fabrication techniques to deliver breakthrough MEMS and microfluidics devices.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 mt-1">
                  <i className="ph ph-shield-check text-2xl text-[var(--text-primary)]"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Quality</h3>
                  <p className="text-[var(--text-secondary)]">Delivering devices that meet the most stringent performance and reliability standards  ISO 9001 & AS 9100D certified.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 mt-1">
                  <i className="ph ph-globe-hemisphere-east text-2xl text-[var(--text-primary)]"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Impact</h3>
                  <p className="text-[var(--text-secondary)]">Powering sectors like Aerospace & Defence, Healthcare & Life Sciences, Semiconductor MEMS with Indian made hardware solutions.</p>
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
                IISc INCeNSE
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
                ISO 9001 & AS9100D
              </div>
              <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Certified</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
