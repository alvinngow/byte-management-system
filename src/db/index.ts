import { PrismaClient } from '@prisma/client';

/**
 * See https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */

declare global {
  var _prisma: PrismaClient | undefined;
}

/**
 * Cache Prisma for long-running applications
 * https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prismaclient-in-long-running-applications
 **/
let prismaClientCache: PrismaClient | null = null;

function createPrismaClient() {
  if (prismaClientCache != null) {
    return prismaClientCache;
  }

  prismaClientCache = new PrismaClient({
    log: process.env.NODE_ENV !== 'production' ? ['query'] : [],
  });

  return prismaClientCache;
}

export const prisma = global._prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global._prisma = prisma;
}
