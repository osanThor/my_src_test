//admin boards
export type GetAdminAllBoardsPayload = {
  category: string | null;
  page: number | null;
  title: string | null;
  user: string | null;
} | null;
export type GetAdminBoardDetailPayload = {
  boardId: number | null;
} | null;

export type deleteAdminBoardCommentPayload = {
  commentId: number | null;
};
export type getAdminBoardDetailResult = {
  comments:
    | Array<{
        childComment:
          | Array<{
              content: string;
              createdAt: string;
              deletedAt: string | null;
              file: { url: string } | null;
              id: number;
              user: { nickname: string; photoUrl: string | null };
            }>
          | [];
        content: string;
        createdAt: string;
        deletedAt: string | null;
        id: number;
        file: { url: string } | null;
        user: { nickname: string; photoUrl: string | null };
      }>
    | [];
  content: string | null;
  createdAt: string | null;
  files: [];
  hits: number | null;
  id: number | null;
  title: string | null;
  user: { photoUrl: string | null; nickname: string | null; styles: Array<{ name: string | null }> | [] };
  _count: { likes: number | null };
};

export type getAdminBoardCommentsResult =
  | Array<{
      childComment:
        | Array<{
            content: string;
            createdAt: string;
            deletedAt: string | null;
            file: { url: string } | null;
            id: number;
            user: { nickname: string; photoUrl: string | null };
          }>
        | [];
      content: string;
      createdAt: string;
      deletedAt: string | null;
      id: number;
      file: { url: string } | null;
      user: { nickname: string; photoUrl: string | null };
    }>
  | [];

export type createAdminNoticePayload = {
  title: string | null;
  content: string | null;
  targetCategory: Array<string> | null;
};
export type updateAdminNoticePayload = {
  boardId: number | null;
  title: string | null;
  content: string | null;
  targetCategory: Array<string> | null;
};
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
