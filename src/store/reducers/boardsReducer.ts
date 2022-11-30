import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  changePage,
  getBoardsPayload,
  getBoardsResult,
  GetUserBoardsPayload,
  getUserBoardsResult,
  GetUserInquiriesPayload,
  getUserInquiriesResult,
  LoadBoardsBody,
  LoadBoardsPayload,
  LoadBoardsResponse,
  ResponseFailure,
} from '../types';

export type BoardsStateType = {
  category: string | null;
  page: number | null;
  user: string | null;
  comment: string | null;
  title: string | null;
  content: string | null;
  fileUrls: Array<[string]> | [];
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
  getUserInquiriesDone: { total: 0, inquiries: [] },
  loadBoardsDone: {
    message: '',
  },
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
    getUserBoards(state, action: PayloadAction<GetUserBoardsPayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
    },
    getUserBoardsResult(state, action: PayloadAction<getUserBoardsResult>) {
      state.loadBoardsLoading = false;
      state.getUserBoardsDone = action.payload;
    },
    getUserInquiries(state, action: PayloadAction<GetUserInquiriesPayload>) {
      state.loadBoardsLoading = true;
      state.page = action.payload.page;
    },
    getUserInquiriesResult(state, action: PayloadAction<getUserInquiriesResult>) {
      state.loadBoardsLoading = false;
      state.getUserInquiriesDone = action.payload;
    },
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
    loadBoardsRequest(state) {
      state.loadBoardsLoading = true;
      state.loadBoardsDone = { message: '' };
      state.loadBoardsError = null;
    },
    loadBoardsSuccess(state, action: PayloadAction<LoadBoardsResponse>) {
      state.loadBoardsLoading = false;
      state.loadBoardsDone = action.payload;
    },
    loadBoardsFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadBoardsLoading = false;
      state.loadBoardsDone = { message: '' };
      state.loadBoardsError = action.payload.message;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const boardsActions = boardsSlice.actions;
// RootReducer 생성 시 사용
export default boardsSlice.reducer;
