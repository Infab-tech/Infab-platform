/**
 * Canonical default content for the public site.
 *
 * These arrays are the single source of truth for both:
 *   1. The frontend fallback (shown when the DB has no rows yet)
 *   2. The admin "Seed Defaults" action that populates the DB for the first time
 *
 * Once seeded, the DB owns the data and any admin edits override these values.
 */

export interface DefaultProduct {
  name: string;
  category: string;
  description: string;
  specs: string[];
  imageUrl?: string;
  datasheetUrl?: string;
  drawingUrl?: string;
  cadFileUrls?: string[];
}

export const FALLBACK_PRODUCTS: DefaultProduct[] = [
  // ── Aerospace ────────────────────────────────────────────────────────────
  {
    name: 'ISPLPS001 — Pressure Switch',
    category: 'AEROSPACE',
    imageUrl: '/assests/products/pressure-switch.png',
    description:
      'MIL-grade silicon piezoresistive pressure switch for aircraft hydraulic, fuel, and pneumatic systems. Designed to meet the most demanding airborne qualification requirements.',
    specs: [
      'Rated WP: 100–300 ±14 bar',
      'Proof Pressure: 420 bar',
      'Burst Pressure: 700 bar',
      'Supply: 16–32 V DC',
      'Op. Temp: -54°C to +135°C',
      'Termination: Circular Connector',
    ],
  },
  {
    name: 'ISPLPT001 — Pressure Transducer',
    category: 'AEROSPACE',
    imageUrl: '/assests/products/pressure-transducer.png',
    description:
      'High-accuracy MIL-grade MEMS pressure transducer with integrated signal conditioning for aircraft environmental control, cabin pressure, and pneumatic systems.',
    specs: [
      'Rated WP: 100–300 ±14 bar',
      'Proof Pressure: 420 bar',
      'Burst Pressure: 700 bar',
      'Supply: 16–32 V DC',
      'Op. Temp: -54°C to +135°C',
      'Termination: Circular Connector',
    ],
  },
  {
    name: 'ISPLDPS001 — Differential Pressure Switch',
    category: 'AEROSPACE',
    imageUrl: '/assests/products/dps.png',
    description:
      'Precision differential pressure switch for fuel filter monitoring, hydraulic line balance, and airflow measurement in commercial and military aircraft.',
    specs: [
      'Rated WP: 0–350 kPa',
      'Proof Pressure: 700 kPa',
      'Burst Pressure: 1050 kPa',
      'Supply: 16–32 V DC',
      'Op. Temp: -55°C to +95°C',
      'Termination: Circular Connector',
    ],
  },
  {
    name: 'MEMS Flow Transmitters',
    category: 'AEROSPACE',
    description:
      'Thermal MEMS flow transmitters for precision airflow measurement in ventilation, environmental control, and propulsion test systems with industry-leading dynamic range.',
    specs: [
      'Technology: Thermal MEMS',
      'Output: 4–20 mA',
      'Protection: IP67',
      'Interface: RS-485 / Modbus',
    ],
  },
  {
    name: 'Hall Effect Sensors',
    category: 'AEROSPACE',
    description:
      'Contactless Hall effect sensors for position, speed, and current sensing in landing gear, flight control actuators, and engine management systems.',
    specs: [
      'Range: ±100 mT',
      'Type: Linear & rotary',
      'Supply: 3.3–5 V',
      'Output: Analog / PWM',
    ],
  },
  {
    name: 'Custom Aerospace Sensor Modules',
    category: 'AEROSPACE',
    description:
      'Bespoke integrated sensor modules for OEM and Tier-1 aircraft manufacturers requiring multi-parameter sensing with onboard signal processing and MIL-qualified packaging.',
    specs: [
      'Standard: DO-160G / MIL-STD-810',
      'Type: Multi-parameter',
      'Interface: Custom OEM',
      'Qualification: AS9100 Rev D',
    ],
  },
  // ── Healthcare & Microfluidics ────────────────────────────────────────────
  {
    name: 'ISPLHTPT001 — Pressure Transducer',
    category: 'HEALTHCARE',
    imageUrl: '/assests/products/htpt.png',
    description:
      'Low-pressure MEMS transducer purpose-built for medical and microfluidic applications. Wide operating temperature range makes it suitable for sterilisable and implantable contexts.',
    specs: [
      'Rated WP: 0–29 psi (Gauge)',
      'Proof Pressure: 43.5 PSI',
      'Burst Pressure: 72.5 PSI',
      'Supply: 16–32 V DC',
      'Output: 0.5–5 V DC',
      'Op. Temp: -40°C to +180°C',
    ],
  },
  {
    name: 'ISPLPS002 — Microfluidic Pressure Controller',
    category: 'HEALTHCARE',
    description:
      'Ultra-low-pressure controller for precise flow regulation in microfluidic networks. Sub-millibar resolution enables reliable droplet generation, particle sorting, and organ-on-chip perfusion.',
    specs: [
      'Pressure Range: 0–1000 mbar',
      'Resolution: ±0.01 mbar',
      'Interface: USB / RS-232',
      'Channels: Up to 8',
    ],
  },
  {
    name: 'Microfluidic Chips (PDMS / Glass)',
    category: 'HEALTHCARE',
    imageUrl: '/assests/products/mf-chip.jpg',
    description:
      'Single- and multi-layer microfluidic chips for cell culture, organ-on-chip, and lab-on-chip applications. Optically transparent for live fluorescence and brightfield imaging.',
    specs: [
      'Material: PDMS / Glass / Si',
      'Channel Width: 20–500 µm',
      'Compatibility: Biocompatible',
      'Bonding: Plasma / Anodic',
    ],
  },
  {
    name: 'Droplet Generation Chips',
    category: 'HEALTHCARE',
    imageUrl: '/assests/products/hexagon-well.jpg',
    description:
      'Silicon-glass chips with T-junction and flow-focusing geometries for monodisperse droplet production. Ideal for digital PCR, drug encapsulation, and single-cell assays.',
    specs: [
      'Material: Silicon / Glass',
      'Geometry: T-junction & FF',
      'Droplet Rate: 1–1000 Hz',
      'Compatibility: Aqueous & organic',
    ],
  },
  {
    name: 'Organ-on-Chip Platform',
    category: 'HEALTHCARE',
    imageUrl: '/assests/services/cancer-on-chip.png',
    description:
      'Multi-layer microfluidic organ-on-chip platforms with integrated membrane for physiological co-culture of epithelial and endothelial cells under controlled shear stress.',
    specs: [
      'Layers: Multi-layer PDMS',
      'Membrane: 10 µm porous PDMS',
      'Imaging: Live fluorescence',
      'Shear: Tunable 0.01–1 Pa',
    ],
  },
  {
    name: 'Nanoparticle Synthesis Chips',
    category: 'HEALTHCARE',
    description:
      'Continuous-flow microfluidic reactors for size-controlled synthesis of lipid nanoparticles (LNP) and polymeric nanoparticles for mRNA delivery and drug encapsulation.',
    specs: [
      'Flow Regime: Continuous flow',
      'Applications: LNP / mRNA / Drug',
      'NP Size Control: 20–500 nm',
      'Throughput: µL to mL/min',
    ],
  },

];

