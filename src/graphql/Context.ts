import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../db';

export default class Context {
  req: NextApiRequest;
  res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  async getCurrentUser(): Promise<User | null> {
    const { user: sessionUser } = this.req.session;

    if (sessionUser == null) {
      return null;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: sessionUser.id,
      },
    });

    return user;
  }

  async setupSession(user: User) {
    this.req.session.user = {
      id: user.id,
    };
    await this.req.session.save();
  }

  async destroySession() {
    if (this.req.session.user == null) {
      return false;
    }

    this.req.session.destroy();
    return true;
  }
}
