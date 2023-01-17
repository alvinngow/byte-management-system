import { getIronSession } from 'iron-session/edge';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ironSessionOptions } from './session/iron-session';

const ROUTES_UNAUTHENTICATED = new Set<string>(['/', '/login']);

const ROUTES_AUTHENTICATED = new Set<string>(['/logout', '/manage/users']);

const isProduction = process.env.NODE_ENV === 'production';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const session = await getIronSession(req, res, ironSessionOptions);

  const { user, creationTime } = session;

  const isUserAuthenticated = user != null;

  /**
   * Auto-renew session cookie if creation date is at least 7 days ago
   */
  if (isUserAuthenticated && Date.now() - creationTime > 604800) {
    session.user = {
      id: user.id,
    };
    session.creationTime = Date.now();
    await session.save();
  }

  const { pathname } = req.nextUrl;

  if (ROUTES_UNAUTHENTICATED.has(pathname)) {
    if (!isUserAuthenticated) {
      return res;
    }

    // Authenticated user, redirect to home
    return NextResponse.redirect(new URL('/home', req.url));
  }

  if (ROUTES_AUTHENTICATED.has(pathname)) {
    if (isUserAuthenticated) {
      return res;
    }

    // Unauthenticated user, redirect to login page
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

export const config = {};
