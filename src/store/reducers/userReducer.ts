import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  CheckNicknamePayload,
  LoadUserResponse,
  RegisterBody,
  RegisterPayload,
  ResponseFailure,
  TelegramPayload,
  ThemePayload,
  UserProfilePayload,
} from '../types';

export type UserStateType = {
  email: string | null;
  pw: string | null;
  pwConfirm: string | null;
  nickname: string | null;
  checkNicknameResult: boolean | null;
  photoUrl: string | null;
  username: string | null;
  verifyCode: number | string | null;
  isDark: boolean;
  nicknamePrev: string | null;
  licenses: Array<string> | [];
  styles: Array<string> | [];
  introduction: string | null;
  _count: {
    boards: number | null;
    comments: number | null;
  };
  loadUserLoading: boolean;
  loadUserDone: boolean | string | null;
  loadUserError: null | string;
  user: boolean | null;
  userError: boolean | null;
};

const initialState: UserStateType = {
  email: '',
  pw: '',
  pwConfirm: '',
  nickname: '',
  checkNicknameResult: null,
  photoUrl: '',
  username: '',
  verifyCode: '',
  isDark: false,
  nicknamePrev: '',
  licenses: [],
  styles: [],
  introduction: '',
  _count: {
    boards: 0,
    comments: 0,
  },
  loadUserLoading: false,
  loadUserDone: '',
  loadUserError: '',
  user: null,
  userError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<ThemePayload>) {
      state.isDark = action.payload.isDark;
    },
    changeThemeStatus(state, action: PayloadAction<ThemePayload>) {
      state.isDark = action.payload.isDark;
    },
    changeRegisterField(state, action: PayloadAction<RegisterBody>) {
      state.email = action.payload.email;
      state.pw = action.payload.pw;
      state.pwConfirm = action.payload.pwConfirm;
      state.verifyCode = action.payload.verifyCode;
      state.photoUrl = action.payload.photoUrl;
      state.nickname = action.payload.nickname;
    },
    changeTelegramField(state, action: PayloadAction<TelegramPayload>) {
      state.username = action.payload.username;
    },
    checkNickName(state, action: PayloadAction<CheckNicknamePayload>) {
      state.loadUserLoading = true;
      state.nickname = action.payload.nickname;
    },
    loadCheckNickNameResult(state, action: PayloadAction<boolean>) {
      state.checkNicknameResult = action.payload;
    },
    resetCheckNicknameResult(state, action: PayloadAction<boolean>) {
      state.checkNicknameResult = action.payload;
    },
    userRegister(state, action: PayloadAction<RegisterPayload>) {
      state.email = action.payload.email;
      state.pw = action.payload.pw;
      state.nickname = action.payload.nickname;
      state.photoUrl = action.payload.photoUrl;
    },
    getUserProfile(state) {
      state.loadUserLoading = true;
      state.email = '';
      state.photoUrl = '';
      state.nickname = '';
      state.nicknamePrev = '';
      state.licenses = [];
      state.styles = [];
      state.introduction = '';
      state._count = {
        boards: 0,
        comments: 0,
      };
    },
    getUserProfileResult(state, action: PayloadAction<UserProfilePayload>) {
      state.loadUserLoading = false;
      state.email = action.payload.email;
      state.photoUrl = action.payload.photoUrl;
      state.nickname = action.payload.nickname;
      state.nicknamePrev = action.payload.nicknamePrev;
      state.licenses = action.payload.licenses;
      state.styles = action.payload.styles;
      state.introduction = action.payload.introduction;
      state._count = action.payload._count;
    },
    initializeUserForm(state) {
      Object.assign(state, initialState);
    },
    loadUserRequest(state) {
      state.loadUserLoading = true;
      state.loadUserDone = null;
      state.loadUserError = null;
    },
    loadUserSuccess(state, action: PayloadAction<LoadUserResponse>) {
      state.loadUserLoading = false;
      state.loadUserDone = action.payload.message;
    },
    loadUserFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadUserLoading = false;
      state.loadUserDone = null;
      state.loadUserError = action.payload.message;
    },
    userSuccess(state) {
      state.user = true;
      state.userError = null;
    },
    userFailure(state) {
      state.user = false;
      state.userError = true;
    },
    telegramUsername(state, action: PayloadAction<TelegramPayload>) {
      state.username = action.payload.username;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const userActions = userSlice.actions;
// RootReducer 생성 시 사용
export default userSlice.reducer;
