import { changeCommentId } from './../types/boards';
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
} from '../types';

export type BoardsStateType = {
  category: string | null;
  page: number | null;
  user: string | null;
  comment: string | null;
  title: string | null;
  content: string | null;
  fileUrls: Array<string> | [];
  loadBoardsLoading: boolean;
  loadGetBoardsDone: {
    total: number | null;
    boards:
      | Array<{
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
        createdAt: string;
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
        }>
      | [];
  };
  getNoticesDone:
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
          _count: { comments: number };
        };
      }>
    | [];
  boardId: number | null;
  parentCommentId: number | null;
  getBoardDone: {
    id: number;
    title: string | null;
    user: {
      photoUrl: string | null;
      nickname: string | null;
      styles: Array<{ name: string }> | [];
    } | null;
    createdAt: string | null;
    hits: number | null;
    content: string | null;
    files: Array<string> | [];
    comments:
      | Array<{
          childComment:
            | Array<{
                content: string;
                createdAt: string;
                id: number;
                user: { nickname: string };
              }>
            | [];
          content: string;
          createdAt: string;
          id: number;
          user: { nickname: string };
        }>
      | [];
    _count: {
      likes: number | null;
    };
  };
  commentId: number | null;
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
  loadBoardsLoading: false,
  loadGetBoardsDone: { total: 0, boards: [] },
  getUserBoardsDone: { total: 0, boards: [] },
  getUserCommentsDone: { total: 0, comments: [] },
  getUserInquiriesDone: { total: 0, inquiries: [] },
  getNoticesDone: [],
  boardId: 0,
  parentCommentId: 0,
  getBoardDone: {
    id: 0,
    title: '',
    user: {
      photoUrl: '',
      nickname: '',
      styles: [],
    },
    createdAt: '',
    hits: 0,
    content: '',
    files: [],
    comments: [],
    _count: {
      likes: 0,
    },
  },
  commentId: 0,
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
      state.comment = action.payload.comment;
    },
    getBoardsResult(state, action: PayloadAction<getBoardsResult>) {
      state.loadBoardsLoading = false;
      state.loadGetBoardsDone = action.payload;
    },
    //notice
    getNotices(state, action: PayloadAction<getNoticePayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
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
      state.loadBoardsLoading = true;
      state.getUserCommentsDone = action.payload;
    },
    getUserLikes(state, action: PayloadAction<GetUserBoardsPayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
    },
    getUserCollections(state, action: PayloadAction<GetUserBoardsPayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
    },
    getUserInquiries(state, action: PayloadAction<GetUserInquiriesPayload>) {
      state.loadBoardsLoading = true;
      state.page = action.payload.page;
    },
    getUserInquiriesResult(state, action: PayloadAction<getUserInquiriesResult>) {
      state.loadBoardsLoading = false;
      state.getUserInquiriesDone = action.payload;
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
    //comments
    changeCommentState(state, action: PayloadAction<createCommentPayload>) {
      state.boardId = action.payload.boardId;
      state.parentCommentId = action.payload.parentCommentId;
      state.content = action.payload.content;
      state.fileUrls = action.payload.fileUrls;
    },
    initialCommentState(state) {
      state.parentCommentId = 0;
      state.content = '';
      state.fileUrls = [];
    },
    createComment(state, action: PayloadAction<createCommentPayload>) {
      state.loadBoardsLoading = true;
      state.boardId = action.payload.boardId;
      state.parentCommentId = action.payload.parentCommentId;
      state.content = action.payload.content;
      state.fileUrls = action.payload.fileUrls;
    },
    changeCommentId(state, action: PayloadAction<changeCommentId>) {
      state.commentId = action.payload.commentId;
    },
    updateComment(state, action: PayloadAction<updateCommentPayload>) {
      state.loadBoardsLoading = true;
      state.commentId = action.payload.commentId;
      state.content = action.payload.content;
      state.parentCommentId = action.payload.parentCommentId;
      state.fileUrls = action.payload.fileUrls;
    },
    deleteComment(state, action: PayloadAction<deleteCommentPayload>) {
      state.loadBoardsLoading = true;
      state.commentId = action.payload.commentId;
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
