import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/supabase/prisma';

export const metadata: Metadata = {
  title: 'Products | INFAB Semiconductor',
  description: "Precision-engineered MEMS sensors, microfluidic devices, and semiconductor components serving the world's most demanding industries.",
};

interface ProductData {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: string[];
  imageUrl?: string | null;
  imageUrls?: string[];
}

const fallbackProducts: ProductData[] = [
  // Aerospace — real INFAB model numbers with datasheet specs
  {
    id: 'aero-1',
    name: 'ISPLPS001 — Pressure Switch',
    category: 'AEROSPACE',
    imageUrl: '/assests/products/pressure-switch.png',
    description: 'MIL-grade silicon piezoresistive pressure switch for aircraft hydraulic, fuel, and pneumatic systems. Designed to meet the most demanding airborne qualification requirements.',
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
    id: 'aero-2',
    name: 'ISPLPT001 — Pressure Transducer',
    category: 'AEROSPACE',
    imageUrl: '/assests/products/pressure-transducer.png',
    description: 'High-accuracy MIL-grade MEMS pressure transducer with integrated signal conditioning for aircraft environmental control, cabin pressure, and pneumatic systems.',
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
    id: 'aero-3',
    name: 'ISPLDPS001 — Differential Pressure Switch',
    category: 'AEROSPACE',
    imageUrl: '/assests/products/dps.png',
    description: 'Precision differential pressure switch for fuel filter monitoring, hydraulic line balance, and airflow measurement in commercial and military aircraft.',
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
    id: 'aero-4',
    name: 'MEMS Flow Transmitters',
    category: 'AEROSPACE',
    description: 'Thermal MEMS flow transmitters for precision airflow measurement in ventilation, environmental control, and propulsion test systems with industry-leading dynamic range.',
    specs: [
      'Technology: Thermal MEMS',
      'Output: 4–20 mA',
      'Protection: IP67',
      'Interface: RS-485 / Modbus',
    ],
  },
  {
    id: 'aero-5',
    name: 'Hall Effect Sensors',
    category: 'AEROSPACE',
    description: 'Contactless Hall effect sensors for position, speed, and current sensing in landing gear, flight control actuators, and engine management systems.',
    specs: [
      'Range: ±100 mT',
      'Type: Linear & rotary',
      'Supply: 3.3–5 V',
      'Output: Analog / PWM',
    ],
  },
  {
    id: 'aero-6',
    name: 'Custom Aerospace Sensor Modules',
    category: 'AEROSPACE',
    description: 'Bespoke integrated sensor modules for OEM and Tier-1 aircraft manufacturers requiring multi-parameter sensing with onboard signal processing and MIL-qualified packaging.',
    specs: [
      'Standard: DO-160G / MIL-STD-810',
      'Type: Multi-parameter',
      'Interface: Custom OEM',
      'Qualification: AS9100 Rev D',
    ],
  },
  // Healthcare & Microfluidics — real INFAB model numbers
  {
    id: 'hc-1',
    name: 'ISPLHTPT001 — Pressure Transducer',
    category: 'HEALTHCARE',
    imageUrl: '/assests/products/htpt.png',
    description: 'Low-pressure MEMS transducer purpose-built for medical and microfluidic applications. Wide operating temperature range makes it suitable for sterilisable and implantable contexts.',
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
    id: 'hc-2',
    name: 'ISPLPS002 — Microfluidic Pressure Controller',
    category: 'HEALTHCARE',
    description: 'Ultra-low-pressure controller for precise flow regulation in microfluidic networks. Sub-millibar resolution enables reliable droplet generation, particle sorting, and organ-on-chip perfusion.',
    specs: [
      'Pressure Range: 0–1000 mbar',
      'Resolution: ±0.01 mbar',
      'Interface: USB / RS-232',
      'Channels: Up to 8',
    ],
  },
  {
    id: 'hc-3',
    name: 'Microfluidic Chips (PDMS / Glass)',
    category: 'HEALTHCARE',
    imageUrl: '/assests/products/mf-chip.jpg',
    description: 'Single- and multi-layer microfluidic chips for cell culture, organ-on-chip, and lab-on-chip applications. Optically transparent for live fluorescence and brightfield imaging.',
    specs: [
      'Material: PDMS / Glass / Si',
      'Channel Width: 20–500 µm',
      'Compatibility: Biocompatible',
      'Bonding: Plasma / Anodic',
    ],
  },
  {
    id: 'hc-4',
    name: 'Droplet Generation Chips',
    category: 'HEALTHCARE',
    imageUrl: '/assests/products/hexagon-well.jpg',
    description: 'Silicon-glass chips with T-junction and flow-focusing geometries for monodisperse droplet production. Ideal for digital PCR, drug encapsulation, and single-cell assays.',
    specs: [
      'Material: Silicon / Glass',
      'Geometry: T-junction & FF',
      'Droplet Rate: 1–1000 Hz',
      'Compatibility: Aqueous & organic',
    ],
  },
  {
    id: 'hc-5',
    name: 'Organ-on-Chip Platform',
    category: 'HEALTHCARE',
    imageUrl: '/assests/services/cancer-on-chip.png',
    description: 'Multi-layer microfluidic organ-on-chip platforms with integrated membrane for physiological co-culture of epithelial and endothelial cells under controlled shear stress.',
    specs: [
      'Layers: Multi-layer PDMS',
      'Membrane: 10 µm porous PDMS',
      'Imaging: Live fluorescence',
      'Shear: Tunable 0.01–1 Pa',
    ],
  },
  {
    id: 'hc-6',
    name: 'Nanoparticle Synthesis Chips',
    category: 'HEALTHCARE',
    description: 'Continuous-flow microfluidic reactors for size-controlled synthesis of lipid nanoparticles (LNP) and polymeric nanoparticles for mRNA delivery and drug encapsulation.',
    specs: [
      'Flow Regime: Continuous flow',
      'Applications: LNP / mRNA / Drug',
      'NP Size Control: 20–500 nm',
      'Throughput: µL to mL/min',
    ],
  },
  // MEMS Semiconductor
  {
    id: 'mems-1',
    name: 'Piezoresistive MEMS Sensor Die',
    category: 'MEMS',
    imageUrl: '/assests/products/microchip.jpg',
    description: 'Bare piezoresistive MEMS die for OEM integration. Available in bulk silicon and SOI variants with wafer-level testing, dicing, and optional hermetic packaging.',
    specs: [
      'Process: Bulk Si / SOI',
      'Testing: Wafer-level probe',
      'Packaging: Custom hermetic',
      'Wafer Size: 4" / 6"',
    ],
  },
  {
    id: 'mems-2',
    name: 'Hall Effect Sensor IC',
    category: 'MEMS',
    description: 'Monolithic Hall sensor IC with integrated amplifier, offset compensation, and digital SPI output. Designed for brushless DC motor commutation and high-precision position encoding.',
    specs: [
      'Range: ±100 mT',
      'Output: SPI digital',
      'Package: 2×2 mm QFN',
      'Supply: 3.3 V / 5 V',
    ],
  },
  {
    id: 'mems-3',
    name: 'Calorimetric Thermal Flow Sensor',
    category: 'MEMS',
    description: 'Calorimetric MEMS flow sensor with integrated heater and thermopile for differential-temperature-based sensing of gas and liquid flows at sub-sccm resolution.',
    specs: [
      'Range: 0–500 sccm',
      'Principle: Calorimetric',
      'Output: Analog 0–5 V',
      'Media: Gas & liquid',
    ],
  },
];

