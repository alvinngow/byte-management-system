import { MutationResolvers } from '@bims/graphql/resolvers';
import { GraphQLError } from 'graphql';

import { prisma } from '../../../../db';

export const userEditResolver: MutationResolvers['userEdit'] = async (
  root,
  args,
  context,
  info
) => {
  const {
    clientMutationId,
    id,
    firstName,
    lastName,
    email,
    schoolName,
    mobileNo,
  } = args.input;

  const validEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email.match(validEmail)) {
    throw new GraphQLError('Invalid Email Format, email');
  }
  if (mobileNo.length != 8 || !/^[0-9]*$/.test(mobileNo)) {
    throw new GraphQLError('Invalid Mobile Format, phone');
  }
  if (firstName.length < 1 || lastName.length < 1 || schoolName!.length < 1) {
    throw new GraphQLError('Invalid Name, name');
  }

  if (schoolName) {
    const schoolUpdate = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        school: {
          connectOrCreate: {
            where: {
              name: schoolName,
            },
            create: {
              name: schoolName,
            },
          },
        },
      },
    });
  }

  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email ?? undefined,
      mobileNo: mobileNo,
    },
  });

  return {
    clientMutationId,
    user,
  };
};
