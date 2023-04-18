import { QueryResolvers } from '@bims/graphql/resolvers';

import { prisma } from '../../../../db';

export const courseBySlugResolver: QueryResolvers['courseBySlug'] = async (
  root,
  args,
  context,
  info
) => {
  const { slug } = args;

  const course = await prisma.courseWithSessionInfo.findFirst({
    where: {
      slug,
    },
  });

  return course;
};
