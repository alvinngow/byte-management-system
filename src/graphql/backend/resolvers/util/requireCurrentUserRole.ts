import { GraphQLError } from 'graphql';

import { UserRole } from '../../../../../gen/graphql/resolvers';
import { Context } from '../../Context';

/**
 * Intended for use with GraphQL resolvers.
 *
 * Requires that the current user requesting has a certain role.
 */
export default async function requireCurrentUserRole(
  context: Context,
  role: UserRole
) {
  const currentUserRole = await context.getCurrentUserRole();

  if (currentUserRole == null) {
    throw new GraphQLError('Unauthorized', {
      extensions: {
        code: 'UNAUTHORIZED',
      },
    });
  }

  if (currentUserRole !== UserRole.SystemAdministrator) {
    throw new GraphQLError('Forbidden', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }
}
