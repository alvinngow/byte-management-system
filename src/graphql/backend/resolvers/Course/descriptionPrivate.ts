import { CourseResolvers } from '@bims/graphql/resolvers';

export const Course_descriptionPrivateResolver: CourseResolvers['descriptionPrivate'] =
  async (root, args, context, info) => {
    const currentUserId = await context.getCurrentUserId();

    if (currentUserId == null) {
      return null;
    }

    return root.descriptionPrivate;
  };
