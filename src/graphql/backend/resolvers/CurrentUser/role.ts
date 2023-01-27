import {
  CurrentUserResolvers,
  UserRole,
} from '../../../../../gen/graphql/resolvers';

export const CurrentUser_roleResolver: CurrentUserResolvers['role'] = async (
  root,
  args,
  context,
  info
) => {
  return root.role as UserRole;
};
