import type { Metadata } from 'next';
import Recognitions from '@/components/sections/Recognitions';

export const metadata: Metadata = {
  title: 'About Us | INFAB Semiconductor',
  description: 'INFAB Semiconductor — MEMS sensors, microfluidic chips, and semiconductor fabrication services, designed and built in Bengaluru. InCeNSE incubated. ISO 9001 & AS 9100D certified.',
};

const values = [
  {
    icon: 'ph-lightbulb-filament',
    title: 'Innovation',
    description: 'Leveraging advanced fabrication techniques and deep scientific expertise to deliver breakthrough MEMS and microfluidics technologies that push the boundaries of what is possible.',
  },
  {
    icon: 'ph-shield-check',
    title: 'Quality',
    description: 'Delivering devices that meet the most stringent international performance and reliability standards — because our customers\' systems cannot afford to fail, and neither can ours.',
  },
  {
    icon: 'ph-globe-hemisphere-east',
    title: 'Impact',
    description: 'Powering critical sectors — aerospace, healthcare, and life sciences — with Indian-made hardware that improves lives, enhances safety, and advances human knowledge.',
  },
];

const supporters = ['AIC', 'BIRAC', 'InCeNSE', 'CDIIC', 'Elevate', 'fSID', 'MeitY'];

export default function AboutPage() {
  return (
    <div className="bg-[var(--bg-primary)]">

      {/* Page Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
            Who We Are
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight max-w-3xl">
            About INFAB Semiconductor
          </h1>
          <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            Designing and manufacturing MEMS sensors, microfluidic chips, and semiconductor devices — entirely in Bengaluru, for clients across aerospace, healthcare, and research.
          </p>
        </div>
      </div>



      {/* Who We Are */}
      <div className="border-b border-[var(--border-primary)] py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <div>
              <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
                Our Story
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight">
                Engineering the future of micro-systems.
              </h2>
              <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
                INFAB Semiconductor Pvt. Ltd designs and manufactures MEMS sensors, actuators, and microfluidic devices. Headquartered in Bengaluru and incubated at <strong className="text-[var(--text-primary)] font-medium">InCeNSE</strong>, we handle the full development cycle — design, fabrication, test, and packaging — under one roof, building Made-in-India products for global applications.
              </p>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
                Our portfolio includes MEMS pressure transducers, pressure switches, Hall sensors, flow sensors, and microfluidic chips — engineered for exceptional precision and reliability. We also offer advanced semiconductor process services to accelerate next-generation device development.
              </p>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                From aerospace pressure transducers to custom glass-bonding mRNA chips, we deliver international-standard solutions engineered entirely in India.
              </p>
            </div>

            {/* IISc Incubation Card */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-[var(--accent-primary)]/20 bg-[var(--bg-secondary)] p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center">
                    <i className="ph ph-flask text-2xl text-[var(--accent-primary)]"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">Incubated at InCeNSE</h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)]">InCeNSE, Bengaluru</p>
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  INFAB Semiconductor is incubated at <strong className="text-[var(--text-primary)]">InCeNSE</strong> — the deep-tech incubator at the Centre for Nano Science and Engineering, Bengaluru. This gives us direct access to cleanroom facilities, scientific expertise, and a connected deep-tech ecosystem.
                </p>
                <div className="border-t border-[var(--border-primary)] pt-6">
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-3">Supported by</p>
                  <div className="flex flex-wrap gap-2">
                    {supporters.map((s) => (
                      <span key={s} className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-[var(--bg-primary)] border border-[var(--border-primary)] text-[var(--text-secondary)]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
                <div className="flex items-center gap-3 mb-3">
                  <i className="ph ph-map-pin text-xl text-[var(--accent-primary)]"></i>
                  <h4 className="font-bold text-[var(--text-primary)]">Bengaluru, Karnataka</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Operating from two sites — our R&amp;D cleanroom at InCeNSE and our corporate office &amp; lab in Jakkur, Bengaluru.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="border-b border-[var(--border-primary)] py-32 bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
              Purpose
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Mission &amp; Vision
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] p-10 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center mb-6">
                <i className="ph ph-target text-2xl text-[var(--accent-primary)]"></i>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Our Mission</h3>
              <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-6"></div>
              <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                To translate research into industrial applications through MEMS and microfluidics technologies — designed and manufactured entirely in India, certified to the highest international quality and reliability standards.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] p-10 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center mb-6">
                <i className="ph ph-eye text-2xl text-[var(--accent-primary)]"></i>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Our Vision</h3>
              <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-6"></div>
              <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                To become India&apos;s foremost MEMS and microfluidics company — powering critical sectors including aerospace, healthcare, and life sciences with precision hardware that bridges the future of science and industry.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-32 bg-[var(--bg-primary)] border-b border-[var(--border-primary)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
              What Drives Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Core values.
            </h2>
            <div className="w-12 h-1 bg-[var(--accent-primary)] mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center mb-6">
                  <i className={`ph ${v.icon} text-2xl text-[var(--accent-primary)]`}></i>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">{v.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recognitions */}
      <Recognitions />

    </div>
  );
}
