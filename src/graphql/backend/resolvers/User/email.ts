import { UserResolvers, UserRole } from '../../../../../gen/graphql/resolvers';
import requireCurrentUserRole from '../util/requireCurrentUserRole';

export const emailResolver: UserResolvers['email'] = async (
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

  return root.email;
};
