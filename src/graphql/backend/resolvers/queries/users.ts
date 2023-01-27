import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { QueryResolvers, UserRole } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireCurrentUserRole from '../util/requireCurrentUserRole';

export const usersResolver: QueryResolvers['users'] = async (
  root,
  args,
  context,
  info
) => {
  await requireCurrentUserRole(
    context,
    UserRole.CommitteeMember,
    UserRole.SystemAdministrator
  );

  const { first, after } = args;

  const result = await findManyCursorConnection(
    (args) => prisma.user.findMany(args),
    () => prisma.user.count(),
    { first, after },
    { resolveInfo: info }
  );

  return result;
};
