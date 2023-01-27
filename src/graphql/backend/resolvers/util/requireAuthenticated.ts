import { GraphQLError } from 'graphql';

import { Context } from '../../Context';

export default async function requireAuthenticated(context: Context) {
  const currentUserRole = await context.getCurrentUserRole();

  if (currentUserRole == null) {
    throw new GraphQLError('Unauthorized', {
      extensions: {
        code: 'UNAUTHORIZED',
      },
    });
  }
}
