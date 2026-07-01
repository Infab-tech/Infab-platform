import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const partners = await prisma.partner.findMany();
  console.log('PARTNERS IN DB:', JSON.stringify(partners, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
