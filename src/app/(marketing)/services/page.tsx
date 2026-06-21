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

          {/* ── Process Capabilities Accordion ───────────────────────────── */}
          <div className="mt-24">
            <div className="mb-10">
              <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Cleanroom Process Capabilities</span>
              <h3 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-4">What we can run for you</h3>
              <p className="text-[var(--text-secondary)] max-w-2xl">
                Our cleanroom at IISc CeNSE covers four core process families. Click any category to see the equipment, specifications, and what it enables.
              </p>
            </div>

            <div className="flex flex-col gap-3">

              {/* 1. Lithography */}
              <details className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden">
                <summary className="flex items-center justify-between px-8 py-6 cursor-pointer select-none list-none">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center flex-shrink-0">
                      <i className="ph ph-sun text-xl text-[var(--accent-primary)]"></i>
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-0.5">Process 01</div>
                      <h4 className="text-lg font-bold text-[var(--text-primary)]">Lithography</h4>
                    </div>
                  </div>
                  <i className="ph ph-plus text-xl text-[var(--accent-primary)] group-open:hidden"></i>
                  <i className="ph ph-minus text-xl text-[var(--accent-primary)] hidden group-open:block"></i>
                </summary>
                <div className="px-8 pb-8 border-t border-[var(--border-primary)]">
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-6 mb-8 max-w-3xl">
                    Photolithographic patterning is the foundation of every MEMS device. We support both contact and proximity lithography on silicon, glass, quartz, SOI, and polymer substrates, with full front-to-back alignment capability for multi-layer devices.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] overflow-hidden">
                      <div className="h-40 overflow-hidden border-b border-[var(--border-primary)]">
                        <Image src="/assests/services/mjb4.png" alt="Karl Süss MJB4 Mask Aligner" width={480} height={160} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-5">
                        <h5 className="font-bold text-[var(--text-primary)] mb-1">Karl Süss MJB4 Mask Aligner</h5>
                        <ul className="text-xs text-[var(--text-secondary)] space-y-1 mt-2">
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Wavelength: 365 nm (i-line)</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Min. feature size: 2 µm</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Wafer size: up to 4&quot;</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Front &amp; back alignment</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Contact, soft &amp; vacuum contact modes</li>
                        </ul>
                      </div>
                    </div>
                    <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] overflow-hidden">
                      <div className="h-40 overflow-hidden border-b border-[var(--border-primary)]">
                        <Image src="/assests/services/evg620.jpg" alt="EVG620 Mask Aligner" width={480} height={160} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-5">
                        <h5 className="font-bold text-[var(--text-primary)] mb-1">EVG620 Mask Aligner</h5>
                        <ul className="text-xs text-[var(--text-secondary)] space-y-1 mt-2">
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Wavelength: 365 nm (i-line) / broadband</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Min. feature size: 2 µm</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Wafer size: up to 6&quot;</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Proximity &amp; contact exposure</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Automated chuck loading</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-5 rounded-xl bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/10">
                    <p className="text-xs font-mono text-[var(--accent-primary)] font-semibold uppercase tracking-wider mb-2">Resist Processes Supported</p>
                    <p className="text-sm text-[var(--text-secondary)]">Positive (AZ, S1800 series), negative (SU-8, AZ nLOF), lift-off (LOR + positive), image-reversal (AZ5214), thick resist (&gt;50 µm), and multi-layer stacks.</p>
                  </div>
                </div>
              </details>

              {/* 2. Dry Etch */}
              <details className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden">
                <summary className="flex items-center justify-between px-8 py-6 cursor-pointer select-none list-none">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center flex-shrink-0">
                      <i className="ph ph-flame text-xl text-[var(--accent-primary)]"></i>
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-0.5">Process 02</div>
                      <h4 className="text-lg font-bold text-[var(--text-primary)]">Dry Etching</h4>
                    </div>
                  </div>
                  <i className="ph ph-plus text-xl text-[var(--accent-primary)] group-open:hidden"></i>
                  <i className="ph ph-minus text-xl text-[var(--accent-primary)] hidden group-open:block"></i>
                </summary>
                <div className="px-8 pb-8 border-t border-[var(--border-primary)]">
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-6 mb-8 max-w-3xl">
                    Dry etching uses reactive gases or plasma to remove material from a substrate with high anisotropy and resolution, making it ideal for defining fine features in micro- and nano-fabrication. Our DRIE and plasma systems handle everything from bulk silicon micromachining to surface cleaning.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] overflow-hidden">
                      <div className="h-40 overflow-hidden border-b border-[var(--border-primary)]">
                        <Image src="/assests/services/drie.jpg" alt="DRIE System" width={480} height={160} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-5">
                        <h5 className="font-bold text-[var(--text-primary)] mb-1">Deep Reactive Ion Etch (DRIE)</h5>
                        <ul className="text-xs text-[var(--text-secondary)] space-y-1 mt-2">
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Bosch process — alternating etch/passivation</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Etch depth: up to 300 µm</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Aspect ratio: &gt; 20:1</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Sidewall angle: 88–90°</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Etch rate: ~3–5 µm/min (silicon)</li>
                        </ul>
                      </div>
                    </div>
                    <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] overflow-hidden">
                      <div className="h-40 overflow-hidden border-b border-[var(--border-primary)]">
                        <Image src="/assests/services/asher.png" alt="Plasma Asher" width={480} height={160} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="p-5">
                        <h5 className="font-bold text-[var(--text-primary)] mb-1">O₂ Plasma Asher</h5>
                        <ul className="text-xs text-[var(--text-secondary)] space-y-1 mt-2">
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Photoresist strip &amp; descum</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Surface activation for bonding</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>PDMS bonding preparation</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Organic contamination removal</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Wafer size: 2&quot;– 6&quot;</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </details>

              {/* 3. Wet Processing */}
              <details className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden">
                <summary className="flex items-center justify-between px-8 py-6 cursor-pointer select-none list-none">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center flex-shrink-0">
                      <i className="ph ph-drop text-xl text-[var(--accent-primary)]"></i>
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-0.5">Process 03</div>
                      <h4 className="text-lg font-bold text-[var(--text-primary)]">Wet Processing</h4>
                    </div>
                  </div>
                  <i className="ph ph-plus text-xl text-[var(--accent-primary)] group-open:hidden"></i>
                  <i className="ph ph-minus text-xl text-[var(--accent-primary)] hidden group-open:block"></i>
                </summary>
                <div className="px-8 pb-8 border-t border-[var(--border-primary)]">
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-6 mb-8 max-w-3xl">
                    Wet processing covers resist coating, chemical etching, cleaning, and wafer bonding. Our wet bench suite handles the full range of standard cleans, anisotropic silicon etching, and oxide growth, alongside spin-coating for resists, polymers, and PDMS layers.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] overflow-hidden">
                      <div className="h-40 overflow-hidden border-b border-[var(--border-primary)]">
                        <Image src="/assests/services/spincoater.jpg" alt="Spin Coater" width={480} height={160} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-5">
                        <h5 className="font-bold text-[var(--text-primary)] mb-1">Laurell Spin Coater</h5>
                        <ul className="text-xs text-[var(--text-secondary)] space-y-1 mt-2">
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Speed range: 500 – 8,000 rpm</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Materials: photoresist, SU-8, PDMS, SOG</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Thickness control: ±2% uniformity</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Wafer size: 2&quot;– 6&quot;</li>
                        </ul>
                      </div>
                    </div>
                    <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] overflow-hidden">
                      <div className="h-40 overflow-hidden border-b border-[var(--border-primary)]">
                        <Image src="/assests/services/evg-bonder.jpg" alt="EVG Wafer Bonder" width={480} height={160} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-5">
                        <h5 className="font-bold text-[var(--text-primary)] mb-1">EVG Wafer Bonder</h5>
                        <ul className="text-xs text-[var(--text-secondary)] space-y-1 mt-2">
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Anodic bonding (Si–glass)</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Fusion bonding (Si–Si)</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Adhesive &amp; eutectic bonding</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Temperature: up to 400 °C</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Bond force: up to 60 kN</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-5 rounded-xl bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/10">
                    <p className="text-xs font-mono text-[var(--accent-primary)] font-semibold uppercase tracking-wider mb-2">Wet Bench Chemistries</p>
                    <p className="text-sm text-[var(--text-secondary)]">RCA-1 / RCA-2 cleans, Piranha (H₂SO₄:H₂O₂), HF oxide strip, KOH anisotropic silicon etch, TMAH etch, buffered oxide etch (BOE), and standard developer/rinse baths.</p>
                  </div>
                </div>
              </details>

              {/* 4. Inline Characterisation */}
              <details className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden">
                <summary className="flex items-center justify-between px-8 py-6 cursor-pointer select-none list-none">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center flex-shrink-0">
                      <i className="ph ph-magnifying-glass-plus text-xl text-[var(--accent-primary)]"></i>
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-0.5">Process 04</div>
                      <h4 className="text-lg font-bold text-[var(--text-primary)]">Inline Characterisation</h4>
                    </div>
                  </div>
                  <i className="ph ph-plus text-xl text-[var(--accent-primary)] group-open:hidden"></i>
                  <i className="ph ph-minus text-xl text-[var(--accent-primary)] hidden group-open:block"></i>
                </summary>
                <div className="px-8 pb-8 border-t border-[var(--border-primary)]">
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-6 mb-8 max-w-3xl">
                    Every wafer run is monitored at key process checkpoints using our in-house characterisation suite. This enables real-time yield feedback and rapid process correction without leaving the facility — critical for tight design-test-iterate cycles.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] overflow-hidden">
                      <div className="h-40 overflow-hidden border-b border-[var(--border-primary)]">
                        <Image src="/assests/services/dektakxt.jpg" alt="Bruker DektakXT Profilometer" width={480} height={160} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-5">
                        <h5 className="font-bold text-[var(--text-primary)] mb-1">Bruker DektakXT Profilometer</h5>
                        <ul className="text-xs text-[var(--text-secondary)] space-y-1 mt-2">
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Step height range: 5 Å – 2,000 µm</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Vertical resolution: 0.1 Å</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Scan length: up to 55 mm</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Film thickness, etch depth, roughness Ra</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Wafer bow &amp; stress measurement</li>
                        </ul>
                      </div>
                    </div>
                    <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] p-5">
                      <h5 className="font-bold text-[var(--text-primary)] mb-4">Additional Characterisation Tools</h5>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-semibold text-[var(--text-primary)] mb-1">Optical Microscopy</p>
                          <p className="text-xs text-[var(--text-secondary)]">Nikon inspection microscope — bright/dark field, 50×/100×/200× objectives. Used for CD measurement, defect inspection, and layer alignment verification.</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[var(--text-primary)] mb-1">SEM (via CeNSE)</p>
                          <p className="text-xs text-[var(--text-secondary)]">Access to field-emission SEM at IISc CeNSE for high-resolution surface imaging, cross-section inspection, and sidewall angle measurement.</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[var(--text-primary)] mb-1">Electrical Testing</p>
                          <p className="text-xs text-[var(--text-secondary)]">Wafer-level probe station for I-V, C-V, and resistance measurements. JEDEC-compliant parametric test protocols for yield analysis.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </details>

            </div>
          </div>

          {/* ── Microqubic MRCL Series ───────────────────────────────────── */}
          <div className="mt-16 rounded-2xl border border-[var(--accent-primary)]/20 bg-[var(--bg-secondary)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Text side */}
              <div className="p-10 flex flex-col justify-center">
                <span className="inline-block font-mono text-xs font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Featured Equipment</span>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Microqubic 2D/3D Imaging System</h3>
                <div className="w-10 h-1 bg-[var(--accent-primary)] mb-6"></div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                  INFAB integrates the <strong className="text-[var(--text-primary)]">Microqubic MRCL Series</strong> modular microscope system into our inline characterisation and inspection workflow. Designed for high-resolution 2D and 3D optical analysis, it supports a wide range of MEMS, microfluidics, and thin-film applications with unmatched ease of use and flexibility.
                </p>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                  Developed by Microqubic AG (Switzerland), this advanced yet compact instrument enables <strong className="text-[var(--text-primary)]">multi-angle imaging</strong>, <strong className="text-[var(--text-primary)]">tilt/rotate inspection</strong>, and <strong className="text-[var(--text-primary)]">precise surface evaluation</strong> without requiring bulky conventional microscope setups.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: 'ph-arrows-out', label: 'Multi-angle imaging' },
                    { icon: 'ph-arrows-clockwise', label: 'Tilt / rotate inspection' },
                    { icon: 'ph-chart-bar', label: '3D surface profiling' },
                    { icon: 'ph-bluetooth', label: 'Bluetooth joystick control' },
                  ].map((feat) => (
                    <div key={feat.label} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                      <i className={`ph ${feat.icon} text-[var(--accent-primary)] text-base flex-shrink-0`}></i>
                      {feat.label}
                    </div>
                  ))}
                </div>
              </div>
              {/* Image placeholder — swap src once image is added */}
              <div className="bg-[var(--bg-primary)] border-l border-[var(--accent-primary)]/10 flex items-center justify-center min-h-72 lg:min-h-full">
                <div className="text-center p-10 opacity-40">
                  <i className="ph ph-microscope text-7xl text-[var(--accent-primary)] mb-4 block"></i>
                  <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                    Add image to<br />/public/assests/services/microqubic-mrcl.jpg
                  </p>
                </div>
              </div>
            </div>
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
