-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notifyUpcomingSessions" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "upcomingSessionTimeBefore" INTEGER NOT NULL DEFAULT 3;
