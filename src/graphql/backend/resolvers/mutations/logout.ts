import { MutationResolvers } from '../../../../../gen/graphql/resolvers';

export const logoutResolver: MutationResolvers['logout'] = async (
  root,
  args,
  context,
  info
) => {
  return context.destroySession();
};
