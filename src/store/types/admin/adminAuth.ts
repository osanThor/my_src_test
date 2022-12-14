//admin auth
export type adminLoginPayload = {
  email: string | null;
  pw: string | null;
};

export type LoadAdminAuthResponse = {
  message: string | undefined;
  accessToken: string | undefined;
  expiryTime: number | undefined;
};
