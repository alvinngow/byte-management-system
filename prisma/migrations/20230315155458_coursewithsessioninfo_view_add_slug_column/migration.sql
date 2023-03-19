-- DropView
DROP VIEW "CourseWithSessionInfo";

-- CreateView
CREATE VIEW "CourseWithSessionInfo" AS
SELECT
  *
FROM
  "Course"
  LEFT JOIN (
    SELECT
      "courseId",
      MIN("startDate") AS "firstSessionStartDate",
      MAX("endDate") AS "lastSessionEndDate"
    FROM
      "Session"
    GROUP BY
      "courseId") s ON s. "courseId" = "Course".id
