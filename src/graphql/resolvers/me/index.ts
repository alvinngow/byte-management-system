import { QueryResolvers } from '../../generated/resolvers-types';

export const meResolver: QueryResolvers['me'] = (root, args, context) => {
  return {
    username: 'lalala',
  };
};
