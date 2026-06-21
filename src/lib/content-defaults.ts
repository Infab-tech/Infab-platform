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
  // ── MEMS & Semiconductor ─────────────────────────────────────────────────
  {
    name: 'Piezoresistive MEMS Sensor Die',
    category: 'MEMS',
    imageUrl: '/assests/products/microchip.jpg',
    description:
      'Bare piezoresistive MEMS die for OEM integration. Available in bulk silicon and SOI variants with wafer-level testing, dicing, and optional hermetic packaging.',
    specs: [
      'Process: Bulk Si / SOI',
      'Testing: Wafer-level probe',
      'Packaging: Custom hermetic',
      'Wafer Size: 4" / 6"',
    ],
  },
  {
    name: 'Hall Effect Sensor IC',
    category: 'MEMS',
    description:
      'Monolithic Hall sensor IC with integrated amplifier, offset compensation, and digital SPI output. Designed for brushless DC motor commutation and high-precision position encoding.',
    specs: [
      'Range: ±100 mT',
      'Output: SPI digital',
      'Package: 2×2 mm QFN',
      'Supply: 3.3 V / 5 V',
    ],
  },
  {
    name: 'Calorimetric Thermal Flow Sensor',
    category: 'MEMS',
    description:
      'Calorimetric MEMS flow sensor with integrated heater and thermopile for differential-temperature-based sensing of gas and liquid flows at sub-sccm resolution.',
    specs: [
      'Range: 0–500 sccm',
      'Principle: Calorimetric',
      'Output: Analog 0–5 V',
      'Media: Gas & liquid',
    ],
  },
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
