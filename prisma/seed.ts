import { PrismaClient } from '@prisma/client';

import bimsSeed from './seed-data/bimsSeed';

const prisma = new PrismaClient();

async function run() {
  console.log('seed placeholder');
  await bimsSeed();
}

run()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });
