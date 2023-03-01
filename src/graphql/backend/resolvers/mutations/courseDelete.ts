import {
  MutationResolvers,
  UserRole,
} from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireCurrentUserRole from '../util/requireCurrentUserRole';

export const courseDeleteResolver: MutationResolvers['courseDelete'] = async (
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

  const { clientMutationId, courseId } = args.input;

  await prisma.course.delete({
    where: {
      id: courseId,
    },
  });

  return {
    clientMutationId,
    ok: true,
  };
};
