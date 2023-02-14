-- DropForeignKey
ALTER TABLE "SessionAttendee" DROP CONSTRAINT "SessionAttendee_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "SessionAttendee" DROP CONSTRAINT "SessionAttendee_userId_fkey";

-- AddForeignKey
ALTER TABLE "SessionAttendee" ADD CONSTRAINT "SessionAttendee_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionAttendee" ADD CONSTRAINT "SessionAttendee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
