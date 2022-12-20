import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  changeCategory,
  changeComment,
  changePage,
  changeParentCommentId,
  changeTitle,
  changeUser,
  createCommentPayload,
  CreateUserInquiruesPayload,
  deleteCommentPayload,
  getBoardPayload,
  getBoardResult,
  getBoardsPayload,
  getBoardsResult,
  getNoticePayload,
  getNoticeResult,
  GetUserBoardsPayload,
  getUserBoardsResult,
  getUserCommentsResult,
  GetUserInquiriesPayload,
  getUserInquiriesResult,
  LoadBoardsBody,
  LoadBoardsPayload,
  LoadBoardsResponse,
  ResponseFailure,
  updateBoardPayload,
  updateCommentPayload,
  changeCommentId,
  updateCommentStPayload,
  setBoardCollectionPayload,
  setBoardLikePayload,
  getUserLikesResult,
  getUserCollectionsResult,
  getUserInquiryPayload,
  getUserInquiryResult,
  getUserByNicknamePayload,
  getUserByNicknameResult,
  updateUserInquiruesPayload,
} from '../types';

export type BoardsStateType = {
  category: string | null;
  page: number | null;
  user: string | null;
  comment: string | null;
  title: string | null;
  content: string | null;
  fileUrls: Array<string> | [] | null;
  fileUrl: string | null;
  loadBoardsLoading: boolean;
  loadGetComissionDone: {
    total: number | null;
    boards:
      | Array<{
          id: number;
          title: string;
          hits: number;
          createdAt: string;
          deletedAt: string | null;
          user: {
            nickname: string;
          };
          _count: {
            comments: number;
          };
        }>
      | [];
  };
  loadGetNoticeDone: {
    total: number | null;
    boards:
      | Array<{
          id: number;
          title: string;
          hits: number;
          createdAt: string;
          deletedAt: string | null;
          user: {
            nickname: string;
          };
          _count: {
            comments: number;
          };
        }>
      | [];
  };
  loadGetCertifiedDone: {
    total: number | null;
    boards:
      | Array<{
          id: number;
          title: string;
          hits: number;
          createdAt: string;
          deletedAt: string | null;
          user: {
            nickname: string;
            styles: Array<{ name: string }> | null;
          };
          strategy: {
            calcMdd: number | null;
            calcProfitPct: number | null;
            calcWinningPct: number | null;
            communities: Array<{ channel: string | null; url: string | null }> | null;
          } | null;
          _count: {
            comments: number;
          };
        }>
      | [];
  };
  loadGetUserStrategyDone: {
    total: number | null;
    boards:
      | Array<{
          id: number;
          title: string;
          hits: number;
          createdAt: string;
          deletedAt: string | null;
          user: {
            nickname: string;
          };
          _count: {
            comments: number;
          };
        }>
      | [];
  };
  loadGetQuantroStrategyDone: {
    total: number | null;
    boards:
      | Array<{
          id: number;
          title: string;
          hits: number;
          createdAt: string;
          deletedAt: string | null;
          user: {
            nickname: string;
          };
          _count: {
            comments: number;
          };
        }>
      | [];
  };
  loadGetQuantroIndicatorDone: {
    total: number | null;
    boards:
      | Array<{
          id: number;
          title: string;
          hits: number;
          createdAt: string;
          deletedAt: string | null;
          user: {
            nickname: string;
          };
          _count: {
            comments: number;
          };
        }>
      | [];
  };
  loadGetBoardsDone: {
    total: number | null;
    boards:
      | Array<{
          id: number;
          title: string;
          hits: number;
          createdAt: string;
          deletedAt: string | null;
          user: {
            nickname: string;
          };
          _count: {
            comments: number;
          };
        }>
      | [];
  };
  getUserBoardsDone: {
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
  getUserCommentsDone: {
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
  getUserCollectionsResult: {
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
  getUserLikesResult: {
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
  getUserInquiriesDone: {
    total: number | null;
    inquiries:
      | Array<{
          id: number;
          answer: string | null;
          title: string | null;
          createdAt: string;
          deletedAt: string | null;
        }>
      | [];
  };
  getNoticesDone: Array<{
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
      _count: { comments: number };
    };
  }> | null;
  boardId: number | null;
  parentCommentId: number | null;
  getBoardDone: {
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
  };
  commentId: number | null;
  isCollect: boolean;
  isLike: boolean;
  inquiryId: number | null;
  getInquiryResult: {
    user: { nickname: string; styles: Array<{ name: string }> };
    answer: { content: string | null; createdAt: string | null } | null;
    content: string | null;
    createdAt: string | null;
    files: Array<{ url: string }> | [];
    title: string | null;
  } | null;
  nickname: string | null;
  getUserInfo: {
    email: string | null;
    introduction: string | null;
    license: Array<string> | [] | null;
    nickname: string | null;
    nicknamePrev: string | null;
    photoUrl: string | null;
    styles: Array<{ name: string }> | [];
    _count: { boards: number | null; comments: number | null };
  };
  loadBoardsDone: {
    message: string | undefined;
  } | null;
  loadBoardsError: string | null;
};

const initialState: BoardsStateType = {
  category: '',
  page: 1,
  user: '',
  comment: '',
  title: '',
  content: '',
  fileUrls: [],
  fileUrl: '',
  loadBoardsLoading: false,
  loadGetBoardsDone: { total: 0, boards: [] },
  loadGetComissionDone: { total: 0, boards: [] },
  loadGetNoticeDone: { total: 0, boards: [] },
  loadGetCertifiedDone: { total: 0, boards: [] },
  loadGetUserStrategyDone: { total: 0, boards: [] },
  loadGetQuantroStrategyDone: { total: 0, boards: [] },
  loadGetQuantroIndicatorDone: { total: 0, boards: [] },
  getUserBoardsDone: { total: 0, boards: [] },
  getUserCommentsDone: { total: 0, comments: [] },
  getUserCollectionsResult: { total: 0, collections: [] },
  getUserLikesResult: { total: 0, likes: [] },
  getUserInquiriesDone: { total: 0, inquiries: [] },
  getNoticesDone: null,
  boardId: 0,
  parentCommentId: 0,
  getBoardDone: {
    category: '',
    id: 0,
    title: '',
    collectors: null,
    likes: null,
    user: {
      photoUrl: '',
      nickname: '',
      styles: [],
    },
    createdAt: '',
    deletedAt: '',
    hits: 0,
    content: '',
    files: [],
    comments: [],
    _count: {
      likes: 0,
    },
  },
  commentId: 0,
  isCollect: false,
  isLike: false,
  inquiryId: 0,
  getInquiryResult: null,
  nickname: '',
  getUserInfo: {
    email: '',
    introduction: '',
    license: [],
    nickname: '',
    nicknamePrev: '',
    photoUrl: '',
    styles: [],
    _count: { boards: 0, comments: 0 },
  },
  loadBoardsDone: null,
  loadBoardsError: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    //reset
    initializeBoardsForm(state) {
      Object.assign(state, initialState);
    },
    // boards payload
    changeBoardsField(state, action: PayloadAction<LoadBoardsBody>) {
      state.category = action.payload.category;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.fileUrls = action.payload.fileUrls;
    },
    //action
    //boards
    getBoards(state, action: PayloadAction<getBoardsPayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
      state.user = action.payload.user;
      state.title = action.payload.title;
      state.comment = action.payload.comment;
    },
    getBoardsResult(state, action: PayloadAction<getBoardsResult>) {
      state.loadBoardsLoading = false;
      state.loadGetBoardsDone = action.payload;
    },
    getComissionsResult(state, action: PayloadAction<getBoardsResult>) {
      state.loadBoardsLoading = false;
      state.loadGetComissionDone = action.payload;
    },
    getNoticeResult(state, action: PayloadAction<getBoardsResult>) {
      state.loadBoardsLoading = false;
      state.loadGetNoticeDone = action.payload;
    },
    getCertifiedResult(state, action: PayloadAction<getBoardsResult>) {
      state.loadBoardsLoading = false;
      state.loadGetCertifiedDone = action.payload;
    },
    getUserStrategyResult(state, action: PayloadAction<getBoardsResult>) {
      state.loadBoardsLoading = false;
      state.loadGetUserStrategyDone = action.payload;
    },
    getQuantroStrategyResult(state, action: PayloadAction<getBoardsResult>) {
      state.loadBoardsLoading = false;
      state.loadGetQuantroStrategyDone = action.payload;
    },
    getQuantroIndicatorResult(state, action: PayloadAction<getBoardsResult>) {
      state.loadBoardsLoading = false;
      state.loadGetQuantroIndicatorDone = action.payload;
    },
    //notice
    getNotices(state, action: PayloadAction<getNoticePayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.getNoticesDone = null;
    },
    getNoticesResult(state, action: PayloadAction<getNoticeResult>) {
      state.loadBoardsLoading = false;
      state.getNoticesDone = action.payload;
    },
    //mypage boards
    getUserBoards(state, action: PayloadAction<GetUserBoardsPayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
    },
    getUserBoardsResult(state, action: PayloadAction<getUserBoardsResult>) {
      state.loadBoardsLoading = false;
      state.getUserBoardsDone = action.payload;
    },
    getUserComments(state, action: PayloadAction<GetUserBoardsPayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
    },
    getUserCommentsResult(state, action: PayloadAction<getUserCommentsResult>) {
      state.loadBoardsLoading = false;
      state.getUserCommentsDone = action.payload;
    },
    getUserLikes(state, action: PayloadAction<GetUserBoardsPayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
    },
    getUserLikesResult(state, action: PayloadAction<getUserLikesResult>) {
      state.loadBoardsLoading = false;
      state.getUserLikesResult = action.payload;
    },
    getUserCollections(state, action: PayloadAction<GetUserBoardsPayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
    },
    getUserCollectionsResult(state, action: PayloadAction<getUserCollectionsResult>) {
      state.loadBoardsLoading = false;
      state.getUserCollectionsResult = action.payload;
    },
    getUserInquiries(state, action: PayloadAction<GetUserInquiriesPayload>) {
      state.loadBoardsLoading = true;
      state.page = action.payload.page;
    },
    getUserInquiriesResult(state, action: PayloadAction<getUserInquiriesResult>) {
      state.loadBoardsLoading = false;
      state.getUserInquiriesDone = action.payload;
    },

    getUserInquiry(state, action: PayloadAction<getUserInquiryPayload>) {
      state.loadBoardsLoading = true;
      state.inquiryId = action.payload.inquiryId;
    },
    getUserInquiryResult(state, action: PayloadAction<getUserInquiryResult>) {
      state.loadBoardsLoading = false;
      state.getInquiryResult = action.payload;
    },
    //boards
    createBoards(state, action: PayloadAction<LoadBoardsPayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.fileUrls = action.payload.fileUrls;
    },
    changePage(state, action: PayloadAction<changePage>) {
      state.page = action.payload.page;
    },
    changeTitle(state, action: PayloadAction<changeTitle>) {
      state.title = action.payload.title;
    },
    changeUser(state, action: PayloadAction<changeUser>) {
      state.user = action.payload.user;
    },
    changeComment(state, action: PayloadAction<changeComment>) {
      state.comment = action.payload.comment;
    },
    changeCategory(state, action: PayloadAction<changeCategory>) {
      state.category = action.payload.category;
    },
    changeParentCommentId(state, action: PayloadAction<changeParentCommentId>) {
      state.parentCommentId = action.payload.parentCommentId;
    },
    //board
    getBoard(state, action: PayloadAction<getBoardPayload>) {
      state.loadBoardsLoading = true;
      state.boardId = action.payload.boardId;
    },
    getBoardResult(state, action: PayloadAction<getBoardResult>) {
      state.loadBoardsLoading = false;
      state.getBoardDone = action.payload;
    },
    updateBoard(state, action: PayloadAction<updateBoardPayload>) {
      state.loadBoardsLoading = true;
      state.boardId = action.payload.boardId;
      state.category = action.payload.category;
      state.content = action.payload.content;
      state.fileUrls = action.payload.fileUrls;
    },
    deleteBoard(state, action: PayloadAction<getBoardPayload>) {
      state.loadBoardsLoading = true;
      state.boardId = action.payload.boardId;
    },
    //user mypage inquiry
    changeInquiries(state, action: PayloadAction<CreateUserInquiruesPayload>) {
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.fileUrls = action.payload.fileUrls;
    },
    createInquiries(state, action: PayloadAction<CreateUserInquiruesPayload>) {
      state.loadBoardsLoading = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.fileUrls = action.payload.fileUrls;
    },
    updateInquiries(state, action: PayloadAction<updateUserInquiruesPayload>) {
      state.loadBoardsLoading = true;
      state.inquiryId = action.payload.inquiryId;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.fileUrls = action.payload.fileUrls;
    },
    //comments
    changeCommentState(state, action: PayloadAction<createCommentPayload>) {
      state.boardId = action.payload.boardId;
      state.parentCommentId = action.payload.parentCommentId;
      state.content = action.payload.content;
      state.fileUrl = action.payload.fileUrl;
    },
    initialCommentState(state) {
      state.parentCommentId = 0;
      state.content = '';
      state.fileUrl = '';
    },
    createComment(state, action: PayloadAction<createCommentPayload>) {
      state.loadBoardsLoading = true;
      state.boardId = action.payload.boardId;
      state.parentCommentId = action.payload.parentCommentId;
      state.content = action.payload.content;
      state.fileUrl = action.payload.fileUrl;
    },
    changeCommentId(state, action: PayloadAction<changeCommentId>) {
      state.commentId = action.payload.commentId;
    },
    updateCommentSt(state, action: PayloadAction<updateCommentStPayload>) {
      state.commentId = action.payload.commentId;
      state.content = action.payload.content;
      state.parentCommentId = action.payload.parentCommentId;
    },
    updateComment(state, action: PayloadAction<updateCommentPayload>) {
      state.loadBoardsLoading = true;
      state.commentId = action.payload.commentId;
      state.content = action.payload.content;
      state.parentCommentId = action.payload.parentCommentId;
      state.fileUrl = action.payload.fileUrl;
    },
    deleteComment(state, action: PayloadAction<deleteCommentPayload>) {
      state.loadBoardsLoading = true;
      state.commentId = action.payload.commentId;
    },
    // collection, like
    isCollectors(state) {
      state.isCollect = true;
    },
    setBoardCollection(state, action: PayloadAction<setBoardCollectionPayload>) {
      state.loadBoardsLoading = true;
      state.boardId = action.payload.boardId;
      state.isCollect = action.payload.isCollect;
    },
    isLikes(state) {
      state.isLike = true;
    },
    setBoardLike(state, action: PayloadAction<setBoardLikePayload>) {
      state.loadBoardsLoading = true;
      state.boardId = action.payload.boardId;
      state.isLike = action.payload.isLike;
    },
    //get user by nickname
    getUserByNickname(state, action: PayloadAction<getUserByNicknamePayload>) {
      state.loadBoardsLoading = true;
      state.nickname = action.payload.nickname;
    },
    getUserByNicknameResult(state, action: PayloadAction<getUserByNicknameResult>) {
      state.loadBoardsLoading = true;
      state.getUserInfo = action.payload;
    },
    //api res req
    loadBoardsRequest(state) {
      state.loadBoardsLoading = true;
      state.loadBoardsDone = null;
      state.loadBoardsError = null;
    },
    loadBoardsSuccess(state, action: PayloadAction<LoadBoardsResponse>) {
      state.loadBoardsLoading = false;
      state.loadBoardsDone = action.payload;
    },
    loadBoardsFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadBoardsLoading = false;
      state.loadBoardsDone = null;
      state.loadBoardsError = action.payload.message;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const boardsActions = boardsSlice.actions;
// RootReducer 생성 시 사용
export default boardsSlice.reducer;
