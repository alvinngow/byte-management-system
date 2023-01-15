-- CreateTable
CREATE TABLE "LocationClusterLocation" (
    "locationId" UUID NOT NULL,
    "clusterId" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "LocationClusterLocation_clusterId_locationId_key" ON "LocationClusterLocation"("clusterId", "locationId");

-- AddForeignKey
ALTER TABLE "LocationClusterLocation" ADD CONSTRAINT "LocationClusterLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationClusterLocation" ADD CONSTRAINT "LocationClusterLocation_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "LocationCluster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
