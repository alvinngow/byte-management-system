import { QueryResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';

export const courseBySlugResolver: QueryResolvers['courseBySlug'] = async (
  root,
  args,
  context,
  info
) => {
  await requireAuthenticated(context);

  const { slug } = args;

  const course = await prisma.courseWithSessionInfo.findFirst({
    where: {
      slug,
    },
  });

  return course;
};
