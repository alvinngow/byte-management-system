import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../db';

/**
 * Context class for GraphQL resolvers
 */
export class Context {
  req: NextApiRequest;
  res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  getCurrentUserId(): string | null {
    const { user: sessionUser } = this.req.session;

    if (sessionUser == null) {
      return null;
    }

    return sessionUser.id;
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
    this.req.session.creationTime = Date.now();
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
