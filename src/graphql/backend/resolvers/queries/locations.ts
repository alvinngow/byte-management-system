import { QueryResolvers } from '@bims/graphql/resolvers';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';

export const locationsResolver: QueryResolvers['locations'] = async (
  root,
  args,
  context,
  info
) => {
  await requireAuthenticated(context);

  const { first, after } = args;

  const result = await findManyCursorConnection(
    (args) => prisma.location.findMany(args),
    () => prisma.location.count(),
    { first, after },
    { resolveInfo: info }
  );

  return result;
};
