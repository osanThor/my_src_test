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
export type updateUserInquiruesPayload = {
  inquiryId: number | null;
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
    deletedAt: string | null;
    user: {
      nickname: string;
      styles: Array<{ name: string }> | null;
      photoUrl: string | null;
    };
    strategy: {
      calcMdd: number | null;
      calcProfitPct: number | null;
      calcWinningPct: number | null;
      communities: Array<{ channel: string | null; url: string | null }> | null;
    };
    _count: {
      comments: number;
    };
  }>;
};
export type getNoticeResult = Array<{
  targetCategory: string | null;
  board: {
    id: number;
    title: string;
    hits: number;
    createdAt: string;
    deletedAt: string | null;
    user: {
      nickname: string;
    } | null;
    _count: {
      comments: number;
    };
  };
}> | null;
export type getUserBoardsResult = {
  total: number | null;
  boards: Array<{
    id: number;
    title: string;
    hits: number;
    createdAt: string;
    deletedAt: string | null;
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
      id: number | null;
      createdAt: string;
      deletedAt: string | null;
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
      deletedAt: string | null;
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
      deletedAt: string | null;
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
    deletedAt: string | null;
  }>;
};

export type getUserInquiryPayload = {
  inquiryId: number | null;
};
export type getRankingPayload = {
  period: string | null;
};
export type getRankingResult = {
  message: string | null;
  popularityStrategies: Array<{
    board: {
      id: number | null;
      title: string | null;
      user: { nickname: string | null; photoUrl: string | null } | null;
      _count: {
        likes: number | null;
        collectors: number | null;
      };
    };
  }> | null;
  profitPctStrategies: Array<{
    board: {
      id: number | null;
      title: string | null;
      user: { nickname: string | null; photoUrl: string | null } | null;
    };
    profitPct: number | null;
  }>;
  profitPctTraders: Array<{
    user: {
      nickname: string | null;
      photoUrl: string | null;
    };
    totalProfit: number | null;
  }> | null;
  profitTraders: Array<{
    user: {
      nickname: string | null;
      photoUrl: string | null;
    };
    profit: number | null;
  }> | null;
} | null;
export type getUserInquiryResult = {
  user: { nickname: string; styles: Array<{ name: string }> };
  answer: null;
  content: string | null;
  createdAt: string | null;
  deletedAt: string | null;
  files: Array<{ url: string }> | [];
  title: string | null;
};
export type getBoardPayload = {
  boardId: number | null;
};
export type getBoardResult = {
  category: string | null;
  id: number;
  title: string | null;
  collectors: Array<{ createdAt: string }> | [];
  likes: Array<{ createdAt: string }> | [];
  user: {
    photoUrl: string | null;
    nickname: string | null;
    styles: Array<{ name: string }> | [];
  } | null;
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
              file: { url: string } | null;
              id: number;
              user: { nickname: string; photoUrl: string | null };
            }>
          | [];
        content: string;
        createdAt: string;
        deletedAt: string | null;
        file: { url: string } | null;
        id: number;
        user: { nickname: string; photoUrl: string | null };
      }>
    | [];
  _count: {
    likes: number | null;
  };
  strategy: {
    chartCycle: string | null;
    confirmStatus: string | null;
    platform: string | null;
    symbol: string | null;
    profitPct: number | null;
  };
} | null;
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
  fileUrl: string | null;
};

export type updateCommentPayload = {
  commentId: number | null;
  parentCommentId: number | null;
  content: string | null;
  fileUrl: string | null;
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

export type getGuidesResult = Array<{
  id: number | null;
  group: string | null;
  title: string | null;
  content: string | null;
  createdAt: string | null;
}> | null;

export type createStrategyPayload = {
  category: string | null;
  title: string | null;
  content: string | null;
  fileUrls: Array<string | null>;
  platform: string | null;
  symbol: string | null;
  chartCycle: string | null;
  profitPct: number | null;
  communities: Array<{
    channel: string | null;
    url: string | null;
  }> | null;
} | null;

export type createCommissionPayload = {
  category: string | null;
  title: string | null;
  content: string | null;
  fileUrls: Array<string | null>;
  refBoardId: number | null;
};

export type LoadBoardsResponse = {
  message: string | null;
};
