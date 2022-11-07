import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  LoginPayload,
  LoadAuthResponse,
  ResponseFailure,
  VerifyEmailPayload,
  VerifyCodePayload,
  AuthPayload,
} from '../types';

export type AuthStateType = {
  email: string | null;
  pw: string | null;
  isExistTrigger: boolean;
  verifyCode: number | string | null;
  loadAuthLoading: boolean;
  loadAuthDone: {
    message: string;
    accessToken: string | undefined;
    expiryTime: number | undefined;
  } | null;
  loadAuthError: string | null;
  auth: boolean | null;
  authError: boolean | null;
};

const initialState: AuthStateType = {
  email: '',
  pw: '',
  isExistTrigger: false,
  verifyCode: 0,
  loadAuthLoading: false,
  loadAuthDone: { message: '', accessToken: undefined, expiryTime: undefined },
  loadAuthError: '',
  auth: null,
  authError: null,
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
      state.loadAuthDone = { message: '', accessToken: undefined, expiryTime: undefined };
      state.email = action.payload.email;
      state.pw = action.payload.pw;
    },
    // refresh
    refreshToken(state) {
      state.loadAuthLoading = true;
      state.loadAuthDone = { message: '', accessToken: undefined, expiryTime: undefined };
    },
    // Verify Emial
    sendVerifyEmail(state, action: PayloadAction<VerifyEmailPayload>) {
      state.loadAuthDone = { message: '', accessToken: undefined, expiryTime: undefined };
      state.email = action.payload.email;
      state.isExistTrigger = action.payload.isExistTrigger;
    },
    // Verify code
    checkVerifyCode(state, action: PayloadAction<VerifyCodePayload>) {
      state.loadAuthDone = { message: '', accessToken: undefined, expiryTime: undefined };
      state.email = action.payload.email;
      state.verifyCode = action.payload.verifyCode;
    },
    // 모든 auth API 패치
    loadAuthRequest(state) {
      state.loadAuthLoading = true;
      state.loadAuthDone = { message: '', accessToken: undefined, expiryTime: undefined };
      state.loadAuthError = null;
    },
    loadAuthSuccess(state, action: PayloadAction<LoadAuthResponse>) {
      state.loadAuthLoading = false;
      state.loadAuthDone = action.payload;
    },
    loadAuthFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadAuthLoading = false;
      state.loadAuthDone = { message: '', accessToken: undefined, expiryTime: undefined };
      state.loadAuthError = action.payload.message;
    },
    AuthSuccess(state) {
      state.auth = true;
      state.authError = null;
    },
    AuthFailure(state) {
      state.auth = false;
      state.authError = true;
    },
    AuthChange(state, action: PayloadAction<AuthPayload>) {
      state.loadAuthDone.message = action.payload.message;
      state.loadAuthDone.accessToken = action.payload.accessToken;
    },
    userLogOut(state) {
      state.auth = null;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const authActions = authSlice.actions;
// RootReducer 생성 시 사용
export default authSlice.reducer;