export interface DefaultTeamMember {
  name: string;
  title: string;
  bio?: string;
  section: string;
  photoUrl?: string;
  order: number;
}

export const FALLBACK_TEAM: DefaultTeamMember[] = [
  // FOUNDER
  { name: 'Muthuraman Swaminathan', title: 'Founder & CEO', section: 'FOUNDER', order: 1, photoUrl: '/team/1.jpg', bio: "Driving INFAB's mission to bridge research and industrial deployment in MEMS and microfluidics. Incubated at INCeNSE, Bengaluru." },
  // RESEARCH
  { name: 'Dr. Mohammed Yosuff Caffiyar', title: 'Principal Scientist', section: 'RESEARCH', order: 1, photoUrl: '/team/2.jpg', bio: "Leads core MEMS device science, sensor physics, and process development at INFAB's cleanroom facilities." },
  { name: 'Dr. Saara K', title: 'Research Director', section: 'RESEARCH', order: 2, photoUrl: '/team/3.jpg', bio: 'Directs research programmes across MEMS sensor architectures and microfluidic platform development.' },
  // ENGINEERING
  { name: 'Prem A', title: 'Sr. Design Engineer', section: 'ENGINEERING', order: 1, photoUrl: '/team/4.jpg', bio: 'Senior MEMS and sensor design engineer with hands-on experience in layout, simulation, and device qualification.' },
  { name: 'Amos Heeber', title: 'Design Engineer', section: 'ENGINEERING', order: 2, photoUrl: '/team/5.jpg', bio: 'Design engineer focused on MEMS device architecture, mask layout, and hardware integration.' },
  { name: 'Ragin Raj K', title: 'Hardware Designer', section: 'ENGINEERING', order: 3, photoUrl: '/team/6.jpg', bio: 'Hardware and electronics designer responsible for sensor readout circuits and system integration.' },
  { name: 'Stephen N S', title: 'Project Coordinator', section: 'ENGINEERING', order: 4, photoUrl: '/team/7.jpg', bio: 'Coordinates cross-functional engineering projects, timelines, and customer deliverables.' },
  // CONSULTANTS
  { name: 'Dr. Kashyap Dhruv', title: 'Software Consultant', section: 'CONSULTANTS', order: 1, photoUrl: '/team/8.jpg', bio: 'Advises on embedded firmware, data acquisition systems, and software toolchain for MEMS product lines.' },
  { name: 'Jobin Vijay', title: 'Hardware Design Consultant', section: 'CONSULTANTS', order: 2, bio: 'External hardware design consultant supporting schematic, PCB, and system-level design reviews.' },
  { name: 'Rahul Sharma', title: 'Finance Consultant', section: 'CONSULTANTS', order: 3, photoUrl: '/team/10.jpg', bio: 'Financial strategy and startup finance advisor, supporting fundraising, grants, and investor relations.' },
  // BUSINESS
  { name: 'Dilip Kamat', title: 'Business Development', section: 'BUSINESS', order: 1, photoUrl: '/team/11.jpg', bio: 'Leads B2B sales, strategic partnerships, and market development for aerospace and healthcare verticals.' },
  { name: 'Rajita M', title: 'Administration', section: 'BUSINESS', order: 2, bio: 'Handles administrative operations, procurement, and office coordination across INFAB\'s facilities.' },
  { name: 'Priyanka K C', title: 'Administration', section: 'BUSINESS', order: 3, bio: 'Supports day-to-day administrative functions and organisational workflows.' },
];

