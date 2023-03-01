-- DropForeignKey
ALTER TABLE "CourseManager" DROP CONSTRAINT "CourseManager_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseManager" DROP CONSTRAINT "CourseManager_userId_fkey";

-- AddForeignKey
ALTER TABLE "CourseManager" ADD CONSTRAINT "CourseManager_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseManager" ADD CONSTRAINT "CourseManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
