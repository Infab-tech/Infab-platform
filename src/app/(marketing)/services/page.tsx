import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/supabase/prisma';
import { FALLBACK_FACILITIES, FALLBACK_SERVICE_ITEMS } from '@/lib/content-defaults';
import SiliconWafer3D from '@/components/ui/SiliconWafer3D';

export const metadata: Metadata = {
  title: 'Services | INFAB Semiconductor',
  description: 'End-to-end MEMS and microfluidics services  from concept to qualified device. Custom MEMS design, silicon micromachining, microfluidic fabrication, and cleanroom services in Bengaluru.',
};

// MEMS capabilities — matches infabsemi.com MEMS page exactly
const memsCapabilities = [
  {
    icon: 'ph-pencil-ruler',
    title: 'Custom MEMS Device Design',
    description: 'We specialise in designing MEMS devices tailored to specific application requirements from concept feasibility to tape-out-ready layouts.',
  },
  {
    icon: 'ph-cpu',
    title: 'Silicon Micromachining',
    description: 'Leveraging bulk and surface micromachining techniques to create complex 3D microstructures in silicon with high precision and repeatability.',
  },
  {
    icon: 'ph-stack',
    title: 'Thin-Film Deposition & Etching',
    description: 'Full thin film capabilities including PVD (sputtering, e-beam evaporation), PECVD, thermal oxidation, and pattern etching for metals, dielectrics, and piezoelectrics.',
  },
  {
    icon: 'ph-package',
    title: 'Wafer Bonding & Packaging',
    description: 'Anodic bonding (Si–glass), fusion bonding (Si–Si), adhesive and eutectic bonding for hermetically sealed microstructures and MEMS packaging.',
  },
  {
    icon: 'ph-flask',
    title: 'Material Versatility',
    description: 'We work with silicon, glass, quartz, SOI, SiC, polymers, and specialty substrates selecting the optimal material for your application constraints.',
  },
  {
    icon: 'ph-factory',
    title: 'Prototyping to Production',
    description: 'Streamlined process from rapid prototype to small-volume production, with design-for-manufacturability reviews at every stage.',
  },
];

// MEMS process capability cards — 3-card grid matching infabsemi.com
const memsProcesses: { icon: string; title: string; description: string; detail: string | null }[] = [
  {
    icon: 'ph-sun',
    title: 'Lithography',
    description: 'UV and deep-UV contact/proximity lithography.',
    detail: 'UV and deep-UV contact/proximity lithography with minimum feature sizes down to 2 µm on silicon, glass, quartz, SOI, and polymer substrates.',
  },
  {
    icon: 'ph-waves',
    title: 'Dry Etching',
    description: 'Bosch process DRIE for high aspect ratio silicon structures.',
    detail: 'Bosch process DRIE for high aspect ratio silicon structures. Etch depth up to 300 µm with vertical sidewalls and aspect ratios > 20:1.',
  },
  {
    icon: 'ph-drop',
    title: 'Wet Etching',
    description: 'KOH and TMAH anisotropic silicon etching, HF oxide strip, BOE, Piranha (H₂SO₄:H₂O₂), and RCA cleans.',
    detail: null,
  },
];

// Microfluidics Design Services — matches infabsemi.com
const microfluidicsDesign = [
  { icon: 'ph-pencil-ruler', title: 'Custom Micro Channel Design', description: 'Tailored microchannel architecture designed to meet specific flow, pressure, and biological requirements of your application.' },
  { icon: 'ph-chart-line-up', title: 'Simulation Driven Optimization', description: 'CFD and multiphysics simulation (COMSOL, Ansys Fluent) to optimise device performance  flow uniformity, mixing efficiency, droplet size before committing to fabrication.' },
  { icon: 'ph-test-tube', title: 'Material & Process Selection', description: 'Expert guidance on substrate selection  PDMS, glass, silicon, thermoplastics matched to your optical, chemical, and biocompatibility requirements.' },
  { icon: 'ph-timer', title: 'Rapid Prototyping', description: 'Fast design-to-device cycles using soft lithography and SU-8 mold processes. Functional prototypes delivered in weeks, not months.' },
  { icon: 'ph-gear', title: 'Design for Manufacturability', description: 'Every design is reviewed for scalability and yield. We ensure a smooth transition from research prototype to repeatable small volume production.' },
];

// Microfluidics Fabrication Services — matches infabsemi.com
const microfluidicsFabrication = [
  { icon: 'ph-drop', title: 'Soft Lithography (PDMS)', description: 'Standard PDMS based microfluidic fabrication using SU-8 master molds. Optically transparent chips suitable for fluorescence and brightfield imaging.' },
  { icon: 'ph-flask', title: 'Glass and Silicon Etching', description: 'Precision wet and dry etching of glass and silicon substrates for high resolution, chemically resistant microchannels ideal for aggressive solvents and high temperature applications.' },
  { icon: 'ph-squares-four', title: 'Polymer Microfabrication', description: 'Fabrication using thermoplastics, SU-8, and cyclic olefin copolymer (COC) for disposable, cost-effective lab-on-chip devices.' },
  { icon: 'ph-link', title: 'Hybrid Integration', description: 'Combining PDMS, glass, and silicon in a single device  bonding dissimilar materials to achieve complex multi layer microfluidic architectures.' },
];

