import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Clearing old product data...');
    await prisma.product.deleteMany(); // Prevents duplicates if you run this multiple times

    console.log('Seeding INFAB Products...');

    const products = [
        // --- AEROSPACE ---
        {
            name: 'TP Series - MEMS Pressure Transducers',
            slug: 'tp-series-pressure-transducers',
            category: 'Aerospace',
            description: 'High-accuracy absolute and gauge pressure transducers designed for flight-critical aerospace applications. MIL-SPEC compliant.',
            specs: { material: 'Silicon', output: 'Analog/Digital', standard: 'MIL-SPEC' },
            isActive: true,
        },
        {
            name: 'SP Series - Differential Pressure Switches',
            slug: 'sp-series-differential-switches',
            category: 'Aerospace',
            description: 'Ruggedized silicon-on-insulator (SOI) differential switches for hydraulic and pneumatic system monitoring in harsh environments.',
            specs: { material: 'SOI', type: 'Differential', standard: 'Aerospace Grade' },
            isActive: true,
        },
        // --- HEALTHCARE ---
        {
            name: 'Organ-on-Chip Platforms',
            slug: 'organ-on-chip-platforms',
            category: 'Healthcare',
            description: 'Glass and PDMS hybrid microfluidic chips designed for advanced cell culture, drug screening, and disease modeling.',
            specs: { material: 'Glass/PDMS', application: 'Drug Screening', type: 'Microfluidic' },
            isActive: true,
        },
        {
            name: 'Precision Flow Controllers',
            slug: 'precision-flow-controllers',
            category: 'Healthcare',
            description: 'Miniaturized closed-loop flow control systems for portable point-of-care (POC) diagnostics and nanoparticle synthesis.',
            specs: { type: 'Closed-loop', application: 'POC Diagnostics' },
            isActive: true,
        }
    ];

    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
    }

    console.log('✅ Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });