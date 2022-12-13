import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { adminLoginPayload, LoadAdminAuthResponse, ResponseFailure } from '../../types';

export type AdminAuthStateType = {
  email: string | null;
  pw: string | null;
  loadAdminAuthLoading: boolean;
  loadAdminAuthDone: {
    message: string | undefined;
    accessToken: string | undefined;
    expiryTime: number | undefined;
  } | null;
  loadAdminAuthError: string | null;
};

const initialState: AdminAuthStateType = {
  email: '',
  pw: '',
  loadAdminAuthLoading: false,
  loadAdminAuthDone: null,
  loadAdminAuthError: null,
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    //reset
    initializeAdminAuthForm(state) {
      Object.assign(state, initialState);
    },
    //action
    changeAdminLoginField(state, action: PayloadAction<adminLoginPayload>) {
      state.email = action.payload.email;
      state.pw = action.payload.pw;
    },
    adminLogin(state, action: PayloadAction<adminLoginPayload>) {
      state.loadAdminAuthLoading = true;
      state.email = action.payload.email;
      state.pw = action.payload.pw;
      state.loadAdminAuthDone = null;
    },
    adminLogout(state) {
      state.loadAdminAuthLoading = true;
      state.loadAdminAuthDone = null;
    },
    adminRefresh(state) {
      state.loadAdminAuthLoading = true;
      state.loadAdminAuthDone = null;
    },
    //api res req
    loadAdminAuthRequest(state) {
      state.loadAdminAuthLoading = true;
      state.loadAdminAuthDone = null;
      state.loadAdminAuthError = null;
    },
    loadAdminAuthSuccess(state, action: PayloadAction<LoadAdminAuthResponse>) {
      state.loadAdminAuthLoading = false;
      state.loadAdminAuthDone = action.payload;
      state.loadAdminAuthError = null;
    },
    loadAdminAuthFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadAdminAuthLoading = false;
      state.loadAdminAuthDone = null;
      state.loadAdminAuthError = action.payload.message;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const adminAuthActions = adminAuthSlice.actions;
// RootReducer 생성 시 사용
export default adminAuthSlice.reducer;
