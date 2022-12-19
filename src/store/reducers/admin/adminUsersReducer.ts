import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  adminTelegramPayload,
  adminTelegramUsersMessage,
  adminUserDetailPayload,
  changeEmailPayload,
  changeGradePayload,
  changelicensePackagePayload,
  changeNicknamePayload,
  changePagePayload,
  changeSnsTypePayload,
  getAdminUserDetailResult,
  getAdminUsersPayload,
  getAdminUsersResult,
  LoadAdminUsersResponse,
  ResponseFailure,
  updateAdminUserPayload,
} from '../../types';

export type AdminUsersStateType = {
  page: number | null;
  snsType: string | null;
  nickname: string | null;
  licensePackage: string | null;
  grade: string | null;
  email: string | null;
  getAdminUsersResult: {
    total: number | null;
    users: Array<{
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
  } | null;
  getAdminUserDetailResult: {
    id: string | null;
    depositStatus: string | null;
    photoUrl: string | null;
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
      id: string | null;
      platform: string | null;
      alias: string | null;
      apiKey: string | null;
      connectionStatus: string | null;
    }> | null;
  } | null;
  updateUserPayload: {
    email: string | null;
    nickname: string | null;
    introduction: string | null;
    grade: string | null;
    licensePackageInfo: {
      licensePackage: string | null;
      startedAt: string | null;
      endedAt: string | null;
    } | null;
    depositStatus: string | null;
  } | null;
  //telegram
  contents: Array<string> | null;
  idList: Array<string> | null;
  telegramPayload: {
    id: string | null;
    username: string | null;
  };
  loadAdminUsersdLoading: boolean;
  loadAdminUsersdDone: {
    message: string | null;
  } | null;
  loadAdminUsersdError: string | null;
};

const initialState: AdminUsersStateType = {
  page: 0,
  snsType: '',
  nickname: '',
  licensePackage: '',
  grade: '',
  email: '',
  getAdminUsersResult: { total: 0, users: [] },
  getAdminUserDetailResult: null,
  contents: [],
  idList: [],
  telegramPayload: { id: '', username: '' },
  updateUserPayload: null,
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
    changePage(state, action: PayloadAction<changePagePayload>) {
      state.page = action.payload.page;
    },
    changeSnsType(state, action: PayloadAction<changeSnsTypePayload>) {
      state.snsType = action.payload.snsType;
    },
    changeEmail(state, action: PayloadAction<changeEmailPayload>) {
      state.email = action.payload.email;
    },
    changeGrade(state, action: PayloadAction<changeGradePayload>) {
      state.grade = action.payload.grade;
    },
    changeLicensePakage(state, action: PayloadAction<changelicensePackagePayload>) {
      state.licensePackage = action.payload.licensePackage;
    },
    changeNickname(state, action: PayloadAction<changeNicknamePayload>) {
      state.nickname = action.payload.nickname;
    },
    getAdminUsers(state, action: PayloadAction<getAdminUsersPayload>) {
      state.loadAdminUsersdLoading = true;
      state.page = action.payload.page;
      state.snsType = action.payload.snsType;
      state.nickname = action.payload.nickname;
      state.licensePackage = action.payload.licensePackage;
      state.grade = action.payload.grade;
      state.email = action.payload.email;
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
      state.loadAdminUsersdLoading = false;
      state.getAdminUserDetailResult = action.payload;
    },
    adminUserDelete(state, action: PayloadAction<adminUserDetailPayload>) {
      state.loadAdminUsersdLoading = true;
      state.email = action.payload.email;
    },
    changeAdminUserDefaultImage(state, action: PayloadAction<adminUserDetailPayload>) {
      state.loadAdminUsersdLoading = true;
      state.email = action.payload.email;
    },
    sendTelegramMessage(state, action: PayloadAction<adminTelegramUsersMessage>) {
      state.loadAdminUsersdLoading = true;
      state.contents = action.payload.contents;
      state.idList = action.payload.idList;
    },
    chagneAdminUserField(state, action: PayloadAction<updateAdminUserPayload>) {
      state.updateUserPayload = action.payload;
    },
    updateAdminUser(state, action: PayloadAction<updateAdminUserPayload>) {
      state.loadAdminUsersdLoading = true;
      state.updateUserPayload = action.payload;
    },
    changeAdminTelegramField(state, action: PayloadAction<adminTelegramPayload>) {
      state.telegramPayload = action.payload;
    },
    addAdminTelegram(state, action: PayloadAction<adminTelegramPayload>) {
      state.loadAdminUsersdLoading = true;
      state.telegramPayload = action.payload;
    },
    deleteAdminTelegram(state, action: PayloadAction<adminTelegramPayload>) {
      state.loadAdminUsersdLoading = true;
      state.telegramPayload = action.payload;
    },
    //api res req
    loadAdminUsersRequest(state) {
      state.loadAdminUsersdLoading = true;
      state.loadAdminUsersdDone = null;
      state.loadAdminUsersdError = null;
    },
    loadAdminUsersSuccess(state, action: PayloadAction<LoadAdminUsersResponse>) {
      state.loadAdminUsersdLoading = false;
      state.loadAdminUsersdDone = action.payload;
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
