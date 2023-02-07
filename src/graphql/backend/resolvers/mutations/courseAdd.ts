import { DateTime } from 'luxon';

import {
  MutationResolvers,
  UserRole,
} from '../../../../../gen/graphql/resolvers';
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
  } = args.input;

  const course = await prisma.course.create({
    data: {
      name: courseName,
      description: courseDescription,
      descriptionPrivate: courseDescriptionPrivate ?? undefined,
      subtitle: courseSubtitle,
      coverImage: courseCoverFilename,
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
            locationClusterLocations:
              locationClusterId != null
                ? {
                    create: {
                      clusterId: locationClusterId,
                    },
                  }
                : undefined,
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
