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
export type LoadBoardsPayload = {
  category: string | null;
  title: string | null;
  content: string | null;
  fileUrls: Array<[string]> | [];
};

export type LoadBoardsResponse = {
  message: string | null;
};
