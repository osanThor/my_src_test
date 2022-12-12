export type getAdminUsersPayload = {
  page: number | null;
};

export type getAdminUsersResult = Array<{
  photoUrl: string | null;
  nickname: string | null;
  email: string | null;
  snsType: string | null;
  license:
    | Array<{
        package: string | null;
      }>
    | {
        package: string | null;
      }
    | null;
  grade: string | null;
  createdAt: string | null;
}>;
export type adminUserDetailPayload = {
  email: string | null;
};
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
