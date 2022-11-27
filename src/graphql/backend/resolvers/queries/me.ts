import { QueryResolvers } from '../../../../../gen/graphql/resolvers';

export const meResolver: QueryResolvers['me'] = (root, args, context) => {
  const currentUser = context.getCurrentUser();

  return currentUser;
};
