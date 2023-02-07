import { QueryResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';

export const courseResolver: QueryResolvers['course'] = async (
  root,
  args,
  context,
  info
) => {
  await requireAuthenticated(context);

  const { id } = args;

  const course = await prisma.course.findFirst({
    where: {
      id,
    },
  });

  return course;
};
