import React from 'react';
import Link from 'next/link';

interface Market {
    id: string;
    tag: string;
    title: string;
    description: string;
    icon: string;
    image: string;
    links: string[];
    linkHref: string;
}

const markets: Market[] = [
    {
        id: "aerospace",
        tag: "Aerospace & Defence",
        title: "Pressure Switches & Transducers",
        description: "Advanced pressure switches, MEMS based pressure transducers, differential pressure switches and Hall sensors for commercial and defence application.",
        icon: "ph-airplane-tilt",
        image: "/assests/20250705_1547_Fighter-Jet-Landing-Gear_simple_compose_01jzd1cytpft2ts0vfa1hav51t-600x400.png",
        links: ["Pressure Switches", "Pressure Transducers", "Differential Switches"],
        linkHref: "/products#aerospace"
    },
    {
        id: "healthcare",
        tag: "Healthcare & Life Sciences",
        title: "Microfluidic Chips & Flow Systems",
        description: "Innovative microfluidic chips for advance research on organ on chip, droplet generation, cell sorting, and nanoparticle synthesis.",
        icon: "ph-dna",
        image: "/assests/Development-of-Special-Bonding-for-mRNA-Chip-600x480.png",
        links: ["Single & Double Emulsion", "Organ on Chip", "Nanoparticle Synthesis"],
        linkHref: "/products#healthcare"
    },
    {
        id: "mems",
        tag: "Semiconductor",
        title: "Semiconductor Fabrication Services",
        description: "Comprehensive semiconductor fabrication using state of the art cleanroom facilities supporting prototyping and production.",
        icon: "ph-cpu",
        image: "/assests/ia_1000000002-600x375.jpg",
        links: ["MEMS Device", "Silicon Photonics", "Advanced Semiconductor Devices"],
        linkHref: "/services"
    }
];

export default function Products() {
    return (
        <section className="relative py-32 bg-[var(--bg-primary)] border-t border-[var(--border-primary)]" id="products">
            <div className="mx-auto max-w-7xl px-6 relative z-10">

                {/* Section Header */}
                <div className="mb-20 max-w-3xl">
                    <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
                        Core Verticals
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-[var(--text-primary)]">
                        Engineered for precision.
                    </h2>
                    <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
                    <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                        Precision engineered MEMS devices and microfluidic systems for the world's most demanding industries.
                    </p>
                </div>

                {/* Product Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {markets.map((market) => (
                        <div
                            key={market.id}
                            className="group flex flex-col rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent-primary)]/50 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/10"
                        >
                            {/* Top Graphic Area */}
                            <div className="h-56 relative border-b border-[var(--border-primary)] bg-[var(--bg-tertiary)] overflow-hidden">
                                {/* Image */}
                                <img
                                    src={market.image}
                                    alt={market.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Floating Icon Badge */}
                                <div className="absolute -bottom-6 right-6 w-12 h-12 rounded-full bg-[var(--bg-secondary)] border border-[var(--accent-primary)]/40 flex items-center justify-center shadow-lg z-20">
                                    <i className={`ph ${market.icon} text-xl text-[var(--accent-primary)]`}></i>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-8 flex flex-col flex-grow">
                                <span className="font-mono text-xs font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-3">
                                    {market.tag}
                                </span>
                                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 leading-snug">
                                    {market.title}
                                </h3>
                                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8 flex-grow">
                                    {market.description}
                                </p>

                                {/* Sub-links list */}
                                <ul className="mb-8 flex flex-col gap-3">
                                    {market.links.map((link, index) => (
                                        <li key={index} className="flex items-center gap-3 text-sm font-medium text-[var(--text-primary)]">
                                            <i className="ph ph-caret-right text-[var(--accent-primary)]"></i>
                                            {link}
                                        </li>
                                    ))}
                                </ul>

                                {/* Action Link */}
                                <Link
                                    href={market.linkHref}
                                    className="mt-auto group inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)] transition-colors hover:text-[var(--accent-primary)]"
                                >
                                    Explore Segment
                                    <i className="ph ph-arrow-right transition-transform group-hover:translate-x-1"></i>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}