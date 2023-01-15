-- CreateTable
CREATE TABLE "Location" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "clusterId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationCluster" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "LocationCluster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationClusterSubscription" (
    "clusterId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "serialNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "remarks" TEXT,
    "qty" INTEGER NOT NULL,
    "decommissionAt" TIMESTAMP(3),
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItemMovementLog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "authorId" UUID NOT NULL,
    "locationId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryItemMovementLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "overrideStartTime" TIMETZ(2),
    "overrideEndTime" TIMETZ(2),
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "courseId" UUID NOT NULL,
    "overrideLocationId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "defaultStartTime" TIMETZ(2) NOT NULL,
    "defaultEndTime" TIMETZ(2) NOT NULL,
    "defaultLocationId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseManager" (
    "courseId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "SessionAttendee" (
    "sessionId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "indicatedAttendance" TEXT NOT NULL,
    "actualAttendance" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LocationClusterSubscription_clusterId_userId_key" ON "LocationClusterSubscription"("clusterId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseManager_courseId_userId_key" ON "CourseManager"("courseId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SessionAttendee_sessionId_userId_key" ON "SessionAttendee"("sessionId", "userId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "LocationCluster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationClusterSubscription" ADD CONSTRAINT "LocationClusterSubscription_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "LocationCluster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationClusterSubscription" ADD CONSTRAINT "LocationClusterSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItemMovementLog" ADD CONSTRAINT "InventoryItemMovementLog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItemMovementLog" ADD CONSTRAINT "InventoryItemMovementLog_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_overrideLocationId_fkey" FOREIGN KEY ("overrideLocationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_defaultLocationId_fkey" FOREIGN KEY ("defaultLocationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseManager" ADD CONSTRAINT "CourseManager_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseManager" ADD CONSTRAINT "CourseManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionAttendee" ADD CONSTRAINT "SessionAttendee_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionAttendee" ADD CONSTRAINT "SessionAttendee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
