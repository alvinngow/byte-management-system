import { PrismaClient } from '@prisma/client';

/**
 * See https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */

declare global {
  var _prisma: PrismaClient | undefined;
}

export const prisma =
  global._prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV !== 'production' ? ['query'] : [],
  });

if (process.env.NODE_ENV !== 'production') {
  global._prisma = prisma;
}
