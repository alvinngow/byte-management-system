import { CourseResolvers } from '@bims/graphql/resolvers';
import { DateTime } from 'luxon';

export const Course_defaultEndTimeResolver: CourseResolvers['defaultEndTime'] =
  async (root, args, context, info) => {
    return DateTime.fromJSDate(root.defaultEndTime).toISOTime({
      includeOffset: true,
    });
  };
