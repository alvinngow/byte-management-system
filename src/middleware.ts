import { getIronSession } from 'iron-session/edge';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ironSessionOptions } from './session/iron-session';

const ROUTES_UNAUTHENTICATED = ['/login', '/signup'];

const ROUTES_AUTHENTICATED = [
  '/home',
  '/logout',
  '/manage/users',
  '/manage/class',
];

function getRouteType(
  pathname: string
): 'authenticated_only' | 'unauthenticated_only' | 'everyone' {
  for (const route of ROUTES_AUTHENTICATED) {
    if (pathname.startsWith(route)) {
      return 'authenticated_only';
    }
  }
  for (const route of ROUTES_UNAUTHENTICATED) {
    if (pathname.startsWith(route)) {
      return 'unauthenticated_only';
    }
  }

  return 'everyone';
}

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

  const routeType = getRouteType(pathname);

  switch (routeType) {
    case 'unauthenticated_only': {
      if (!isUserAuthenticated) {
        return res;
      }

      // Authenticated user, redirect to home
      return NextResponse.redirect(new URL('/home', req.url));
    }
    case 'authenticated_only': {
      if (isUserAuthenticated) {
        return res;
      }

      // Unauthenticated user, redirect to login page
      return NextResponse.redirect(new URL('/login', req.url));
    }
    default: {
      return res;
    }
  }
}

export const config = {};
