import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { QueryResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';

export const coursesResolver: QueryResolvers['courses'] = async (
  root,
  args,
  context,
  info
) => {
  await requireAuthenticated(context);

  const { first, after } = args;

  const result = await findManyCursorConnection(
    (args) => prisma.course.findMany(args),
    () => prisma.course.count(),
    { first, after },
    { resolveInfo: info }
  );

  return result;
};
