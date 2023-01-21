import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import {
  readLocationClusters,
  readLocations,
  readSchools,
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
        avatar: user.avatar,
        role: user.role,
      },
      create: {
        id: user.id,
        email: user.email,
        pwHash: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        schoolId: user.schoolId,
        mobileNo: user.mobileNo,
        avatar: user.avatar,
        role: user.role,
      },
    });

    usersIdMap[createdUser.email] = createdUser.id;
  }

  /**
   * Location Clusters
   */

  const locationClusters = await readLocationClusters();

  for (const locationCluster of locationClusters) {
    await prisma.locationCluster.upsert({
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
  }

  /**
   * Locations
   */
  const locations = await readLocations();

  for (const location of locations) {
    await prisma.location.upsert({
      where: {
        id: location.id,
      },
      update: location,
      create: location,
    });
  }
}
