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
export type EditMyProfilePayload = {
  pw: string | null;
  pwConfirm: string | null;
  nickname: string | null;
  photoUrl: string | null;
  introduction: string | null;
  styles: Array<{ name: string }> | [];
};

export type ThemePayload = {
  isDark: boolean;
};
export type CheckNicknamePayload = {
  nickname: string | null;
};
export type CheckNicknameRes = {};

export type ChangePwFormPayload = {
  oldPw: string | null;
  newPw: string | null;
  pwConfirm: string | null;
};

export type ChangePwPayload = {
  oldPw: string | null;
  newPw: string | null;
};

export type RegisterPayload = {
  email: string | null;
  pw: string | null;
  nickname: string | null;
  photoUrl: string | null;
};
export type UserProfilePayload = {
  photoUrl: string | null;
  email: string | null;
  nicknamePrev: string | null;
  nickname: string | null;
  licenses: Array<string> | [];
  styles: Array<{ name: string }> | [];
  introduction: string | null;
  _count: {
    boards: number | null;
    comments: number | null;
  };
};

export type UpdateUserProfilePayload = {
  photoUrl: string | null;
  nickname: string | null;
  styles: Array<string> | [];
  introduction: string | null;
};

export type DeleteUserPayload = {
  email: string | null;
  pw: string | null;
};

export type GetUserBoardsPayload = {
  category: string | null;
  page: number | null;
};

export type CreateUserInquiruesPayload = {
  title: string | null;
  content: string | null;
  fileUrls: Array<string> | [];
};
export type getUserBoardsResult = Array<{
  id: number;
  title: string;
  hits: number;
  createdAt: string;
  _count: {
    comments: number;
  };
}>;
export type LoadUserResponse = {
  message: string | boolean | null;
};
