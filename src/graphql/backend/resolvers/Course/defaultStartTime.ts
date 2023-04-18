import { CourseResolvers } from '@bims/graphql/resolvers';
import { DateTime } from 'luxon';

export const Course_defaultStartTimeResolver: CourseResolvers['defaultStartTime'] =
  async (root, args, context, info) => {
    return DateTime.fromJSDate(root.defaultStartTime).toISOTime({
      includeOffset: true,
    });
  };
