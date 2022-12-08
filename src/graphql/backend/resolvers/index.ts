import { Resolvers } from '../../../../gen/graphql/resolvers';
import { accountLoginResolver } from './mutations/accountLogin';
import { accountLogoutResolver } from './mutations/accountLogout';
import { accountSignupResolver } from './mutations/accountSignup';
import { meResolver } from './queries/me';
import { schoolsResolver } from './queries/schools';

const resolvers: Resolvers = {
  Query: {
    me: meResolver,
    schools: schoolsResolver,
  },
  Mutation: {
    accountLogin: accountLoginResolver,
    accountSignup: accountSignupResolver,
    accountLogout: accountLogoutResolver,
  },
};

export default resolvers;
