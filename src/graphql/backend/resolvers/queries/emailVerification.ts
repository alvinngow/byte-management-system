import { QueryResolvers } from '@bims/graphql/resolvers';

import { prisma } from '../../../../db';

export const emailVerificationResolver: QueryResolvers['emailVerification'] =
  async (root, args, context, info) => {
    const { id } = args;

    const result = await prisma.emailVerification.findFirst({
      where: {
        id,
        expiresAt: {
          gt: new Date(),
        },
        used: false,
      },
    });

    return result;
  };
