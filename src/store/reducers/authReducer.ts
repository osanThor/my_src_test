import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoginPayload, LoadAuthBody, LoadAuthResponse, ResponseFailure } from '../types';

export type AuthStateType = {
  email: string | null;
  pw: string | null;
  isExistTrigger: boolean;
  verifyCode: number | null;
  loadAuthLoading: boolean;
  loadAuthDone: {} | null;
  loadAuthError: string | null;
};

const initialState: AuthStateType = {
  email: '',
  pw: '',
  isExistTrigger: false,
  verifyCode: 0,
  loadAuthLoading: false,
  loadAuthDone: '',
  loadAuthError: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeLoginField(state, action: PayloadAction<LoginPayload>) {
      state.email = action.payload.email;
      state.pw = action.payload.pw;
    },

    initializeAuthForm(state) {
      Object.assign(state, initialState);
    },
    // login
    userLogin(state, action: PayloadAction<LoginPayload>) {
      state.email = action.payload.email;
      state.pw = action.payload.pw;
    },
    // 모든 auth API 패치
    loadAuthRequest(state, action: PayloadAction<LoadAuthBody>) {
      state.loadAuthLoading = true;
      state.loadAuthDone = null;
      state.loadAuthError = null;
    },
    loadAuthSuccess(state, action: PayloadAction<LoadAuthResponse>) {
      state.loadAuthLoading = false;
      state.loadAuthDone = action.payload;
    },
    loadAuthFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadAuthLoading = false;
      state.loadAuthError = action.payload.data.message;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const authActions = authSlice.actions;
// RootReducer 생성 시 사용
export default authSlice.reducer;
