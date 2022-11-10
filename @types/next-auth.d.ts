import { Session } from 'next-auth';
import NextAuth, { DefaultSession, Account, User, CallbacksOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
  }
}
