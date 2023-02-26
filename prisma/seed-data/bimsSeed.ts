import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { DateTime } from 'luxon';

import {
  readCourseManagers,
  readCourses,
  readLocationClusterLocations,
  readLocationClusters,
  readLocationClusterSubscriptions,
  readLocations,
  readSchools,
  readSessionAttendees,
  readSessions,
  readUsers,
} from './data';

const prisma = new PrismaClient();

export default async function bimsSeed() {
  /**
   * Seed all schools
   */
  const schools = await readSchools();

  /**
   * Map of school name to school id
   */
  const schoolsIdMap: Record<string, string> = {};

  for (const school of schools) {
    const createdSchool = await prisma.school.upsert({
      where: {
        name: school.name,
      },
      update: {},
      create: {
        name: school.name,
        id: school.id,
      },
    });

    schoolsIdMap[createdSchool.name] = createdSchool.id;
  }

  /**
   * Seed all users
   */
  const users = await readUsers();

  /**
   * Map of user schoolId to school id
   */
  const usersIdMap: Record<string, string> = {};

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await prisma.user.upsert({
      where: {
        id: user.id,
      },
      update: {
        email: user.email,
        pwHash: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        schoolId: user.schoolId,
        mobileNo: user.mobileNo,
        avatar: user.avatar || null,
        role: user.role,
      },
      create: {
        id: user.id,
        email: user.email,
        pwHash: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        schoolId: schoolsIdMap[user.id],
        mobileNo: user.mobileNo,
        avatar: user.avatar || null,
        role: user.role,
      },
    });

    usersIdMap[createdUser.email] = createdUser.id;
  }

  /**
   * Location Clusters
   */

  const locationClusters = await readLocationClusters();

  const locationClustersIdMap: Record<string, string> = {};

  for (const locationCluster of locationClusters) {
    const createdLocationCluster = await prisma.locationCluster.upsert({
      where: {
        id: locationCluster.id,
      },
      update: {
        name: locationCluster.name,
      },
      create: {
        id: locationCluster.id,
        name: locationCluster.name,
      },
    });

    locationClustersIdMap[createdLocationCluster.name] =
      createdLocationCluster.id;
  }

  /**
   * Locations
   */
  const locations = await readLocations();

  const locationsIdMap: Record<string, string> = {};

  for (const location of locations) {
    const createdLocation = await prisma.location.upsert({
      where: {
        id: location.id,
      },
      update: location,
      create: location,
    });

    locationsIdMap[createdLocation.name] = createdLocation.id;
  }

  /**
   * LocationClusterLocations
   */
  const locationClusterLocations = await readLocationClusterLocations();

  for (const locationClusterLocation of locationClusterLocations) {
    await prisma.locationClusterLocation.upsert({
      where: {
        clusterId_locationId: {
          clusterId:
            locationClustersIdMap[locationClusterLocation.cluster_name],
          locationId: locationsIdMap[locationClusterLocation.location_name],
        },
      },
      update: {},
      create: {
        clusterId: locationClustersIdMap[locationClusterLocation.cluster_name],
        locationId: locationsIdMap[locationClusterLocation.location_name],
      },
    });
  }

  /**
   * LocationClusterSubscriptions
   */
  const locationClusterSubscriptions = await readLocationClusterSubscriptions();

  for (const locationClusterSubscription of locationClusterSubscriptions) {
    await prisma.locationClusterSubscription.upsert({
      where: {
        clusterId_userId: {
          clusterId:
            locationClustersIdMap[locationClusterSubscription.cluster_name],
          userId: usersIdMap[locationClusterSubscription.user_email],
        },
      },
      update: {},
      create: {
        clusterId:
          locationClustersIdMap[locationClusterSubscription.cluster_name],
        userId: usersIdMap[locationClusterSubscription.user_email],
      },
    });
  }

  /**
   * Courses
   */
  const courses = await readCourses();

  const coursesIdMap: Record<string, string> = {};

  for (const course of courses) {
    const createdCourse = await prisma.course.upsert({
      where: {
        id: course.id,
      },
      update: {},
      create: {
        id: course.id,
        name: course.name,
        description: course.description,
        defaultStartTime: DateTime.fromSQL(course.defaultStartTime).toJSDate(),
        defaultEndTime: DateTime.fromSQL(course.defaultEndTime).toJSDate(),
        defaultLocationId: course.defaultLocationId,
      },
    });

    coursesIdMap[createdCourse.name] = createdCourse.id;
  }

  /**
   * Sessions
   */
  const sessions = await readSessions();

  const sessionsIdMap: Record<string, string> = {};

  for (const session of sessions) {
    const createdSession = await prisma.session.upsert({
      where: {
        id: session.id,
      },
      update: {},
      create: {
        id: session.id,
        name: session.name,
        description: session.description,
        overrideStartTime: session.overrideStartTime
          ? DateTime.fromSQL(session.overrideStartTime).toJSDate()
          : undefined,
        overrideEndTime: session.overrideEndTime
          ? DateTime.fromSQL(session.overrideEndTime).toJSDate()
          : undefined,
        startDate: DateTime.fromSQL(session.startDate).toJSDate(),
        endDate: DateTime.fromSQL(session.endDate).toJSDate(),
        courseId: session.courseId,
        overrideLocationId: session.overrideLocationId,
      },
    });

    sessionsIdMap[createdSession.name] = createdSession.id;
  }

  /**
   * Course Managers
   */
  const courseManagers = await readCourseManagers();

  for (const courseManager of courseManagers) {
    await prisma.courseManager.upsert({
      where: {
        courseId_userId: {
          courseId: coursesIdMap[courseManager.course_name],
          userId: usersIdMap[courseManager.user_email],
        },
      },
      update: {},
      create: {
        courseId: coursesIdMap[courseManager.course_name],
        userId: usersIdMap[courseManager.user_email],
      },
    });
  }

  /**
   * Session Attendees
   */
  const sessionAttendees = await readSessionAttendees();

  for (const sessionAttendee of sessionAttendees) {
    await prisma.sessionAttendee.upsert({
      where: {
        sessionId_userId: {
          sessionId: sessionsIdMap[sessionAttendee.session_name],
          userId: usersIdMap[sessionAttendee.user_email],
        },
      },
      update: {
        indicatedAttendance: sessionAttendee.indicatedAttendance,
        actualAttendance: sessionAttendee.actualAttendance,
      },
      create: {
        sessionId: sessionsIdMap[sessionAttendee.session_name],
        userId: usersIdMap[sessionAttendee.user_email],
        indicatedAttendance: sessionAttendee.indicatedAttendance,
        actualAttendance: sessionAttendee.actualAttendance,
      },
    });
  }
}
