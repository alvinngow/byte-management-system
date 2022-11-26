import { Resolvers } from '../../../gen/graphql/resolvers';
import { loginResolver } from './mutations/login';
import { signupResolver } from './mutations/signup';
import { meResolver } from './queries/me';

const resolvers: Resolvers = {
  Query: {
    me: meResolver,
  },
  Mutation: {
    login: loginResolver,
    signup: signupResolver,
  },
};

export default resolvers;
