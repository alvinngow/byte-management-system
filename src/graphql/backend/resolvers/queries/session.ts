import { QueryResolvers } from '@bims/graphql/resolvers';

import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';
export const sessionResolver: QueryResolvers['session'] = async (
  root,
  args,
  context,
  info
) => {
  await requireAuthenticated(context);

  const { id } = args;

  const course = await prisma.session.findFirst({
    where: {
      id,
    },
  });

  return course;
};
