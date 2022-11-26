import { Resolvers } from '../generated/resolvers-types';
import { meResolver } from './me';

const resolvers: Resolvers = {
  Query: {
    me: meResolver,
  },
};

export default resolvers;
