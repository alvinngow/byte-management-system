import { UserResolvers } from '@bims/graphql/resolvers';

import { prisma } from '../../../../db';

export const schoolResolver: UserResolvers['school'] = async (
  root,
  args,
  context,
  info
) => {
  if (root.schoolId == null) {
    return null;
  }

  /**
   * FIXME: (duncan) use DataLoader
   */

  const school = await prisma.school.findFirst({
    where: {
      id: root.schoolId,
    },
  });

  return school;
};
