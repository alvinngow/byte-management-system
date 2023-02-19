-- DropForeignKey
ALTER TABLE "LocationClusterSubscription" DROP CONSTRAINT "LocationClusterSubscription_userId_fkey";

-- AddForeignKey
ALTER TABLE "LocationClusterSubscription" ADD CONSTRAINT "LocationClusterSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
