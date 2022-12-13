export type getAdminUsersPayload = {
  page: number | null;
};

export type getAdminUsersResult = Array<{
  photoUrl: string | null;
  nickname: string | null;
  email: string | null;
  snsType: string | null;
  license: {
    package: string | null;
  } | null;
  grade: string | null;
  createdAt: string | null;
}>;
export type adminUserDetailPayload = {
  email: string | null;
};
export type getAdminUserDetailResult = {
  email: string | null;
  nickname: string | null;
  nicknamePrev: string | null;
  introduction: string | null;
  styles: Array<{ name: string | null }> | null;
  grade: string | null;
  license: {
    package: string | null;
    startedAt: string | null;
    endedAt: string | null;
  };
  telegrams: Array<{
    id: string | null;
    name: string | null;
  }> | null;
  exchanges: Array<{
    platform: string | null;
    alias: string | null;
    apiKey: string | null;
  }>;
} | null;
export type adminTelegramUsersNotice = {
  contents: Array<string> | [];
};
export type adminTelegramUsersMessage = {
  contents: Array<string> | [];
  idList: Array<string> | [];
};

export type LoadAdminUsersResponse = {
  message: string | null;
};
