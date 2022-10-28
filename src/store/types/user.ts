import type { ResponseData, ResponseStatus } from '.';

// auth
export type LoadUserBody = {
  isDark: boolean;
};
export type ThemePayload = {
  isDark: boolean;
};

export type LoadUserResponse = ResponseStatus & {
  data: ResponseData;
};