export interface DefaultNewsArticle {
  title: string;
  description: string;
  category: string;
  link: string | null;
  publishedAt: Date;
}

export const FALLBACK_NEWS: DefaultNewsArticle[] = [
  {
    title: 'Meet Us @ electronica India 2025',
    description:
      "INFAB Semiconductor will be exhibiting at electronica India 2025, one of South Asia's premier trade fairs for electronics and sensor technologies. Visit our booth to see our latest MEMS pressure sensors and microfluidic platforms in action.",
    category: 'Events & Conferences',
    link: 'https://electronica-india.com/en/trade-fair/',
    publishedAt: new Date('2025-09-05'),
  },
  {
    title: 'GRAND CHALLENGE Winner',
    description:
      "INFAB Semiconductor won the Grand Challenge award, recognising our breakthrough work in indigenous MEMS sensor development. The award was presented through the IIoT Sensors platform, acknowledging our contributions to India's deep-tech ecosystem.",
    category: 'Awards & Recognition',
    link: 'https://www.iiotsensors.org/grant-challenge-results',
    publishedAt: new Date('2025-09-05'),
  },
  {
    title: 'Indian MEMS Startup INFAB Shares Perspective on Surging Domestic Market',
    description:
      "INFAB Semiconductor featured in Digitimes, sharing insights on the rapidly growing Indian MEMS market. The article covers our view on domestic semiconductor manufacturing opportunities and India's path to MEMS self-reliance.",
    category: 'Research & Papers',
    link: 'https://www.digitimes.com/news/a20230328VL205/ic-manufacturing-india-mems-startup.html',
    publishedAt: new Date('2025-09-05'),
  },
  {
    title: "INFAB Semiconductor — Advancing India's MEMS and Semiconductor Manufacturing",
    description:
      'A feature on INFAB Semiconductor, highlighting the journey from cleanroom research at INCeNSE to commercial MEMS sensor manufacturing for aerospace, healthcare, and semiconductor applications.',
    category: 'Partnerships & MoUs',
    link: null,
    publishedAt: new Date('2025-09-05'),
  },
  {
    title: "INFAB: Powering India's Deep-Tech Future from the Inside Out",
    description:
      "YourStory profiles INFAB Semiconductor's mission to build MEMS technology in India. The piece covers our founding story at INCeNSE, our product portfolio spanning aerospace and microfluidics, and the vision behind making India a global MEMS hub.",
    category: 'Research & Papers',
    link: 'https://yourstory.com/2025/08/infab-semiconductor-mems-innovation',
    publishedAt: new Date('2025-08-01'),
  },
];

export interface DefaultRecognition {
  title: string;
  body: string;
  certNumber?: string;
  issuer?: string;
  logoUrl?: string;
  order: number;
}

