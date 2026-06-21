import React from 'react';
import { prisma } from '@/lib/supabase/prisma';
import Image from 'next/image';

const fallbackSupporters = ["AIC", "BIRAC", "InCeNSE · IISc", "CDIIC", "Elevate", "fSID", "MeitY"];
const fallbackCustomers = ["Hindustan Aeronautics Ltd", "Aeronautical Development Agency", "BITS Pilani", "CEERI", "CSIO Chandigarh", "IIT Hyderabad", "AmarBio", "NIIST", "NIPER", "UR Therapeutics", "Metallic Bellows India"];

export default async function Partners() {
    let dbPartners: Awaited<ReturnType<typeof prisma.partner.findMany>> = [];
    try {
        dbPartners = await prisma.partner.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' }
        });
    } catch { /* fallback */ }

    let row1: Array<{ id: string, name: string, logoUrl?: string | null }> = fallbackSupporters.map(name => ({ id: name, name }));
    let row2: Array<{ id: string, name: string, logoUrl?: string | null }> = fallbackCustomers.map(name => ({ id: name, name }));

    if (dbPartners.length > 0) {
        const half = Math.ceil(dbPartners.length / 2);
        row1 = dbPartners.slice(0, half);
        row2 = dbPartners.slice(half);
    }
    return (
        <section className="py-20 bg-[var(--bg-primary)] border-t border-[var(--border-primary)] overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 mb-12 text-center">
                <h2 className="font-mono text-sm font-semibold tracking-widest uppercase text-[var(--text-secondary)]">
                    Trusted By & Supported By
                </h2>
            </div>

            {/* Marquee Wrapper */}
            <div className="relative w-full flex flex-col gap-8">

                {/* Row 1: Moves Left */}
                <div className="flex w-max animate-marquee whitespace-nowrap">
                    {[...row1, ...row1, ...row1].map((partner, index) => (
                        <div key={`sup-${index}`} className="mx-6 flex items-center justify-center px-8 py-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] backdrop-blur-sm min-w-[200px]">
                            {partner.logoUrl ? (
                                <Image src={partner.logoUrl} alt={partner.name} width={120} height={60} className="object-contain max-h-12" />
                            ) : (
                                <span className="font-sans text-lg font-bold tracking-wider text-[var(--text-secondary)] uppercase">{partner.name}</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Row 2: Moves Right */}
                <div className="flex w-max animate-marquee-reverse whitespace-nowrap mt-4">
                    {[...row2, ...row2, ...row2].map((partner, index) => (
                        <div key={`cus-${index}`} className="mx-6 flex items-center justify-center px-8 py-4 rounded-xl border border-[var(--accent-primary)]/10 bg-[var(--accent-primary)]/5 backdrop-blur-sm min-w-[200px]">
                            {partner.logoUrl ? (
                                <Image src={partner.logoUrl} alt={partner.name} width={120} height={60} className="object-contain max-h-12" />
                            ) : (
                                <span className="font-sans text-lg font-bold tracking-wider text-[var(--text-primary)] uppercase">{partner.name}</span>
                            )}
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