export type LoadBoardsBody = {
  category: string | null;
  title: string | null;
  content: string | null;
  fileUrls: Array<[string]> | [];
};

export type LoadBoardsResponse = {
  message: string | null;
};
