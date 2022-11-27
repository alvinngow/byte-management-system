import { Resolvers } from '../../../../gen/graphql/resolvers';
import { loginResolver } from './mutations/login';
import { logoutResolver } from './mutations/logout';
import { signupResolver } from './mutations/signup';
import { meResolver } from './queries/me';

const resolvers: Resolvers = {
  Query: {
    me: meResolver,
  },
  Mutation: {
    login: loginResolver,
    signup: signupResolver,
    logout: logoutResolver,
  },
};

export default resolvers;
