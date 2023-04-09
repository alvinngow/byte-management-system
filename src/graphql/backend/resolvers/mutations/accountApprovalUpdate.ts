import {
  MutationResolvers,
  UserRole,
} from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import sendEmail from '../../../../email/sendEmail';
import { approved } from '../../../../email/templates/approved';
import requireCurrentUserRole from '../util/requireCurrentUserRole';

export const accountApprovalUpdateResolver: MutationResolvers['accountApprovalUpdate'] =
  async (root, args, context, info) => {
    const { clientMutationId, userId } = args.input;

    await requireCurrentUserRole(context, UserRole.SystemAdministrator);

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        approved_at: new Date(),
      },
    });

    sendEmail(
      approved({
        from: process.env.EMAIL_FROM!,
        to: `${user.firstName} ${user.lastName} <${user.email}>`,
        firstName: user.firstName,
      })
    );

    return {
      clientMutationId,
      user,
    };
  };
