// auth
export type LoadAuthBody = {
  form: string;
  email: string;
  pw: string;
  verifyCode: number;
  isExistTrigger: boolean;
  accessToken: string;
};
export type LoginPayload = {
  email: string | null;
  pw: string | null;
};
export type GooglePayload = {
  accessToken: string | null;
};
export type VerifyEmailPayload = {
  email: string;
  isExistTrigger: boolean;
};
export type VerifyCodePayload = {
  email: string;
  verifyCode: number | string;
};
export type AuthPayload = {
  message: string | null;
  accessToken: string | null;
};

export type LoadAuthResponse = {
  message: string | null;
  accessToken: string | undefined;
  expiryTime: number | undefined;
};
