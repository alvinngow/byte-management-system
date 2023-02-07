import { DateTime } from 'luxon';

import { CourseResolvers } from '../../../../../gen/graphql/resolvers';

export const Course_defaultStartTimeResolver: CourseResolvers['defaultStartTime'] =
  async (root, args, context, info) => {
    return DateTime.fromJSDate(root.defaultStartTime).toISOTime({
      includeOffset: true,
    });
  };
