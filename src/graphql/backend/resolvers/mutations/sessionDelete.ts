import { MutationResolvers } from '@bims/graphql/resolvers';

import { prisma } from '../../../../db';

export const sessionDeleteResolver: MutationResolvers['sessionDelete'] = async (
  root,
  args,
  context,
  info
) => {
  const { clientMutationId, sessionId } = args.input;

  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });

  return {
    clientMutationId,
    ok: true,
  };
};
