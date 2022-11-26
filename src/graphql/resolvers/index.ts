import { Resolvers } from '../../../gen/graphql/resolvers';
import { meResolver } from './me';

const resolvers: Resolvers = {
  Query: {
    me: meResolver,
  },
};

export default resolvers;
