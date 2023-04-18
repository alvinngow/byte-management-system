import { UserResolvers } from '@bims/graphql/resolvers';
import { UserRole } from '@bims/graphql/schema';

import requireCurrentUserRole from '../util/requireCurrentUserRole';

export const emailResolver: UserResolvers['email'] = async (
  root,
  args,
  context,
  info
) => {
  await requireCurrentUserRole(
    context,
    UserRole.User,
    UserRole.CommitteeMember,
    UserRole.SystemAdministrator
  );

  return root.email;
};
