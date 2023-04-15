import { NextApiHandler } from 'next';

import { jobWeeklyNewCourseAlert } from '../../../jobs/jobWeeklyNewCourseAlert';

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

  await jobWeeklyNewCourseAlert();

  res.status(200).end();
};

export default handler;
