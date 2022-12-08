import { parseResolveInfo } from 'graphql-parse-resolve-info';

import { QueryResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';

export const meResolver: QueryResolvers['me'] = async (
  root,
  args,
  context,
  info
) => {
  const currentUserId = context.getCurrentUserId();

  if (currentUserId == null) {
    throw new Error('unauthorised');
  }

  const parsedResolveInfo = parseResolveInfo(info);
  const currentUserFields = parsedResolveInfo?.fieldsByTypeName?.CurrentUser;
  const hasSchoolField =
    currentUserFields != null && 'school' in currentUserFields;

  const currentUser = await prisma.user.findFirst({
    include: {
      school: hasSchoolField,
    },
    where: {
      id: currentUserId,
    },
  });

  return currentUser;
};
