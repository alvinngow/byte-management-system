import { Resolvers } from '../../../../gen/graphql/resolvers';
import { accountLoginResolver } from './mutations/accountLogin';
import { accountLogoutResolver } from './mutations/accountLogout';
import { accountRoleUpdateResolver } from './mutations/accountRoleUpdate';
import { accountSignupResolver } from './mutations/accountSignup';
import { meResolver } from './queries/me';
import { schoolsResolver } from './queries/schools';
import { usersResolver } from './queries/users';
import { emailResolver } from './User/email';
import { roleResolver } from './User/role';
import { schoolResolver } from './User/school';

const resolvers: Resolvers = {
  Query: {
    me: meResolver,
    schools: schoolsResolver,
    users: usersResolver,
  },
  Mutation: {
    accountLogin: accountLoginResolver,
    accountSignup: accountSignupResolver,
    accountLogout: accountLogoutResolver,
    accountRoleUpdate: accountRoleUpdateResolver,
  },
  User: {
    email: emailResolver,
    school: schoolResolver,
    role: roleResolver,
  },
};

export default resolvers;
