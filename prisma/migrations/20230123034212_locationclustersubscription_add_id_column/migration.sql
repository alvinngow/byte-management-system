-- AlterTable
ALTER TABLE "LocationClusterSubscription" ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "LocationClusterSubscription_pkey" PRIMARY KEY ("id");