// Microfluidic Device Showcase — real INFAB projects
const microfluidicsDevices = [
  { title: 'Silicon & SU-8 Mold', description: 'High resolution SU-8 master molds on silicon for repeatable PDMS soft lithography, enabling sub-10 µm feature sizes across multilayer designs.' },
  { title: 'Cancer-on-Chip', description: 'Multi layer organ-on-chip platform developed in collaboration with BIRAC and Manipal Hospital for cancer cell co-culture under physiological shear stress.' },
  { title: 'mRNA Chip in Glass', description: 'Herringbone micromixer fabricated in borosilicate glass for mRNA LNP synthesis  enabling precise nanoparticle size control for RNA delivery applications.' },
];

export default async function ServicesPage() {
  // Fetch from DB, fall back to hardcoded content
  let dbFacilities: { icon: string; title: string; description: string; photoUrl: string | null }[] = [];
  let dbMEMSCapabilities: { icon: string; title: string; description: string }[] = [];
  let dbMEMSProcesses: { icon: string; title: string; description: string; detail: string | null }[] = [];
  let dbMicroDesign: { icon: string; title: string; description: string }[] = [];
  let dbMicroFab: { icon: string; title: string; description: string }[] = [];
  let dbMicroDevices: { title: string; description: string }[] = [];

  try {
    const [facItems, svcItems] = await Promise.all([
      prisma.facilityItem.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
      prisma.serviceItem.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
    ]);
    if (facItems.length > 0) dbFacilities = facItems;
    const byCat = (cat: string) => svcItems.filter((s) => s.category === cat);
    if (byCat('mems-capability').length > 0) dbMEMSCapabilities = byCat('mems-capability');
    if (byCat('mems-process').length > 0) dbMEMSProcesses = byCat('mems-process');
    if (byCat('micro-design').length > 0) dbMicroDesign = byCat('micro-design');
    if (byCat('micro-fab').length > 0) dbMicroFab = byCat('micro-fab');
    if (byCat('micro-device').length > 0) dbMicroDevices = byCat('micro-device');
  } catch (error) {
    console.error("Error fetching services data from Prisma:", error);
  }

  const activeFacilities = dbFacilities.length > 0 ? dbFacilities : FALLBACK_FACILITIES.map((f) => ({ ...f, photoUrl: f.photoUrl ?? null }));
  const activeCapabilities = dbMEMSCapabilities.length > 0 ? dbMEMSCapabilities : memsCapabilities;
  const activeProcesses = dbMEMSProcesses.length > 0 ? dbMEMSProcesses : memsProcesses;
  const activeDesign = dbMicroDesign.length > 0 ? dbMicroDesign : microfluidicsDesign;
  const activeFab = dbMicroFab.length > 0 ? dbMicroFab : microfluidicsFabrication;
  const activeDevices = dbMicroDevices.length > 0 ? dbMicroDevices : microfluidicsDevices;
  return (
    <div className="bg-[var(--bg-primary)]">

      {/* Page Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">What We Do</span>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight max-w-3xl">Services</h1>
              <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                End-to-end MEMS and microfluidics services from concept to qualified device. Custom design, fabrication, characterisation, and packaging under one roof in Bengaluru.
              </p>
            </div>
            <div>
              <SiliconWafer3D />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Tab Navigation */}
      <div className="sticky top-20 z-40 w-full border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
            <a href="#mems" className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-bold text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-colors">
              MEMS
            </a>
            <a href="#microfluidics" className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-bold text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-colors">
              Microfluidics
            </a>
            <a href="#facilities" className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-bold text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-colors">
              Facilities
            </a>
          </nav>
        </div>
      </div>

      {/* ── MEMS Fabrication Services ──────────────────────────────────────── */}
      <div id="mems" className="border-b border-[var(--border-primary)] py-32 bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-16">
            <div>
              <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Service 01</span>
              <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">MEMS Fabrication Services</h2>
              <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                From concept to qualified device INFAB offers end-to-end MEMS design and fabrication services backed by cleanroom capabilities in Bengaluru. Our team supports research institutions and industrial OEMs through the complete MEMS development lifecycle.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-[var(--accent-primary)]/20 bg-[var(--bg-primary)] p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--accent-primary)] mb-3">Engagement Model</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-2">
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

          {/* 6 capability cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {activeCapabilities.map((cap) => (
              <div key={cap.title} className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center mb-5">
                  <i className={`ph ${cap.icon} text-xl text-[var(--accent-primary)]`}></i>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">{cap.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>

          {/* 3 process cards */}
          <div className="pt-10 border-t border-[var(--border-primary)]">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--accent-primary)] mb-6">Core Process Capabilities</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeProcesses.map((p) => (
                <div key={p.title} className="flex gap-5 items-start rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] p-6 transition-all duration-300 hover:border-[var(--accent-primary)]/40">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center">
                    <i className={`ph ${p.icon} text-lg text-[var(--accent-primary)]`}></i>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{p.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{p.detail || p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Microfluidics Solution ─────────────────────────────────────────── */}
      <div id="microfluidics" className="border-b border-[var(--border-primary)] py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section header */}
          <div className="mb-16 max-w-3xl">
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Service 02</span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">Microfluidics Solution</h2>
            <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              We bring your microfluidic concepts to life through advanced cleanroom fabrication, combining silicon, glass, and polymer processing under one roof. From initial design to final packaged chip, INFAB handles the complete development cycle.
            </p>
          </div>

          {/* Design Services */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Design Services</h3>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeDesign.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-xl hover:shadow-[var(--accent-primary)]/5">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center mb-5">
                    <i className={`ph ${item.icon} text-xl text-[var(--accent-primary)]`}></i>
                  </div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">{item.title}</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fabrication Services */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Fabrication Services</h3>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeFab.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-xl hover:shadow-[var(--accent-primary)]/5">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center mb-5">
                    <i className={`ph ${item.icon} text-xl text-[var(--accent-primary)]`}></i>
                  </div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">{item.title}</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Microfluidic Devices Showcase */}
          <div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Microfluidic Devices</h3>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeDevices.map((dev) => (
                <div key={dev.title} className="rounded-2xl border border-[var(--accent-primary)]/20 bg-[var(--bg-secondary)] p-8 hover:border-[var(--accent-primary)]/40 transition-colors">
                  <h4 className="text-base font-bold text-[var(--text-primary)] mb-3">{dev.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{dev.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/contact" className="inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wider text-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-colors">
                Request a Quote <i className="ph ph-arrow-right"></i>
              </Link>
            </div>
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
            {activeFacilities.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
                <div className="aspect-[4/3] w-full overflow-hidden border-b border-[var(--border-primary)] bg-[var(--bg-primary)] flex items-center justify-center relative bg-black/5 dark:bg-white/5">
                  {f.photoUrl ? (
                    <Image src={f.photoUrl} alt={f.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <i className={`ph ${f.icon} text-6xl text-[var(--accent-primary)]/20`}></i>
                  )}
                </div>
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
                      <div className="h-52 relative border-b border-[var(--border-primary)] bg-[var(--bg-primary)]">
                        <Image src="/assests/services/mjb4.png" alt="Karl Süss MJB4 Mask Aligner" fill sizes="(max-width: 768px) 100vw, 480px" className="object-contain p-4" />
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
                      <div className="h-52 relative border-b border-[var(--border-primary)] bg-[var(--bg-primary)]">
                        <Image src="/assests/services/evg620.jpg" alt="EVG620 Mask Aligner" fill sizes="(max-width: 768px) 100vw, 480px" className="object-contain p-4" />
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
                      <div className="h-52 relative border-b border-[var(--border-primary)] bg-[var(--bg-primary)]">
                        <Image src="/assests/services/drie.jpg" alt="DRIE System" fill sizes="(max-width: 768px) 100vw, 480px" className="object-contain p-4" />
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
                      <div className="h-52 relative border-b border-[var(--border-primary)] bg-[var(--bg-primary)]">
                        <Image src="/assests/services/asher.png" alt="Plasma Asher" fill sizes="(max-width: 768px) 100vw, 480px" className="object-contain p-4" />
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
                      <div className="h-52 relative border-b border-[var(--border-primary)] bg-[var(--bg-primary)]">
                        <Image src="/assests/services/spincoater.jpg" alt="Spin Coater" fill sizes="(max-width: 768px) 100vw, 480px" className="object-contain p-4" />
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
                      <div className="h-52 relative border-b border-[var(--border-primary)] bg-[var(--bg-primary)]">
                        <Image src="/assests/services/evg-bonder.jpg" alt="EVG Wafer Bonder" fill sizes="(max-width: 768px) 100vw, 480px" className="object-contain p-4" />
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
                      <div className="h-52 relative border-b border-[var(--border-primary)] bg-[var(--bg-primary)]">
                        <Image src="/assests/services/dektakxt.jpg" alt="Bruker DektakXT Profilometer" fill sizes="(max-width: 768px) 100vw, 480px" className="object-contain p-4" />
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
                    <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] overflow-hidden">
                      <div className="h-52 relative border-b border-[var(--border-primary)] bg-[var(--bg-secondary)] flex items-center justify-center">
                        <i className="ph ph-scan text-5xl text-[var(--text-secondary)] opacity-50"></i>
                      </div>
                      <div className="p-5">
                        <h5 className="font-bold text-[var(--text-primary)] mb-1">KMOS Ultra Scan</h5>
                        <ul className="text-xs text-[var(--text-secondary)] space-y-1 mt-2">
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>High-resolution curvature & wafer bow mapping</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>2D/3D thin film stress measurement</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Precise surface tilt & absolute reflectance</li>
                          <li className="flex items-center gap-2"><i className="ph ph-check text-[var(--accent-primary)]"></i>Programmable X-Y laser scanning array</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </details>

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
