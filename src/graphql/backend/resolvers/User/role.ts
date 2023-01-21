import { UserResolvers, UserRole } from '../../../../../gen/graphql/resolvers';
import requireCurrentUserRole from '../util/requireCurrentUserRole';

export const roleResolver: UserResolvers['role'] = async (
  root,
  args,
  context,
  info
) => {
  const currentUserRole = await context.getCurrentUserRole();

  if (currentUserRole !== UserRole.SystemAdministrator) {
    return null;
  }

  return root.role as UserRole;
};
