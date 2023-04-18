import { MutationResolvers } from '@bims/graphql/resolvers';
import { UserRole } from '@bims/graphql/schema';
import { GraphQLError } from 'graphql/index';

import { prisma } from '../../../../db';
import sendEmail from '../../../../email/sendEmail';
import { newVerifiedUser } from '../../../../email/templates/newVerifiedUser';

export const accountVerifyUpdateResolver: MutationResolvers['accountVerifyUpdate'] =
  async (root, args, context, info) => {
    const { clientMutationId, emailVerificationId } = args.input;

    const emailVerification = await prisma.emailVerification.findFirst({
      where: {
        id: emailVerificationId,
      },
      select: {
        email: true,
      },
    });

    if (emailVerification == null) {
      throw new GraphQLError('Record not found', {
        extensions: {
          code: 'NOT_FOUND',
        },
      });
    }

    const user = await prisma.user.update({
      where: {
        email: emailVerification.email,
      },
      data: {
        verified_at: new Date(),
      },
    });

    const systemAdministrators = await prisma.user.findMany({
      where: {
        role: UserRole.SystemAdministrator,
      },
      select: {
        email: true,
      },
    });

    sendEmail(
      newVerifiedUser({
        from: process.env.EMAIL_FROM!,
        bcc: systemAdministrators.map((sysAdminUser) => sysAdminUser.email),
        userEmail: user.email,
        userName: user.firstName + '' + user.lastName,
      })
    );

    return {
      clientMutationId,
      ok: true,
    };
  };
