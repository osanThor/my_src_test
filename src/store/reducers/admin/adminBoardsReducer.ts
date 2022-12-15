import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  changeCategory,
  changePagePayload,
  changeTitle,
  changeUser,
  GetAdminAllBoardsPayload,
  GetAdminAllBoardsResult,
  LoadAdminBoardsResponse,
  ResponseFailure,
} from '../../types';

export type AdminBoardsStateType = {
  page: number | null;
  category: string | null;
  title: string | null;
  user: string | null;
  getAdminAllBoardsResult: {
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
  loadAdminBoardsLoading: boolean;
  loadAdminBoardsDone: {
    message: string | undefined;
  } | null;
  loadAdminBoardsError: string | null;
};

const initialState: AdminBoardsStateType = {
  page: 0,
  category: '',
  title: '',
  user: '',
  getAdminAllBoardsResult: { total: 0, boards: [] },
  loadAdminBoardsLoading: false,
  loadAdminBoardsDone: null,
  loadAdminBoardsError: null,
};

const adminBoardsSlice = createSlice({
  name: 'adminBoards',
  initialState,
  reducers: {
    //reset
    initializeAdminBoardsForm(state) {
      Object.assign(state, initialState);
    },
    //action
    changePage(state, action: PayloadAction<changePagePayload>) {
      state.page = action.payload.page;
    },
    changeCategory(state, action: PayloadAction<changeCategory>) {
      state.category = action.payload.category;
    },
    changeTitle(state, action: PayloadAction<changeTitle>) {
      state.title = action.payload.title;
    },
    changeUser(state, action: PayloadAction<changeUser>) {
      state.user = action.payload.user;
    },
    getAdminAllBoards(state, action: PayloadAction<GetAdminAllBoardsPayload>) {
      state.loadAdminBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
      state.title = action.payload.title;
      state.user = action.payload.user;
    },
    getAdminAllBoardsResult(state, action: PayloadAction<GetAdminAllBoardsResult>) {
      state.loadAdminBoardsLoading = true;
      state.getAdminAllBoardsResult = action.payload;
    },
    //api res req
    loadAdminBoardsRequest(state) {
      state.loadAdminBoardsLoading = true;
      state.loadAdminBoardsDone = null;
      state.loadAdminBoardsError = null;
    },
    loadAdminBoardsSuccess(state, action: PayloadAction<LoadAdminBoardsResponse>) {
      state.loadAdminBoardsLoading = false;
      state.loadAdminBoardsDone = action.payload;
      state.loadAdminBoardsError = null;
    },
    loadAdminBoardsFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadAdminBoardsLoading = false;
      state.loadAdminBoardsDone = null;
      state.loadAdminBoardsError = action.payload.message;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const adminBoardsActions = adminBoardsSlice.actions;
// RootReducer 생성 시 사용
export default adminBoardsSlice.reducer;
