import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { SessionResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';

export const Session_attendeesResolver: SessionResolvers['attendees'] = async (
  root,
  args,
  context,
  info
) => {
  await requireAuthenticated(context);

  const { first, after } = args;

  const result = await findManyCursorConnection(
    (args) =>
      prisma.sessionAttendee.findMany({
        ...args,
        where: {
          sessionId: root.id,
        },
      }),
    () =>
      prisma.sessionAttendee.count({
        where: {
          sessionId: root.id,
        },
      }),
    { first, after },
    { resolveInfo: info }
  );

  return result;
};
