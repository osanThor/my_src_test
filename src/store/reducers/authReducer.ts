import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoginPayload, LoadAuthBody, LoadAuthResponse, ResponseFailure } from '../types';

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
    initializeAuthForm(state) {
      state = initialState;
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
      // 여기서는 "immer"가 적용되기 때문에 불변성을 지키지 않아도 됨
      // 하지만 아래처럼 불변성 지키는게 코드가 더 간단해보여서 이렇게 작성함
      // state.hasMorePosts =
      //   action.payload.data.posts.length === action.payload.data.limit;
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
