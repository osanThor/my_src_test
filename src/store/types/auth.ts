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
export type VerifyEmailPayload = {
  email: string;
  isExistTrigger: boolean;
};
export type VerifyCodePayload = {
  email: string;
  verifyCode: number | string;
};

export type LoadAuthResponse = {
  message: string;
};
