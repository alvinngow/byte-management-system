import { NextApiHandler } from 'next';

import { UserRole } from '../../../gen/graphql/resolvers';
import { prisma } from '../../db';
import sendEmail from '../../email/sendEmail';
import { periodicReport } from '../../email/templates/periodicReport';

const { PRIVATE_API_TOKEN } = process.env;

if (PRIVATE_API_TOKEN == null) {
  throw new Error('Private API token not set');
}

const handler: NextApiHandler = async (req, res) => {
  const token = req.headers.authorization?.replace(/^Bearer /i, '');

  if (token !== PRIVATE_API_TOKEN) {
    res.status(403).end();
    return;
  }

  const recipients = await prisma.user.findMany({
    select: {
      email: true,
    },
    where: {
      role: {
        in: [UserRole.CommitteeMember, UserRole.SystemAdministrator],
      },
    },
  });

  res.status(200).end();

  /**
   * TODO: Stats
   */

  await sendEmail(
    periodicReport({
      from: process.env.EMAIL_FROM!,
      bcc: recipients.map((recipient) => recipient.email),
    })
  );
};

export default handler;
