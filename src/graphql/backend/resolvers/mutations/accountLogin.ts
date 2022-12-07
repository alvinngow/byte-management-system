import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';

import { MutationResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';

export const accountLoginResolver: MutationResolvers['accountLogin'] = async (
  root,
  args,
  context,
  info
) => {
  const { email, password } = args.input;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user == null) {
    throw new GraphQLError('Unauthorized', {
      extensions: {
        code: 'UNAUTHORIZED',
      },
    });
  }

  const isMatched = await bcrypt.compare(password, user.pwHash);

  if (!isMatched) {
    throw new GraphQLError('Unauthorized', {
      extensions: {
        code: 'UNAUTHORIZED',
      },
    });
  }

  await context.setupSession(user);

  return user;
};
