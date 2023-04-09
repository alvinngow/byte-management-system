-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nearRegion" TEXT,
ADD COLUMN     "notifyNearNewCourse" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notifyNewCourse" BOOLEAN NOT NULL DEFAULT true;
