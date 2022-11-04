// auth
export type LoadUserBody = {
  isDark: boolean;
  email: string | null;
  pw: string | null;
  username: string | null;
  pwConfirm: string | null;
  nickname: string | null;
  photoUrl: string | null;
};
export type RegisterBody = {
  email: string | null;
  pw: string | null;
  pwConfirm: string | null;
  verifyCode: number | string | null;
  nickname: string | null;
  photoUrl: string | null;
};
export type TelegramPayload = {
  username: string | null;
};

export type ThemePayload = {
  isDark: boolean;
};
export type CheckNicknamePayload = {
  nickname: string | null;
};
export type CheckNicknameRes = {};
export type RegisterPayload = {
  email: string | null;
  pw: string | null;
  nickname: string | null;
  photoUrl: string | null;
};
export type LoadUserResponse = {
  message: string | boolean | null;
};
