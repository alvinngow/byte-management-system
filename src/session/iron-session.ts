import { IronSessionOptions } from 'iron-session';

export const ironSessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'bims-cookie',
  cookieOptions: {
    secure:
      process.env.NODE_ENV === 'production' &&
      process.env.PLAYWRIGHT_TEST !== 'true',
    maxAge: 2592000, // 30 days
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: string;
    };
    creationTime: number;
  }
}
