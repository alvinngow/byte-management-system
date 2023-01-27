-- AlterTable
ALTER TABLE "SessionAttendee" ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "SessionAttendee_pkey" PRIMARY KEY ("id");
