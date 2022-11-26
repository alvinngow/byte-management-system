import { QueryResolvers } from '../../../../gen/graphql/resolvers';

export const meResolver: QueryResolvers['me'] = (root, args, context) => {
  return {
    username: 'lalala',
  };
};