export const FALLBACK_RECOGNITIONS: DefaultRecognition[] = [
  {
    title: 'ISO 9001:2015',
    body: 'Certified Quality Management System — ensuring consistent, high-quality products and services meeting customer and regulatory requirements.',
    issuer: 'Bureau Veritas',
    order: 1,
  },
  {
    title: 'AS 9100D',
    body: 'Aerospace Quality Management System certification — the international standard for quality in aviation, space, and defence manufacturing.',
    issuer: 'Bureau Veritas',
    order: 2,
  },
  {
    title: 'INCeNSE Incubated',
    body: 'Incubated at INCeNSE — the deep-tech incubator at the Centre for Nano Science and Engineering, Bengaluru. One of India\'s premier MEMS and semiconductor incubation programmes.',
    issuer: 'INCeNSE, Bengaluru',
    order: 3,
  },
  {
    title: 'BIRAC Collaboration',
    body: 'Supported by the Biotechnology Industry Research Assistance Council (BIRAC) for the development of organ-on-chip microfluidic platforms.',
    issuer: 'Dept. of Biotechnology, Govt. of India',
    order: 4,
  },
];

// ── FACILITIES ────────────────────────────────────────────────────────────────

export interface DefaultFacilityItem {
  icon: string;
  title: string;
  description: string;
  photoUrl?: string;
  isFeatured?: boolean;
  order: number;
}

export const FALLBACK_FACILITIES: DefaultFacilityItem[] = [
  { icon: 'ph-magnifying-glass', title: 'Characterisation Lab', description: 'Full suite of surface, electrical, and optical characterisation equipment including SEM, AFM, profilometer, C-V and I-V measurement stations.', photoUrl: '/assests/services/dektakxt.jpg', order: 1 },
  { icon: 'ph-waves', title: 'Deep Reactive Ion Etch (DRIE)', description: 'Bosch-process DRIE chamber for high-aspect-ratio silicon structures. Etch depth up to 300 µm with vertical sidewalls and tight CD control.', photoUrl: '/assests/services/drie.jpg', order: 2 },
  { icon: 'ph-sun', title: 'Lithography Tools', description: 'MJB4 & EVG620 mask aligners for UV and deep-UV lithography with feature sizes down to 2 µm on silicon, glass, and polymer substrates.', photoUrl: '/assests/services/mjb4.png', order: 3 },
  { icon: 'ph-drop', title: 'Microfluidics Lab', description: 'Dedicated PDMS fabrication, spin coating, and soft lithography equipment. UV curing station, plasma bonding, and fluidic testing benches.', photoUrl: '/assests/services/spincoater.jpg', order: 4 },
  { icon: 'ph-flask', title: 'Inhouse Testing Facilities', description: 'On-site device testing for electrical, mechanical, and fluidic performance validation. Rapid turnaround for design-test-iterate cycles without leaving the facility.', order: 5 },
  { icon: 'ph-printer', title: '3D Printing', description: 'Rapid prototyping with high-resolution 3D printing for jigs, fixtures, and custom microfluidic housings to accelerate device packaging and testing.', order: 6 },
  { icon: 'ph-magnifying-glass-plus', title: 'Microqubic 2D/3D Imaging System', description: 'High-resolution modular microscope system for multi-angle imaging, tilt/rotate inspection, and 3D surface profiling of MEMS and microfluidics.', photoUrl: '/assests/services/MICROQUBIC-MRCL.jpg', order: 7 },
  { icon: 'ph-gauge', title: 'Dead Weight Tester', description: 'High-precision pressure calibration standard using calibrated weights to apply known pressures for sensor verification and transducer testing.', photoUrl: '/assests/services/Dead weight tester.jpeg', order: 8 },
];

// ── SERVICE ITEMS ─────────────────────────────────────────────────────────────

export interface DefaultServiceItem {
  category: string;
  icon: string;
  title: string;
  description: string;
  detail?: string;
  order: number;
}

