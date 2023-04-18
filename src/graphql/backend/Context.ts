import { UserRole } from '@bims/graphql/schema';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../db';

/**
 * Context class for GraphQL resolvers
 */
export class Context {
  req: NextApiRequest;
  res: NextApiResponse;
  private _state: Record<string, any> = {};

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
    const currentUserId = this.getCurrentUserId();

    if (currentUserId == null) {
      return null;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: currentUserId,
      },
    });

    return user;
  }

  async getCurrentUserRole(): Promise<UserRole | null> {
    const currentUserId = this.getCurrentUserId();

    if (currentUserId == null) {
      return null;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: currentUserId,
      },
      select: {
        role: true,
      },
    });

    if (user == null) {
      return null;
    }

    return user.role as UserRole;
  }

  async setupSession(user: User) {
    this.req.session.user = user;
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

  getStateValue<T>(key: string) {
    if (key in this._state) {
      return this._state[key] as T;
    }

    return null;
  }

  setStateValue(partialState: Record<string, any>) {
    for (const [key, value] of Object.entries(partialState)) {
      this._state[key] = value;
    }
  }
}
