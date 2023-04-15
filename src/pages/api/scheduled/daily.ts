import { NextApiHandler } from 'next';

import { jobNewCourseAlert } from '../../../jobs/jobNewCourseAlert';
import { jobUpcomingSessions } from '../../../jobs/jobUpcomingSessions';

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

  await jobNewCourseAlert();
  await jobUpcomingSessions();

  res.status(200).end();
};

export default handler;
