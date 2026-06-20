import type { Metadata } from 'next';
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
  // Aerospace
  { id: 'aero-1', name: 'SP Series — Pressure Sensors', category: 'AEROSPACE', description: 'Silicon piezoresistive pressure sensors designed for aviation altimetry and atmospheric sensing. Exceptional thermal stability and long-term reliability.', specs: ['0–1000 mbar', 'Piezoresistive', 'Silicon', 'MIL-Spec'] },
  { id: 'aero-2', name: 'TP Series — Pressure Transducers', category: 'AEROSPACE', description: 'High-accuracy MEMS-based pressure transducers with integrated signal conditioning for aircraft environmental control and pneumatic systems.', specs: ['0–700 bar', 'Capacitive', 'SOI', 'AEC-Q100'] },
  { id: 'aero-3', name: 'Differential Pressure Switches', category: 'AEROSPACE', description: 'Precision differential pressure switches for fuel, hydraulic, and pneumatic systems. Redundant design with fail-safe operation for safety-critical applications.', specs: ['Differential', 'Snap-action', '-55°C to +125°C'] },
  { id: 'aero-4', name: 'Flow Transmitters', category: 'AEROSPACE', description: 'MEMS thermal flow transmitters for airflow measurement in ventilation, environmental control, and propulsion test systems with exceptional dynamic range.', specs: ['Thermal MEMS', '4–20 mA output', 'IP67'] },
  { id: 'aero-5', name: 'Hall Effect Sensors', category: 'AEROSPACE', description: 'Contactless Hall effect sensors for position, speed, and current sensing in landing gear, flight control actuators, and engine management systems.', specs: ['Contactless', 'Linear & rotary', '3.3–5V supply'] },
  { id: 'aero-6', name: 'Custom Aerospace Modules', category: 'AEROSPACE', description: 'Bespoke integrated sensor modules for OEM and Tier-1 aircraft manufacturers requiring multi-parameter sensing with onboard signal processing.', specs: ['Custom OEM', 'Multi-parameter', 'DO-160G'] },
  // Healthcare
  { id: 'hc-1', name: 'ISPLPS001 — Microfluidic Chip', category: 'HEALTHCARE', description: 'Single-layer PDMS microfluidic chip for cell culture and organ-on-chip applications. Optical transparency for live imaging compatibility.', specs: ['PDMS/Glass', 'Channel: 100µm', 'Biocompatible'] },
  { id: 'hc-2', name: 'ISPLPS002 — Pressure Controller', category: 'HEALTHCARE', description: 'Ultra-low-pressure controller for precise flow regulation in microfluidic networks. Sub-millibar resolution for droplet generation and particle sorting.', specs: ['0–1000 mbar', '±0.01 mbar res.', 'USB control'] },
  { id: 'hc-3', name: 'ISPLHTPT001 — Flow Sensor', category: 'HEALTHCARE', description: 'Thermal MEMS flow sensor for precise liquid flow measurement in microfluidic systems, infusion pumps, and lab-on-chip platforms.', specs: ['0–5 mL/min', 'Thermal MEMS', 'I²C / SPI'] },
  { id: 'hc-4', name: 'ISPLDPS001 — Droplet Generator', category: 'HEALTHCARE', description: 'Silicon-glass droplet generation chip with T-junction and flow-focusing geometries. Compatible with aqueous and organic solvents for emulsification.', specs: ['Silicon/Glass', 'T-junction', '1–1000 Hz'] },
  { id: 'hc-5', name: 'Organ-on-Chip Platform', category: 'HEALTHCARE', description: 'Multi-layer microfluidic organ-on-chip platforms with integrated membrane for co-culture of epithelial and endothelial cells under physiological shear stress.', specs: ['Multi-layer', 'PDMS membrane', 'Live imaging'] },
  { id: 'hc-6', name: 'ISPLPT001 — Nanoparticle Synthesis Chip', category: 'HEALTHCARE', description: 'Microfluidic reactor chip for continuous-flow synthesis of lipid nanoparticles and polymeric nanoparticles for drug delivery and mRNA encapsulation.', specs: ['Continuous flow', 'LNP synthesis', 'mRNA compatible'] },
  // MEMS
  { id: 'mems-1', name: 'MEMS Pressure Sensor Die', category: 'MEMS', description: 'Bare piezoresistive MEMS die for OEM integration. Wafer-level testing, dicing, and optional packaging available. Bulk silicon and SOI process options.', specs: ['Bulk Si / SOI', 'Wafer-level test', 'Custom packaging'] },
  { id: 'mems-2', name: 'Hall Effect Sensor IC', category: 'MEMS', description: 'Monolithic Hall sensor IC with integrated amplifier, offset compensation, and digital output. Suitable for brushless DC motor control and position encoding.', specs: ['±100 mT range', 'SPI output', '2×2 mm QFN'] },
  { id: 'mems-3', name: 'Thermal Flow Sensor', category: 'MEMS', description: 'Calorimetric MEMS flow sensor for low-flow gas and liquid measurement. Integrated heater and thermopile for differential temperature-based sensing.', specs: ['0–500 sccm', 'Calorimetric', 'Analog output'] },
];

const categories = [
  { id: 'aerospace', key: 'AEROSPACE', label: 'Aerospace & Defence', icon: 'ph-airplane-tilt', description: 'INFAB pressure sensors and modules exceed the rigorous requirements of the most demanding airborne applications. Our products sustain high environmental stresses and deliver state-of-the-art precision, long-term stability, and reliability.' },
  { id: 'healthcare', key: 'HEALTHCARE', label: 'Healthcare & Life Sciences', icon: 'ph-dna', description: 'INFAB products and technologies are integrated into the most advanced medical equipment. Our microfluidic platforms enable next-generation diagnostics, drug delivery, and biological research.' },
  { id: 'mems', key: 'MEMS', label: 'MEMS & Semiconductor', icon: 'ph-cpu', description: 'INFAB specialises in the fabrication of Micro-Electro-Mechanical Systems (MEMS) and offers a comprehensive range of process services. Our state-of-the-art facilities and experienced team ensure the highest quality and precision.' },
];

function ProductCard({ product }: { product: ProductData }) {
  const cover = product.imageUrl ?? product.imageUrls?.[0] ?? null;
  return (
    <div className="group flex flex-col rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
      {/* Product image */}
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt={product.name} className="w-full aspect-video object-cover border-b border-[var(--border-primary)]" />
      ) : (
        <div className="w-full aspect-video bg-[var(--bg-primary)] border-b border-[var(--border-primary)] flex items-center justify-center">
          <i className="ph ph-microchip text-4xl text-[var(--text-secondary)]/20"></i>
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 leading-snug">{product.name}</h3>
      {product.specs.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {product.specs.map((spec) => (
            <span key={spec} className="inline-flex px-2 py-0.5 rounded bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-xs font-mono">
              {spec}
            </span>
          ))}
        </div>
      )}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 flex-grow">{product.description}</p>
      <Link
        href={`/contact?product=${encodeURIComponent(product.name)}`}
        className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mt-auto"
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
