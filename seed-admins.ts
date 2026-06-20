import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const emails = ['ajeyagarwal0@gmail.com', 'info@infab-tech.com'];

    for (const email of emails) {
        await prisma.userRole.upsert({
            where: { email },
            update: { role: 'ADMIN' },
            create: { email, role: 'ADMIN' },
        });
        console.log(`Seeded admin role for: ${email}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
