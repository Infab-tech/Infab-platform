import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services | INFAB Semiconductor',
  description: 'End-to-end MEMS and microfluidics services — from concept to qualified device — using world-class cleanroom facilities at IISc CeNSE.',
};

const customDesignCapabilities = [
  {
    icon: 'ph-pencil-ruler',
    title: 'Application-Specific Architecture',
    description: 'We translate your sensor or actuator concept into an optimised MEMS architecture — selecting the right transduction principle, material stack, and device geometry for your target application.',
  },
  {
    icon: 'ph-monitor-play',
    title: 'Multi-Physics Simulation',
    description: 'FEM and CFD simulation using COMSOL Multiphysics and Ansys to model electrostatic, piezoresistive, thermal, and fluidic behaviour before a single wafer is processed.',
  },
  {
    icon: 'ph-graph',
    title: 'Process Design Kit (PDK)',
    description: 'Layout design using our in-house PDK covering lithography, DRIE, thin-film, and packaging design rules. Compatible with standard EDA toolchains for seamless tape-out.',
  },
  {
    icon: 'ph-flask',
    title: 'Rapid Prototyping',
    description: 'Fast-turn prototyping within our IISc CeNSE cleanroom — from mask generation to diced devices in weeks, not months, enabling tight design-test-iterate cycles.',
  },
  {
    icon: 'ph-factory',
    title: 'Design for Manufacturability',
    description: 'Every design is reviewed for yield, reliability, and scalability. We identify process sensitivities early so your prototype transitions smoothly to small-volume production.',
  },
  {
    icon: 'ph-shield-check',
    title: 'IP-Protected Development',
    description: 'Full NDA-backed engagement. Your MEMS architecture, process integration flows, and measurement data remain your intellectual property throughout the project.',
  },
];

const microfluidicsSteps = [
  { num: '01', title: 'Design & Simulation', description: 'CAD layout and CFD simulation of microfluidic networks, channel geometries, and flow dynamics using COMSOL and custom tools.' },
  { num: '02', title: 'Mask & Lithography', description: 'Photomask generation and photolithographic patterning on silicon, glass, and polymer substrates to micron-level precision.' },
  { num: '03', title: 'Etching & Bonding', description: 'Wet/dry etching for channel formation, followed by anodic bonding, fusion bonding, or adhesive bonding for chip sealing.' },
  { num: '04', title: 'Packaging & Test', description: 'Fluidic interconnect packaging, optical testing, leak testing, and functional characterisation before delivery.' },
];

const memsProcesses = [
  { icon: 'ph-sun', title: 'Photolithography', detail: 'UV and deep-UV lithography with minimum feature sizes down to 2 µm. Substrate compatibility: silicon, glass, quartz, SOI, SiC.' },
  { icon: 'ph-waves', title: 'Deep Reactive Ion Etching (DRIE)', detail: 'Bosch-process DRIE for high-aspect-ratio silicon structures. Etch depth up to 300 µm with vertical sidewalls.' },
  { icon: 'ph-stack', title: 'Thin Film Deposition', detail: 'LPCVD, PECVD, sputtering, and thermal oxidation for dielectric, metal, and piezoelectric thin films (SiO₂, Si₃N₄, Al, Au, PZT).' },
  { icon: 'ph-link', title: 'Wafer Bonding', detail: 'Silicon-to-silicon fusion bonding, silicon-to-glass anodic bonding, and eutectic bonding for hermetic sealing and 3D integration.' },
  { icon: 'ph-cube', title: 'MEMS Packaging', detail: 'Wafer-level chip-scale packaging (WLCSP), die-level packaging, hermetic metal packages, and PCB-level integration for sensors.' },
  { icon: 'ph-chart-line', title: 'Process Characterisation & Yield', detail: 'Full wafer-level electrical testing, parametric measurement, and yield analysis. CEA/JEDEC-compliant test protocols.' },
];

const facilities = [
  { icon: 'ph-circles-three', title: 'Class 100 Cleanroom', description: 'ISO Class 5 (Class 100) environment. Full suite of photolithography, deposition, and etch equipment for 4" and 6" wafers.', photo: '/assests/services/cwb-semi-clean.jpg' },
  { icon: 'ph-magnifying-glass', title: 'Characterisation Lab', description: 'Full suite of surface, electrical, and optical characterisation equipment including SEM, AFM, profilometer, C-V and I-V measurement stations.', photo: '/assests/services/dektakxt.jpg' },
  { icon: 'ph-waves', title: 'Deep Reactive Ion Etch (DRIE)', description: 'Bosch-process DRIE chamber for high-aspect-ratio silicon structures. Etch depth up to 300 µm with vertical sidewalls and tight CD control.', photo: '/assests/services/drie.jpg' },
  { icon: 'ph-sun', title: 'Lithography Tools', description: 'MJB4 & EVG620 mask aligners for UV and deep-UV lithography with feature sizes down to 2 µm on silicon, glass, and polymer substrates.', photo: '/assests/services/mjb4.png' },
  { icon: 'ph-drop', title: 'Microfluidics Lab', description: 'Dedicated PDMS fabrication, spin coating, and soft lithography equipment. UV curing station, plasma bonding, and fluidic testing benches.', photo: '/assests/services/spincoater.jpg' },
  { icon: 'ph-monitor', title: 'Design & Simulation Centre', description: 'Workstation cluster running COMSOL Multiphysics, Cadence, Ansys, and custom MEMS design tools for sensor design, simulation, and layout.', photo: '/assests/services/infab-section-1.png' },
];

