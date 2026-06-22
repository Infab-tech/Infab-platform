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
  { name: 'Muthuraman Swaminathan', title: 'Founder & CEO', section: 'FOUNDER', order: 1, photoUrl: '/team/1.jpg', bio: "Driving INFAB's mission to create a bridge between fundamental research and industrial deployment through cutting-edge MEMS and microfluidic innovation. Incubated at CeNSE, IISc Bangalore." },
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
  { name: 'Jobin Vijay', title: 'Hardware Design Consultant', section: 'CONSULTANTS', order: 2, photoUrl: '/team/9.jpg', bio: 'External hardware design consultant supporting schematic, PCB, and system-level design reviews.' },
  { name: 'Rahul Sharma', title: 'Finance Consultant', section: 'CONSULTANTS', order: 3, photoUrl: '/team/10.jpg', bio: 'Financial strategy and startup finance advisor, supporting fundraising, grants, and investor relations.' },
  // BUSINESS
  { name: 'Dilip Kamat', title: 'Business Development', section: 'BUSINESS', order: 1, photoUrl: '/team/11.jpg', bio: 'Leads B2B sales, strategic partnerships, and market development for aerospace and healthcare verticals.' },
  { name: 'Rajita M', title: 'Administration', section: 'BUSINESS', order: 2, photoUrl: '/team/12.jpg', bio: 'Handles administrative operations, procurement, and office coordination across INFAB\'s facilities.' },
  { name: 'Priyanka K C', title: 'Administration', section: 'BUSINESS', order: 3, photoUrl: '/team/13.jpg', bio: 'Supports day-to-day administrative functions and organisational workflows.' },
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
      "INFAB Semiconductor featured in Digitimes, sharing insights on the rapidly growing Indian MEMS market. The article covers our view on domestic semiconductor manufacturing opportunities, the role of IISc incubation, and India's path to MEMS self-reliance.",
    category: 'Research & Papers',
    link: 'https://www.digitimes.com/news/a20230328VL205/ic-manufacturing-india-mems-startup.html',
    publishedAt: new Date('2025-09-05'),
  },
  {
    title: "INFAB Semiconductor — IISc Spinoff Advancing India's Semiconductor Manufacturing",
    description:
      'A feature on INFAB Semiconductor as a spinoff from the Indian Institute of Science, highlighting our journey from cleanroom research at CeNSE to commercial MEMS sensor manufacturing for aerospace, healthcare, and semiconductor applications.',
    category: 'Partnerships & MoUs',
    link: null,
    publishedAt: new Date('2025-09-05'),
  },
  {
    title: "INFAB: Powering India's Deep-Tech Future from the Inside Out",
    description:
      "YourStory profiles INFAB Semiconductor's mission to build world-class MEMS technology in India. The piece covers our founding story at IISc CeNSE, our product portfolio spanning aerospace and microfluidics, and the vision behind making India a global MEMS hub.",
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
    body: 'Quality Management System',
    order: 1,
  },
  {
    title: 'AS 9100D',
    body: 'Aerospace Quality Management',
    order: 2,
  },
  {
    title: 'IISc CeNSE Incubatee',
    body: 'Indian Institute of Science',
    order: 3,
  },
  {
    title: 'BIRAC Collaboration',
    body: 'Biotechnology Industry Research Assistance Council',
    order: 4,
  },
];
