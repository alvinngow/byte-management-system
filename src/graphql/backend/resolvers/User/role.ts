import { UserResolvers, UserRole } from '../../../../../gen/graphql/resolvers';
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
