-- AlterTable
ALTER TABLE "LocationClusterLocation" ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "LocationClusterLocation_pkey" PRIMARY KEY ("id");
