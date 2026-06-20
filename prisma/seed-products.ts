import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  // ── Aerospace ──────────────────────────────────────────────────────────────
  {
    name: 'SP Series — Pressure Sensors',
    slug: 'sp-series-pressure-sensors',
    category: 'AEROSPACE',
    description: 'Silicon piezoresistive pressure sensors designed for aviation altimetry and atmospheric sensing. Exceptional thermal stability and long-term reliability.',
    specs: ['0–1000 mbar', 'Piezoresistive', 'Silicon', 'MIL-Spec'],
    isActive: true,
  },
  {
    name: 'TP Series — Pressure Transducers',
    slug: 'tp-series-pressure-transducers',
    category: 'AEROSPACE',
    description: 'High-accuracy MEMS-based pressure transducers with integrated signal conditioning for aircraft environmental control and pneumatic systems.',
    specs: ['0–700 bar', 'Capacitive', 'SOI', 'AEC-Q100'],
    isActive: true,
  },
  {
    name: 'Differential Pressure Switches',
    slug: 'differential-pressure-switches',
    category: 'AEROSPACE',
    description: 'Precision differential pressure switches for fuel, hydraulic, and pneumatic systems. Redundant design with fail-safe operation for safety-critical applications.',
    specs: ['Differential', 'Snap-action', '-55°C to +125°C'],
    isActive: true,
  },
  {
    name: 'Flow Transmitters',
    slug: 'flow-transmitters',
    category: 'AEROSPACE',
    description: 'MEMS thermal flow transmitters for airflow measurement in ventilation, environmental control, and propulsion test systems with exceptional dynamic range.',
    specs: ['Thermal MEMS', '4–20 mA output', 'IP67'],
    isActive: true,
  },
  {
    name: 'Hall Effect Sensors',
    slug: 'hall-effect-sensors',
    category: 'AEROSPACE',
    description: 'Contactless Hall effect sensors for position, speed, and current sensing in landing gear, flight control actuators, and engine management systems.',
    specs: ['Contactless', 'Linear & rotary', '3.3–5V supply'],
    isActive: true,
  },
  {
    name: 'Custom Aerospace Modules',
    slug: 'custom-aerospace-modules',
    category: 'AEROSPACE',
    description: 'Bespoke integrated sensor modules for OEM and Tier-1 aircraft manufacturers requiring multi-parameter sensing with onboard signal processing.',
    specs: ['Custom OEM', 'Multi-parameter', 'DO-160G'],
    isActive: true,
  },

  // ── Healthcare ─────────────────────────────────────────────────────────────
  {
    name: 'ISPLPS001 — Microfluidic Chip',
    slug: 'isplps001-microfluidic-chip',
    category: 'HEALTHCARE',
    description: 'Single-layer PDMS microfluidic chip for cell culture and organ-on-chip applications. Optical transparency for live imaging compatibility.',
    specs: ['PDMS/Glass', 'Channel: 100µm', 'Biocompatible'],
    isActive: true,
  },
  {
    name: 'ISPLPS002 — Pressure Controller',
    slug: 'isplps002-pressure-controller',
    category: 'HEALTHCARE',
    description: 'Ultra-low-pressure controller for precise flow regulation in microfluidic networks. Sub-millibar resolution for droplet generation and particle sorting.',
    specs: ['0–1000 mbar', '±0.01 mbar res.', 'USB control'],
    isActive: true,
  },
  {
    name: 'ISPLHTPT001 — Flow Sensor',
    slug: 'isplhtpt001-flow-sensor',
    category: 'HEALTHCARE',
    description: 'Thermal MEMS flow sensor for precise liquid flow measurement in microfluidic systems, infusion pumps, and lab-on-chip platforms.',
    specs: ['0–5 mL/min', 'Thermal MEMS', 'I²C / SPI'],
    isActive: true,
  },
  {
    name: 'ISPLDPS001 — Droplet Generator',
    slug: 'ispldps001-droplet-generator',
    category: 'HEALTHCARE',
    description: 'Silicon-glass droplet generation chip with T-junction and flow-focusing geometries. Compatible with aqueous and organic solvents for emulsification.',
    specs: ['Silicon/Glass', 'T-junction', '1–1000 Hz'],
    isActive: true,
  },
  {
    name: 'Organ-on-Chip Platform',
    slug: 'organ-on-chip-platform',
    category: 'HEALTHCARE',
    description: 'Multi-layer microfluidic organ-on-chip platforms with integrated membrane for co-culture of epithelial and endothelial cells under physiological shear stress.',
    specs: ['Multi-layer', 'PDMS membrane', 'Live imaging'],
    isActive: true,
  },
  {
    name: 'ISPLPT001 — Nanoparticle Synthesis Chip',
    slug: 'isplpt001-nanoparticle-synthesis-chip',
    category: 'HEALTHCARE',
    description: 'Microfluidic reactor chip for continuous-flow synthesis of lipid nanoparticles and polymeric nanoparticles for drug delivery and mRNA encapsulation.',
    specs: ['Continuous flow', 'LNP synthesis', 'mRNA compatible'],
    isActive: true,
  },

  // ── MEMS ───────────────────────────────────────────────────────────────────
  {
    name: 'MEMS Pressure Sensor Die',
    slug: 'mems-pressure-sensor-die',
    category: 'MEMS',
    description: 'Bare piezoresistive MEMS die for OEM integration. Wafer-level testing, dicing, and optional packaging available. Bulk silicon and SOI process options.',
    specs: ['Bulk Si / SOI', 'Wafer-level test', 'Custom packaging'],
    isActive: true,
  },
  {
    name: 'Hall Effect Sensor IC',
    slug: 'hall-effect-sensor-ic',
    category: 'MEMS',
    description: 'Monolithic Hall sensor IC with integrated amplifier, offset compensation, and digital output. Suitable for brushless DC motor control and position encoding.',
    specs: ['±100 mT range', 'SPI output', '2×2 mm QFN'],
    isActive: true,
  },
  {
    name: 'Thermal Flow Sensor',
    slug: 'thermal-flow-sensor',
    category: 'MEMS',
    description: 'Calorimetric MEMS flow sensor for low-flow gas and liquid measurement. Integrated heater and thermopile for differential temperature-based sensing.',
    specs: ['0–500 sccm', 'Calorimetric', 'Analog output'],
    isActive: true,
  },
];

async function main() {
  console.log('Seeding products...');

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        category: product.category,
        description: product.description,
        specs: product.specs,
        isActive: product.isActive,
      },
      create: product,
    });
    console.log(`  ✓ ${product.name}`);
  }

  console.log(`\nSeeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