export default function ServicesPage() {
  return (
    <div className="bg-[var(--bg-primary)]">

      {/* Page Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">What We Do</span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight max-w-3xl">Services</h1>
          <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            End-to-end MEMS and microfluidics services — from concept to qualified device — using world-class cleanroom facilities at IISc CeNSE.
          </p>
        </div>
      </div>

      {/* Custom MEMS Design & Foundry */}
      <div id="custom-design" className="border-b border-[var(--border-primary)] py-32 bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-16">
            <div>
              <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Service 01</span>
              <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">Custom MEMS Design &amp; Foundry</h2>
              <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                From concept to qualified device — INFAB offers end-to-end MEMS design services backed by world-class cleanroom fabrication at IISc CeNSE. Whether you need a novel sensor architecture or a production-ready die, our engineers work alongside your team across every phase.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-[var(--accent-primary)]/20 bg-[var(--bg-primary)] p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--accent-primary)] mb-2">Engagement Model</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li className="flex items-center gap-2"><i className="ph ph-check-circle text-[var(--accent-primary)]"></i> Concept feasibility &amp; architecture review</li>
                  <li className="flex items-center gap-2"><i className="ph ph-check-circle text-[var(--accent-primary)]"></i> Simulation → tape-out → prototype delivery</li>
                  <li className="flex items-center gap-2"><i className="ph ph-check-circle text-[var(--accent-primary)]"></i> Iterative design-test cycles (weeks, not months)</li>
                  <li className="flex items-center gap-2"><i className="ph ph-check-circle text-[var(--accent-primary)]"></i> Full NDA — your IP stays yours</li>
                </ul>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wider text-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-colors">
                Start a Design Engagement <i className="ph ph-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Capabilities grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customDesignCapabilities.map((cap) => (
              <div key={cap.title} className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center mb-5">
                  <i className={`ph ${cap.icon} text-xl text-[var(--accent-primary)]`}></i>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">{cap.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Microfluidics Solution */}
      <div id="microfluidics" className="border-b border-[var(--border-primary)] py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Service 02</span>
              <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">Microfluidics Solution</h2>
              <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                We bring your microfluidic concepts to life through advanced cleanroom fabrication, combining silicon, glass, and polymer processing under one roof. From initial design to final packaged chip, INFAB handles the complete development cycle.
              </p>
              {/* Real lab photo */}
              <div className="rounded-2xl overflow-hidden border border-[var(--border-primary)] mb-8">
                <Image src="/assests/services/microfluidics-showcase.png" alt="INFAB Microfluidics Cleanroom" width={640} height={360} className="w-full object-cover" />
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wider text-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-colors">
                Request a Quote <i className="ph ph-arrow-right"></i>
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              {microfluidicsSteps.map((step) => (
                <div key={step.num} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center">
                    <span className="font-mono text-sm font-bold text-[var(--accent-primary)]">{step.num}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">{step.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MEMS Fabrication */}
      <div id="mems" className="border-b border-[var(--border-primary)] py-32 bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Service 03</span>
              <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">MEMS Fabrication Services</h2>
              <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                INFAB offers comprehensive MEMS process services for prototyping and small-volume production. Our experienced team supports clients from research institutions to industrial OEMs.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-[var(--border-primary)]">
              <Image src="/assests/services/mems-fabrication.png" alt="INFAB MEMS Fabrication Facility" width={640} height={427} className="w-full object-cover" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {memsProcesses.map((p) => (
              <div key={p.title} className="flex gap-5 items-start rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] p-6 transition-all duration-300 hover:border-[var(--accent-primary)]/40">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center">
                  <i className={`ph ${p.icon} text-lg text-[var(--accent-primary)]`}></i>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{p.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Facilities */}
      <div id="facilities" className="border-b border-[var(--border-primary)] py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 max-w-3xl">
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Infrastructure</span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">Facilities</h2>
            <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              INFAB operates from two sites in Bengaluru, leveraging one of India&apos;s finest academic cleanroom facilities alongside a dedicated corporate R&amp;D centre.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
                {f.photo && (
                  <div className="h-44 overflow-hidden border-b border-[var(--border-primary)]">
                    <Image src={f.photo} alt={f.title} width={480} height={176} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
                <div className="p-8">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center mb-5">
                    <i className={`ph ${f.icon} text-xl text-[var(--accent-primary)]`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">{f.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Ready to start your project?</h2>
          <p className="text-[var(--text-secondary)] mb-8 text-lg">Talk to our engineers about your MEMS or microfluidics requirements.</p>
          <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--accent-primary)] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110">
            Get in Touch
          </Link>
        </div>
      </div>

    </div>
  );
}
