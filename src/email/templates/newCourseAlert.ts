import { Course, CourseWithSessionInfo, Location } from '@prisma/client';
import Mail from 'nodemailer/lib/mailer';

import { prisma } from '../../db';
interface Options {
  from: string;
  to: string;
  firstName: string;
  newCourses: (CourseWithSessionInfo & {
    defaultLocation: {
      address: string;
    } | null;
  })[];
}

export function newCourseAlert(opts: Options): Mail.Options {
  const { from, to, firstName, newCourses } = opts;

  return {
    from,
    to,
    subject: 'New course from Byte',
    html: `Hi ${firstName},
      <br />
      Below are some new courses from Byte.
      <br />
      <table>
        <tr>
          <th>Course Name</th>
          <th>Location</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
        ${newCourses
          .map((course) => {
            return `<tr>
              <td>${course.name}</td>
              <td>${course.defaultLocation!.address}</td>
              <td>${course.firstSessionStartDate!.toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}</td>
              <td>${course.lastSessionEndDate!.toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}</td>
            </tr>`;
          })
          .join('')}
      </table>
      <br />
      <br />
      <br />
      <br />
      Team BYTE`,
  };
}
