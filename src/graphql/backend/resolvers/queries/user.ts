import { QueryResolvers, UserRole } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireCurrentUserRole from '../util/requireCurrentUserRole';

export const userResolver: QueryResolvers['user'] = async (
  root,
  args,
  context,
  info
) => {
  await requireCurrentUserRole(
    context,
    UserRole.CommitteeMember,
    UserRole.SystemAdministrator
  );

  const { id } = args;

  const result = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return result;
};