export const FALLBACK_SERVICE_ITEMS: DefaultServiceItem[] = [
  // MEMS Capabilities
  { category: 'mems-capability', icon: 'ph-pencil-ruler', title: 'Custom MEMS Device Design', description: 'We specialise in designing MEMS devices tailored to specific application requirements — from concept feasibility to tape-out-ready layouts.', order: 1 },
  { category: 'mems-capability', icon: 'ph-cpu', title: 'Silicon Micromachining', description: 'Leveraging bulk and surface micromachining techniques to create complex 3D microstructures in silicon with high precision and repeatability.', order: 2 },
  { category: 'mems-capability', icon: 'ph-stack', title: 'Thin-Film Deposition & Etching', description: 'Full thin-film capabilities including PVD (sputtering, e-beam evaporation), PECVD, thermal oxidation, and pattern etching for metals, dielectrics, and piezoelectrics.', order: 3 },
  { category: 'mems-capability', icon: 'ph-package', title: 'Wafer Bonding & Packaging', description: 'Anodic bonding (Si–glass), fusion bonding (Si–Si), adhesive and eutectic bonding for hermetically sealed microstructures and MEMS packaging.', order: 4 },
  { category: 'mems-capability', icon: 'ph-flask', title: 'Material Versatility', description: 'We work with silicon, glass, quartz, SOI, SiC, polymers, and specialty substrates — selecting the optimal material for your application constraints.', order: 5 },
  { category: 'mems-capability', icon: 'ph-factory', title: 'Prototyping to Production', description: 'Streamlined process from rapid prototype to small-volume production, with design-for-manufacturability reviews at every stage.', order: 6 },
  // MEMS Processes
  { category: 'mems-process', icon: 'ph-waves', title: 'Dry Etching', description: 'Bosch-process DRIE for high-aspect-ratio silicon structures.', detail: 'Etch depth up to 300 µm with vertical sidewalls and aspect ratios > 20:1.', order: 1 },
  { category: 'mems-process', icon: 'ph-drop', title: 'Wet Etching', description: 'KOH and TMAH anisotropic silicon etching, HF oxide strip, BOE, Piranha (H₂SO₄:H₂O₂), and RCA cleans.', order: 2 },
  { category: 'mems-process', icon: 'ph-sun', title: 'Lithography', description: 'UV and deep-UV contact/proximity lithography.', detail: 'Minimum feature sizes down to 2 µm on silicon, glass, quartz, SOI, and polymer substrates.', order: 3 },
  // Microfluidics Design
  { category: 'micro-design', icon: 'ph-pencil-ruler', title: 'Custom Micro-Channel Design', description: 'Tailored microchannel architecture designed to meet specific flow, pressure, and biological requirements of your application.', order: 1 },
  { category: 'micro-design', icon: 'ph-chart-line-up', title: 'Simulation-Driven Optimization', description: 'CFD and multiphysics simulation (COMSOL, Ansys Fluent) to optimise device performance before committing to fabrication.', order: 2 },
  { category: 'micro-design', icon: 'ph-test-tube', title: 'Material & Process Selection', description: 'Expert guidance on substrate selection — PDMS, glass, silicon, thermoplastics — matched to your optical, chemical, and biocompatibility requirements.', order: 3 },
  { category: 'micro-design', icon: 'ph-timer', title: 'Rapid Prototyping', description: 'Fast design-to-device cycles using soft lithography and SU-8 mold processes. Functional prototypes delivered in weeks, not months.', order: 4 },
  { category: 'micro-design', icon: 'ph-gear', title: 'Design for Manufacturability', description: 'Every design is reviewed for scalability and yield. We ensure a smooth transition from research prototype to repeatable small-volume production.', order: 5 },
  // Microfluidics Fabrication
  { category: 'micro-fab', icon: 'ph-drop', title: 'Soft Lithography (PDMS)', description: 'Standard PDMS-based microfluidic fabrication using SU-8 master molds. Optically transparent chips suitable for fluorescence and brightfield imaging.', order: 1 },
  { category: 'micro-fab', icon: 'ph-flask', title: 'Glass and Silicon Etching', description: 'Precision wet and dry etching of glass and silicon substrates for high-resolution, chemically resistant microchannels.', order: 2 },
  { category: 'micro-fab', icon: 'ph-squares-four', title: 'Polymer Microfabrication', description: 'Fabrication using thermoplastics, SU-8, and cyclic olefin copolymer (COC) for disposable, cost-effective lab-on-chip devices.', order: 3 },
  { category: 'micro-fab', icon: 'ph-link', title: 'Hybrid Integration', description: 'Combining PDMS, glass, and silicon in a single device — bonding dissimilar materials to achieve complex multi-layer microfluidic architectures.', order: 4 },
  // Microfluidics Devices
  { category: 'micro-device', icon: 'ph-circles-three', title: 'Silicon & SU-8 Mold', description: 'High-resolution SU-8 master molds on silicon for repeatable PDMS soft lithography, enabling sub-10 µm feature sizes across multilayer designs.', order: 1 },
  { category: 'micro-device', icon: 'ph-cell-signal-full', title: 'Cancer-on-Chip', description: 'Multi-layer organ-on-chip platform developed in collaboration with BIRAC and Manipal Hospital for cancer cell co-culture under physiological shear stress.', order: 2 },
  { category: 'micro-device', icon: 'ph-dna', title: 'mRNA Chip in Glass', description: 'Herringbone micromixer fabricated in borosilicate glass for mRNA-LNP synthesis — enabling precise nanoparticle size control for RNA delivery applications.', order: 3 },
];
