import { QueryResolvers } from '@bims/graphql/resolvers';

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

  const currentUser = await prisma.user.findFirst({
    where: {
      id: currentUserId,
    },
  });

  return currentUser;
};
