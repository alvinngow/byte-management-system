import { MutationResolvers } from '@bims/graphql/resolvers';

export const accountLogoutResolver: MutationResolvers['accountLogout'] = async (
  root,
  args,
  context,
  info
) => {
  return context.destroySession();
};
