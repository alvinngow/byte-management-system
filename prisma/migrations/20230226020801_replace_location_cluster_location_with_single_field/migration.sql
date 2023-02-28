/*
  Warnings:

  - You are about to drop the `LocationClusterLocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LocationClusterLocation" DROP CONSTRAINT "LocationClusterLocation_clusterId_fkey";

-- DropForeignKey
ALTER TABLE "LocationClusterLocation" DROP CONSTRAINT "LocationClusterLocation_locationId_fkey";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "locationClusterId" UUID;

-- DropTable
DROP TABLE "LocationClusterLocation";

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_locationClusterId_fkey" FOREIGN KEY ("locationClusterId") REFERENCES "LocationCluster"("id") ON DELETE SET NULL ON UPDATE CASCADE;
