import { CurrentUserResolvers } from '@bims/graphql/resolvers';
import { UserRole } from '@bims/graphql/schema';

export const CurrentUser_roleResolver: CurrentUserResolvers['role'] = async (
  root,
  args,
  context,
  info
) => {
  return root.role as UserRole;
};
