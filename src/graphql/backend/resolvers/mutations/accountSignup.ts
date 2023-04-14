import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { DateTime } from 'luxon';

import { MutationResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import sendEmail from '../../../../email/sendEmail';
import { welcome } from '../../../../email/templates/welcome';

export const accountSignupResolver: MutationResolvers['accountSignup'] = async (
  root,
  args,
  context,
  info
) => {
  const { email, password, firstName, lastName, school, mobileNo } = args.input;

  const hashedPassword = await bcrypt.hash(password, 10);

  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        pwHash: hashedPassword,
        firstName,
        lastName,
        school: {
          connectOrCreate: {
            where: {
              name: school,
            },
            create: {
              name: school,
            },
          },
        },
        mobileNo,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.error(e);
        throw new GraphQLError('Email already in use', {
          extensions: {
            code: 'BAD_REQUEST',
          },
        });
      }
    }

    throw e;
  }
  const emailVerification = await prisma.emailVerification.create({
    data: {
      email,
      expiresAt: DateTime.now().plus({ days: 7 }).toISO(),
    },
  });

  sendEmail(
    welcome({
      from: process.env.EMAIL_FROM!,
      to: `${user.firstName} ${user.lastName} <${user.email}>`,
      firstName: user.firstName,
      verificationId: emailVerification.id,
    })
  );

  return user;
};
