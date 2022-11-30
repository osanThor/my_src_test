export type LoadBoardsBody = {
  category: string | null;
  title: string | null;
  content: string | null;
  fileUrls: Array<[string]> | [];
};
export type getBoardsPayload = {
  category: string | null;
  page: number | null;
  title: string | null;
  user: string | null;
  comment: string | null;
};
export type GetUserBoardsPayload = {
  category: string | null;
  page: number | null;
};
export type GetUserInquiriesPayload = {
  page: number | null;
};
export type getBoardsResult = {
  total: number;
  boards: Array<{
    id: number;
    title: string;
    hits: number;
    createdAt: string;
    user: {
      nickname: string;
    };
    _count: {
      comments: number;
    };
  }>;
};
export type getUserBoardsResult = {
  total: number | null;
  boards: Array<{
    id: number;
    title: string;
    hits: number;
    createdAt: string;
    _count: {
      comments: number;
    };
  }>;
};
export type getUserInquiriesResult = {
  total: number | null;
  inquiries: Array<{
    id: number;
    answer: null;
    title: string | null;
    createdAt: string;
  }>;
};
export type changePage = {
  page: number;
};
export type LoadBoardsPayload = {
  category: string | null;
  title: string | null;
  content: string | null;
  fileUrls: Array<[string]> | [];
};

export type LoadBoardsResponse = {
  message: string | null;
};
