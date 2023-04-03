import { QueryResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';

export const courseResolver: QueryResolvers['course'] = async (
  root,
  args,
  context,
  info
) => {
  const { id } = args;

  const course = await prisma.courseWithSessionInfo.findFirst({
    where: {
      id,
    },
  });

  return course;
};
