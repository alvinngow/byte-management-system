import { DateTime } from 'luxon';

import { CourseResolvers } from '../../../../../gen/graphql/resolvers';

export const Course_defaultEndTimeResolver: CourseResolvers['defaultEndTime'] =
  async (root, args, context, info) => {
    return DateTime.fromJSDate(root.defaultEndTime).toISOTime({
      includeOffset: true,
    });
  };
