import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  CheckNicknamePayload,
  CheckNicknameRes,
  LoadUserBody,
  LoadUserResponse,
  RegisterPayload,
  ResponseFailure,
  ThemePayload,
} from '../types';

export type UserStateType = {
  email: string | null;
  pw: string | null;
  nickname: string | null;
  checkNicknameResult: boolean;
  photoUrl: string | null;
  isDark: boolean;
  loadUserLoading: boolean;
  loadUserDone: boolean | string | null;
  loadUserError: null | string;
};

const initialState: UserStateType = {
  email: '',
  pw: '',
  nickname: '',
  checkNicknameResult: false,
  photoUrl: '',
  isDark: true,
  loadUserLoading: false,
  loadUserDone: '',
  loadUserError: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<ThemePayload>) {
      state.isDark = action.payload.isDark;
    },
    changeRegisterFiled(state, action: PayloadAction<RegisterPayload>) {
      state.email = action.payload.email;
      state.pw = action.payload.pw;
      state.photoUrl = action.payload.photoUrl;
      state.nickname = action.payload.nickname;
    },
    checkNickName(state, action: PayloadAction<CheckNicknamePayload>) {
      state.nickname = action.payload.nickname;
    },
    loadCheckNickNameResult(state, action: PayloadAction<boolean>) {
      state.checkNicknameResult = action.payload;
    },
    initializeUserForm(state) {
      Object.assign(state, initialState);
    },
    loadUserRequest(state, action: PayloadAction<LoadUserBody>) {
      state.loadUserLoading = true;
      state.loadUserDone = null;
      state.loadUserError = null;
    },
    loadUserSuccess(state, action: PayloadAction<LoadUserResponse>) {
      state.loadUserLoading = false;
      state.loadUserDone = action.payload.data;
    },
    loadUserFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadUserLoading = false;
      state.loadUserError = action.payload.data.message;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const userActions = userSlice.actions;
// RootReducer 생성 시 사용
export default userSlice.reducer;
