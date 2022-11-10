import NextAuth from 'next-auth';

// type
import type { UserWithPhoto } from '@src/types';

// 여기서 재정의한 타입이 "session.user"의 타입으로 정의됨
declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: unknown;
      refreshToken: unknown;
      username: unknown;
      idx: number;
      id: string;
      name: string;
    };
  }
}
