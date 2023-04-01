import { parseResolveInfo } from 'graphql-parse-resolve-info';

import { QueryResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';

export const meResolver: QueryResolvers['me'] = async (
  root,
  args,
  context,
  info
) => {
  const currentUserId = context.getCurrentUserId();

  if (currentUserId == null) {
    throw new Error('unauthorised');
  }

  const school = await prisma.school.findFirst({
    where: {
      User: { some: { id: currentUserId } },
    },
  });

  const currentUser = await prisma.user.findFirst({
    include: {
      ...(school ? { school: true } : {}),
    },
    where: {
      id: currentUserId,
    },
  });

  return currentUser;
};
