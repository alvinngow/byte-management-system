import { UserRole } from '@bims/graphql/schema';
import { GraphQLError } from 'graphql';

import { Context } from '../../Context';

/**
 * Intended for use with GraphQL resolvers.
 *
 * Requires that the current user requesting has a certain role.
 */
export default async function requireCurrentUserRole(
  context: Context,
  ...roles: UserRole[]
) {
  const currentUserRole = await context.getCurrentUserRole();

  if (currentUserRole == null) {
    throw new GraphQLError('Unauthorized', {
      extensions: {
        code: 'UNAUTHORIZED',
      },
    });
  }

  const rolesSet = new Set(roles);

  if (!rolesSet.has(currentUserRole)) {
    throw new GraphQLError('Forbidden', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }
}
