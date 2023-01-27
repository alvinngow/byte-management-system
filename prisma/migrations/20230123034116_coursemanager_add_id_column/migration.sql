-- AlterTable
ALTER TABLE "CourseManager" ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "CourseManager_pkey" PRIMARY KEY ("id");
