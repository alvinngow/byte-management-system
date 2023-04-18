import { UserResolvers } from '@bims/graphql/resolvers';
import { UserRole } from '@bims/graphql/schema';

import requireCurrentUserRole from '../util/requireCurrentUserRole';

export const roleResolver: UserResolvers['role'] = async (
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

  return root.role as UserRole;
};
