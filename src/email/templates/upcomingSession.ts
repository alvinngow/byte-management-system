import { SessionAttendee } from '@prisma/client';
import { DateTime } from 'luxon';
import Mail from 'nodemailer/lib/mailer';

import { prisma } from '../../db';
interface Options {
  from: string;
  to: string;
  firstName: string;
  withinRange: (SessionAttendee & {
    session: {
      name: String;
      startDate: Date;
      endDate: Date;
      course: {
        name: String;
      };
    };
  })[];
}

export function upcomingSession(opts: Options): Mail.Options {
  const { from, to, firstName, withinRange } = opts;

  return {
    from,
    to,
    subject: 'Byte upcoming session reminder',
    html: `Hi ${firstName},
      <br />
      These are your upcoming session(s):
      <br />
      <table>
        <tr>
          <th>Course Name</th>
          <th>Start Date</th>
        </tr>
        ${withinRange
          .map((sessionAttendee) => {
            return `<tr>
              <td>${sessionAttendee.session.course.name}</td>
              <td>${sessionAttendee.session.startDate!.toLocaleString('en-US', {
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
