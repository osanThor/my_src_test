export type LoadBoardsBody = {
  category: string | null;
  title: string | null;
  content: string | null;
  fileUrls: Array<string> | [];
};
export type CreateUserInquiruesPayload = {
  title: string | null;
  content: string | null;
  fileUrls: Array<string> | [];
};

export type getBoardsPayload = {
  category: string | null;
  page: number | null;
  title: string | null;
  user: string | null;
  comment: string | null;
};
export type getNoticePayload = {
  category: string | null;
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
export type getNoticeResult =
  | Array<{
      targetCategory: string | null;
      board: {
        id: number;
        title: string;
        hits: number;
        createdAt: string;
        user: {
          nickname: string;
        } | null;
        _count: {
          comments: number;
        };
      };
    }>
  | [];
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
export type getUserCommentsResult = {
  total: number | null;
  comments: Array<{
    content: string | null;
    id: number | null;
    board: {
      createdAt: string;
      hits: number | null;
      title: string | null;
      user: { nickname: string | null };
      _count: { comments: number | null };
    };
  }>;
};
export type getUserCollectionsResult = {
  total: number | null;
  collections: Array<{
    id: number | null;
    board: {
      id: number | null;
      createdAt: string;
      hits: number | null;
      title: string | null;
      user: { nickname: string | null };
      _count: { comments: number | null };
    };
  }>;
};
export type getUserLikesResult = {
  total: number | null;
  likes: Array<{
    id: number | null;
    board: {
      id: number | null;
      createdAt: string;
      hits: number | null;
      title: string | null;
      user: { nickname: string | null };
      _count: { comments: number | null };
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

export type getUserInquiryPayload = {
  inquiryId: number | null;
};
export type getUserInquiryResult = {
  user: { nickname: string; styles: Array<{ name: string }> };
  answer: null;
  content: string | null;
  createdAt: string | null;
  files: Array<{ url: string }> | [];
  title: string | null;
};
export type getBoardPayload = {
  boardId: number | null;
};
export type getBoardResult = {
  id: number;
  title: string | null;
  collectors: Array<{ createdAt: string }> | [];
  likes: Array<{ createdAt: string }> | [];
  user: {
    photoUrl: string | null;
    nickname: string | null;
    styles: Array<{ name: string }> | [];
  };
  createdAt: string | null;
  deletedAt: string | null;
  hits: number | null;
  content: string | null;
  files: Array<string> | [];
  comments:
    | Array<{
        childComment:
          | Array<{
              content: string;
              createdAt: string;
              deletedAt: string | null;
              id: number;
              user: { nickname: string; photoUrl: string | null };
              file: Array<{ name: string }> | null;
            }>
          | [];
        content: string;
        createdAt: string;
        deletedAt: string | null;
        file: Array<{ name: string }> | null;
        id: number;
        user: { nickname: string; photoUrl: string | null };
      }>
    | [];
  _count: {
    likes: number | null;
  };
};
export type updateBoardPayload = {
  boardId: number | null;
  category: string | null;
  title: string | null;
  content: string | null;
  fileUrls: Array<string> | [];
};
export type changePage = {
  page: number;
};
export type changeTitle = {
  title: string | null;
};
export type changeUser = {
  user: string | null;
};
export type changeComment = {
  comment: string | null;
};
export type changeCategory = {
  category: string | null;
};
export type changeParentCommentId = {
  parentCommentId: number | null;
};
export type changeCommentId = {
  commentId: number | null;
};
export type LoadBoardsPayload = {
  category: string | null;
  title: string | null;
  content: string | null;
  fileUrls: Array<string> | [];
};

export type createCommentPayload = {
  boardId: number | null;
  parentCommentId: number | null;
  content: string | null;
  fileUrls: Array<string> | [];
};

export type updateCommentPayload = {
  commentId: number | null;
  parentCommentId: number | null;
  content: string | null;
  fileUrls: Array<string> | [];
};
export type updateCommentStPayload = {
  commentId: number | null;
  parentCommentId: number | null;
  content: string | null;
};
export type deleteCommentPayload = {
  commentId: number | null;
};
export type setBoardCollectionPayload = {
  boardId: number | null;
  isCollect: boolean;
};
export type setBoardLikePayload = {
  boardId: number | null;
  isLike: boolean;
};

export type getUserByNicknamePayload = {
  nickname: string | null;
};
export type getUserByNicknameResult = {
  email: string | null;
  introduction: string | null;
  license: Array<string> | [] | null;
  nickname: string | null;
  nicknamePrev: string | null;
  photoUrl: string | null;
  styles: Array<{ name: string }> | [];
  _count: { boards: number | null; comments: number | null };
};
export type LoadBoardsResponse = {
  message: string | null;
};
