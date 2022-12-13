import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  adminUserDetailPayload,
  getAdminUserDetailResult,
  getAdminUsersPayload,
  getAdminUsersResult,
  ResponseFailure,
} from '../../types';

export type AdminUsersStateType = {
  page: number | null;
  email: string | null;
  getAdminUsersResult: Array<{
    photoUrl: string | null;
    nickname: string | null;
    email: string | null;
    snsType: string | null;
    license: {
      package: string | null;
    } | null;
    grade: string | null;
    createdAt: string | null;
  }> | null;
  getAdminUserDetailResult: {
    email: string | null;
    nickname: string | null;
    nicknamePrev: string | null;
    introduction: string | null;
    styles: Array<{ name: string | null }> | null;
    grade: string | null;
    license: {
      package: string | null;
      startedAt: string | null;
      endedAt: string | null;
    };
    telegrams: Array<{
      id: string | null;
      name: string | null;
    }> | null;
    exchanges: Array<{
      platform: string | null;
      alias: string | null;
      apiKey: string | null;
    }>;
  } | null;
  loadAdminUsersdLoading: boolean;
  loadAdminUsersdDone: {
    message: string | undefined;
  } | null;
  loadAdminUsersdError: string | null;
};

const initialState: AdminUsersStateType = {
  page: 0,
  email: '',
  getAdminUsersResult: null,
  getAdminUserDetailResult: null,
  loadAdminUsersdLoading: false,
  loadAdminUsersdDone: null,
  loadAdminUsersdError: null,
};

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {
    //reset
    initializeAdminUsersForm(state) {
      Object.assign(state, initialState);
    },
    //action
    getAdminUsers(state, action: PayloadAction<getAdminUsersPayload>) {
      state.loadAdminUsersdLoading = true;
      state.page = action.payload.page;
    },
    getAdminUsersResult(state, action: PayloadAction<getAdminUsersResult>) {
      state.loadAdminUsersdLoading = false;
      state.getAdminUsersResult = action.payload;
    },
    getAdminUserDetail(state, action: PayloadAction<adminUserDetailPayload>) {
      state.loadAdminUsersdLoading = true;
      state.email = action.payload.email;
      state.getAdminUserDetailResult = null;
    },
    getAdminUserDetailResult(state, action: PayloadAction<getAdminUserDetailResult>) {
      state.loadAdminUsersdLoading = true;
      state.getAdminUserDetailResult = action.payload;
    },
    //api res req
    loadAdminUsersRequest(state) {
      state.loadAdminUsersdLoading = true;
      state.loadAdminUsersdDone = null;
      state.loadAdminUsersdError = null;
    },
    loadAdminUsersSuccess(state, action: PayloadAction) {
      state.loadAdminUsersdLoading = false;
      state.loadAdminUsersdError = null;
    },
    loadAdminUsersFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadAdminUsersdLoading = false;
      state.loadAdminUsersdDone = null;
      state.loadAdminUsersdError = action.payload.message;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const adminUsersActions = adminUsersSlice.actions;
// RootReducer 생성 시 사용
export default adminUsersSlice.reducer;
