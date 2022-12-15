//admin boards
export type GetAdminAllBoardsPayload = {
  category: string | null;
  page: number | null;
  title: string | null;
  user: string | null;
} | null;
export type GetAdminAllBoardsResult = {
  total: number | null;
  boards: Array<{
    category: string | null;
    createdAt: string | null;
    hits: number | null;
    id: number | null;
    title: string | null;
    user: {
      email: string | null;
      nickname: string | null;
    };
  }> | null;
} | null;

export type LoadAdminBoardsResponse = {
  message: string | null;
};
