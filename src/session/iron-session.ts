import { IronSessionOptions } from 'iron-session';

export const ironSessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'bims-cookie',
  cookieOptions: {
    secure:
      process.env.NODE_ENV === 'production' &&
      process.env.CYPRESS_TEST !== 'true',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: string;
    };
  }
}
