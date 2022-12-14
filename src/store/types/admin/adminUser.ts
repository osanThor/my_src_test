export type getAdminUsersPayload = {
  page: number | null;
  snsType: string | null;
  nickname: string | null;
  licensePackage: string | null;
  grade: string | null;
  email: string | null;
};

export type getAdminUsersResult = {
  total: number | null;
  users: Array<{
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
};
export type adminUserDetailPayload = {
  email: string | null;
};
export type getAdminUserDetailResult = {
  photoUrl: string | null;
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
    id: string | null;
    platform: string | null;
    alias: string | null;
    apiKey: string | null;
    connectionStatus: string | null;
  }> | null;
} | null;
export type adminTelegramUsersNotice = {
  contents: Array<string> | [];
};
export type adminTelegramUsersMessage = {
  contents: Array<string> | [];
  idList: Array<string> | [];
};

export type changePagePayload = {
  page: number | null;
};
export type changeSnsTypePayload = {
  snsType: string | null;
};
export type changeNicknamePayload = {
  nickname: string | null;
};
export type changelicensePackagePayload = {
  licensePackage: string | null;
};
export type changeGradePayload = {
  grade: string | null;
};
export type changeEmailPayload = {
  email: string | null;
};

export type LoadAdminUsersResponse = {
  message: string | null;
};
