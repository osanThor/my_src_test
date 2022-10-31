import type { ResponseData, ResponseStatus } from '.';

// auth
export type LoadAuthBody = {
  form: string;
  email: string;
  pw: string;
  verifyCode: number;
  isExistTrigger: boolean;
};
export type LoginPayload = {
  email: string | null;
  pw: string | null;
};
export type VerifyEmail = {
  email: string;
  isExistTrigger: boolean;
};

export type LoadAuthResponse = ResponseStatus & {
  data: string;
};