const categories = [
  { id: 'aerospace', key: 'AEROSPACE', label: 'Aerospace & Defence', icon: 'ph-airplane-tilt', description: 'INFAB pressure sensors and modules exceed the rigorous requirements of the most demanding airborne applications. Our products sustain high environmental stresses and deliver state-of-the-art precision, long-term stability, and reliability.' },
  { id: 'healthcare', key: 'HEALTHCARE', label: 'Healthcare & Life Sciences', icon: 'ph-dna', description: 'INFAB products and technologies are integrated into the most advanced medical equipment. Our microfluidic platforms enable next-generation diagnostics, drug delivery, and biological research.' },
  { id: 'mems', key: 'MEMS', label: 'MEMS & Semiconductor', icon: 'ph-cpu', description: 'INFAB specialises in the fabrication of Micro-Electro-Mechanical Systems (MEMS) and offers a comprehensive range of process services. Our state-of-the-art facilities and experienced team ensure the highest quality and precision.' },
];

function SpecTable({ specs }: { specs: string[] }) {
  if (specs.length === 0) return null;
  return (
    <div className="mb-4 rounded-lg border border-[var(--border-primary)] overflow-hidden">
      <table className="w-full text-xs">
        <tbody>
          {specs.map((spec) => {
            const colonIdx = spec.indexOf(':');
            if (colonIdx === -1) {
              return (
                <tr key={spec} className="border-b border-[var(--border-primary)] last:border-0">
                  <td colSpan={2} className="px-3 py-1.5 font-mono text-[var(--accent-primary)]">{spec}</td>
                </tr>
              );
            }
            const label = spec.slice(0, colonIdx).trim();
            const value = spec.slice(colonIdx + 1).trim();
            return (
              <tr key={spec} className="border-b border-[var(--border-primary)] last:border-0 even:bg-[var(--text-primary)]/[0.02]">
                <td className="px-3 py-1.5 text-[var(--text-secondary)] font-mono whitespace-nowrap w-[40%] border-r border-[var(--border-primary)]">{label}</td>
                <td className="px-3 py-1.5 text-[var(--text-primary)] font-semibold">{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ProductCard({ product }: { product: ProductData }) {
  const cover = product.imageUrl ?? product.imageUrls?.[0] ?? null;
  return (
    <div className="group flex flex-col rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
      {/* Product image or placeholder */}
      {cover ? (
        <div className="w-full h-48 bg-[#080d18] border-b border-[var(--border-primary)] flex items-center justify-center overflow-hidden">
          <Image src={cover} alt={product.name} width={320} height={192} className="max-h-44 w-auto object-contain" />
        </div>
      ) : (
        <div className="w-full h-32 bg-[var(--bg-primary)] border-b border-[var(--border-primary)] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 to-transparent"></div>
          <i className="ph ph-microchip text-5xl text-[var(--text-secondary)]/10"></i>
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        {/* Model number / name */}
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1 leading-snug group-hover:text-[var(--accent-primary)] transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 flex-grow">
          {product.description}
        </p>

        {/* Spec table */}
        <SpecTable specs={product.specs} />

        <Link
          href={`/contact?product=${encodeURIComponent(product.name)}`}
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mt-2"
        >
          Request Quote <i className="ph ph-arrow-right transition-transform group-hover:translate-x-1"></i>
        </Link>
      </div>
    </div>
  );
}

export default async function ProductsPage() {
  let dbProducts: ProductData[] = [];
  try {
    const rows = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { category: 'asc' },
      select: { id: true, name: true, category: true, description: true, specs: true, imageUrl: true, imageUrls: true },
    });
    dbProducts = rows.map((r) => ({
      id: r.id,
      name: r.name,
      category: r.category.toUpperCase(),
      description: r.description,
      specs: Array.isArray(r.specs) ? (r.specs as string[]) : [],
      imageUrl: r.imageUrl,
      imageUrls: r.imageUrls ?? [],
    }));
  } catch {
    // DB not available — use fallback
  }

  const products = dbProducts.length > 0 ? dbProducts : fallbackProducts;

  return (
    <div className="bg-[var(--bg-primary)]">

      {/* Page Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Product Catalog</span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight max-w-3xl">Our Products</h1>
          <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            Precision-engineered MEMS sensors, microfluidic devices, and semiconductor components serving the world&apos;s most demanding industries.
          </p>
        </div>
      </div>

      {/* Sticky Category Nav */}
      <div className="sticky top-20 z-40 bg-[var(--bg-secondary)]/90 backdrop-blur-md border-b border-[var(--border-primary)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-0 overflow-x-auto">
            {categories.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} className="flex items-center gap-2 px-6 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border-b-2 border-transparent hover:border-[var(--accent-primary)] transition-all whitespace-nowrap">
                <i className={`ph ${cat.icon}`}></i>
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Category Sections */}
      {categories.map((cat, idx) => {
        const catProducts = products.filter((p) => p.category === cat.key);
        return (
          <div key={cat.id} id={cat.id} className={`border-b border-[var(--border-primary)] py-32 ${idx % 2 === 1 ? 'bg-[var(--bg-secondary)]' : ''}`}>
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center">
                      <i className={`ph ${cat.icon} text-xl text-[var(--accent-primary)]`}></i>
                    </div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">{cat.label}</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-4">{cat.label}</h2>
                  <div className="w-8 h-0.5 bg-[var(--accent-primary)]"></div>
                </div>
                <div className="lg:col-span-2 flex items-center">
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{cat.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catProducts.length > 0
                  ? catProducts.map((p) => <ProductCard key={p.id} product={p} />)
                  : <p className="text-[var(--text-secondary)] col-span-3 py-8 text-center">Products coming soon.</p>
                }
              </div>
            </div>
          </div>
        );
      })}

      {/* CTA */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-[var(--accent-primary)]/20 bg-[var(--bg-secondary)] p-12 text-center">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Need a custom solution?</h2>
            <p className="text-[var(--text-secondary)] mb-8 text-lg max-w-xl mx-auto">
              Talk to our engineers about bespoke sensor modules, custom MEMS processes, or microfluidic system integration.
            </p>
            <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--accent-primary)] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110">
              Consult an Engineer
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
