import type { ResponseData, ResponseStatus } from '.';

// auth
export type LoadAuthBody = {
  form: string;
  email: string;
  pw: string;
  verifyCode: number;
  nickname: string;
  photoUrl: string;
};
export type LoginPayload = {
  email: string | null;
  pw: string | null;
};
export type LoadAuthResponse = ResponseStatus & {
  data: ResponseData;
};
