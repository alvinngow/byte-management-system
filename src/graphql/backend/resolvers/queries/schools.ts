import { QueryResolvers } from '@bims/graphql/resolvers';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { prisma } from '../../../../db';

export const schoolsResolver: QueryResolvers['schools'] = async (
  root,
  args,
  context,
  info
) => {
  const { first, after } = args;

  const result = await findManyCursorConnection(
    (args) => prisma.school.findMany(args),
    () => prisma.school.count(),
    { first, after },
    { resolveInfo: info }
  );

  return result;
};
