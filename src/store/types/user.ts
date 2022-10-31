import type { ResponseData, ResponseStatus } from '.';

// auth
export type LoadUserBody = {
  isDark: boolean;
  email: string | null;
  pw: string | null;
  nickname: string | null;
  photoUrl: string | null;
};
export type ThemePayload = {
  isDark: boolean;
};
export type RegisterPayload = {
  email: string | null;
  pw: string | null;
  nickname: string | null;
  photoUrl: string | null;
};
export type LoadUserResponse = ResponseStatus & {
  data: string;
};
