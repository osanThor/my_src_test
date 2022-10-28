import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoginPayload, LoadAuthBody, LoadAuthResponse, ResponseFailure, RegisterPayload } from '../types';

export type AuthStateType = {
  email: string | null;
  pw: string | null;
  nickname: string | null;
  photoUrl: string | null;
  loadAuthLoading: boolean;
  loadAuthDone: null | string;
  loadAuthError: null | string;
};

const initialState: AuthStateType = {
  email: '',
  pw: '',
  nickname: '',
  photoUrl: '',
  loadAuthLoading: false,
  loadAuthDone: '',
  loadAuthError: '',
};

/**
 * "createSlice()"는 액션 타입, 액션 크리에이터, 리듀서를 한 번에 만드는 함수입니다.
 * name: 유니크한 액션을 만들 때 사용
 * initialState: 최초 상태
 * reducers: 리듀서들을 정의
 * PayloadAction로 인자의 타입을 정의해주면 자동완성 지원됨
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeLoginField(state, action: PayloadAction<LoginPayload>) {
      state.email = action.payload.email;
      state.pw = action.payload.pw;
    },
    changeRegisterFiled(state, action: PayloadAction<RegisterPayload>) {
      state.email = action.payload.email;
      state.pw = action.payload.pw;
      state.photoUrl = action.payload.photoUrl;
      state.nickname = action.payload.nickname;
    },
    initializeAuthForm(state) {
      Object.assign(state, initialState);
    },
    // 모든 auth API 패치
    loadAuthRequest(state, action: PayloadAction<LoadAuthBody>) {
      state.loadAuthLoading = true;
      state.loadAuthDone = null;
      state.loadAuthError = null;
    },
    loadAuthSuccess(state, action: PayloadAction<LoadAuthResponse>) {
      state.loadAuthLoading = false;
      state.loadAuthDone = action.payload.data.message;
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
