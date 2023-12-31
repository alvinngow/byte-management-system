import { MutationResolvers } from '@bims/graphql/resolvers';
import { UserRole } from '@bims/graphql/schema';
import { DateTime } from 'luxon';
import slugify from 'slugify';

import { prisma } from '../../../../db';
import requireCurrentUserRole from '../util/requireCurrentUserRole';

export const courseAddResolver: MutationResolvers['courseAdd'] = async (
  root,
  args,
  context,
  info
) => {
  await requireCurrentUserRole(
    context,
    UserRole.CommitteeMember,
    UserRole.SystemAdministrator
  );

  const {
    courseName,
    courseDescription,
    courseSubtitle,
    courseDescriptionPrivate,
    courseCoverFilename,
    courseDefaultStartTime,
    courseDefaultEndTime,
    clientMutationId,
    locationDescription,
    locationClusterId,
    locationAddress,
    locationLat,
    locationName,
    locationLng,
    locationUnit,
  } = args.input;

  const course = await prisma.course.create({
    data: {
      name: courseName,
      description: courseDescription,
      descriptionPrivate: courseDescriptionPrivate ?? undefined,
      subtitle: courseSubtitle,
      coverImage: courseCoverFilename,
      slug: slugify(courseName, { lower: true }),
      defaultStartTime: DateTime.fromJSDate(
        courseDefaultStartTime as unknown as Date
      ).toJSDate(),
      defaultEndTime: DateTime.fromJSDate(
        courseDefaultEndTime as unknown as Date
      ).toJSDate(),
      defaultLocation: {
        connectOrCreate: {
          where: {
            name: locationName,
          },
          create: {
            name: locationName,
            address: locationAddress,
            description: locationDescription,
            lat: locationLat,
            lng: locationLng,
            unit: locationUnit,
            locationClusterId: locationClusterId,
          },
        },
      },
    },
  });

  return {
    clientMutationId,
    course,
  };
};
