import React from 'react';

const supporters = ["AIC", "BIRAC", "INCENSE", "CDIIC", "Elevate", "fSID", "MeitY"];
const customers = ["Hindustan Aeronautics Ltd", "Aeronautical Development Agency", "BITS Pilani", "CEERI · CSIO", "IIT Hyderabad", "NIIST", "NIPER", "Metallic Bellows India"];

export default function Partners() {
    return (
        <section className="py-20 bg-[var(--bg-primary)] border-t border-[var(--border-primary)] overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 mb-12 text-center">
                <h2 className="font-mono text-sm font-semibold tracking-widest uppercase text-[var(--text-secondary)]">
                    Trusted By & Supported By
                </h2>
            </div>

            {/* Marquee Wrapper */}
            <div className="relative w-full flex flex-col gap-8">

                {/* Row 1: Supporters (Moves Left) */}
                <div className="flex w-max animate-marquee whitespace-nowrap">
                    {/* Double the array to create the infinite loop illusion */}
                    {[...supporters, ...supporters, ...supporters].map((partner, index) => (
                        <div key={`sup-${index}`} className="mx-6 flex items-center justify-center px-8 py-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] backdrop-blur-sm">
                            <span className="font-sans text-lg font-bold tracking-wider text-[var(--text-secondary)] uppercase">{partner}</span>
                        </div>
                    ))}
                </div>

                {/* Row 2: Customers (Moves Right) */}
                <div className="flex w-max animate-marquee-reverse whitespace-nowrap">
                    {/* Double the array to create the infinite loop illusion */}
                    {[...customers, ...customers].map((customer, index) => (
                        <div key={`cus-${index}`} className="mx-6 flex items-center justify-center px-8 py-4 rounded-xl border border-[var(--accent-primary)]/10 bg-[var(--accent-primary)]/5 backdrop-blur-sm">
                            <span className="font-sans text-lg font-bold tracking-wider text-[var(--text-primary)] uppercase">{customer}</span>
                        </div>
                    ))}
                </div>

                {/* Fade overlays for the edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--bg-primary)] to-transparent"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--bg-primary)] to-transparent"></div>
            </div>
        </section>
    );
}