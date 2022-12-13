import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  getAdminBannerDetailPayload,
  getAdminBannerDetailResult,
  getAdminBannersPayload,
  getAdminBannersResult,
  getAdminSubscripbePlatformPayload,
  LoadAdminBannersResponse,
  ResponseFailure,
} from '../../types';

export type AdminBannersStateType = {
  page: number | null;
  id: number | null;
  platform: string | null;
  position: string | null;
  isVisiblePc: boolean;
  isVisibleMobile: boolean;
  fileUrlPc: string | boolean | null;
  fileUrlMobile: string | boolean | null;
  getBannersResult: Array<{
    createdAt: string | null;
    files: Array<{ file: string }> | [];
    id: number | null;
    isVisibleMobile: boolean;
    isVisiblePc: boolean;
    position: string | null;
  }> | null;
  getBannerDetailResult: {
    files: Array<{ name: string | null }> | [];
    isVisibleMobile: boolean;
    isVisiblePc: boolean;
    position: string | null;
  } | null;
  loadAdminBannersLoading: boolean;
  loadAdminBannersDone: {
    message: string | null;
  } | null;
  loadAdminBannersError: string | null;
};

const initialState: AdminBannersStateType = {
  page: 0,
  id: 0,
  platform: '',
  position: '',
  isVisiblePc: false,
  isVisibleMobile: false,
  fileUrlPc: '',
  fileUrlMobile: '',
  getBannersResult: null,
  getBannerDetailResult: null,
  loadAdminBannersLoading: false,
  loadAdminBannersDone: null,
  loadAdminBannersError: null,
};

const adminBannersSlice = createSlice({
  name: 'adminBanners',
  initialState,
  reducers: {
    //reset
    initializeAdminBannersForm(state) {
      Object.assign(state, initialState);
    },
    //action
    changePage(state, action: PayloadAction<getAdminBannersPayload>) {
      state.page = action.payload.page;
    },
    getAdminAllBanners(state, action: PayloadAction<getAdminBannersPayload>) {
      state.loadAdminBannersLoading = true;
      state.page = action.payload.page;
    },
    getAdminMainBanners(state, action: PayloadAction<getAdminBannersPayload>) {
      state.loadAdminBannersLoading = true;
      state.page = action.payload.page;
    },
    getAdminSubScribeBanners(state, action: PayloadAction<getAdminBannersPayload>) {
      state.loadAdminBannersLoading = true;
      state.page = action.payload.page;
    },
    getAdminSubScribeByPlatformBanners(state, action: PayloadAction<getAdminSubscripbePlatformPayload>) {
      state.loadAdminBannersLoading = true;
      state.page = action.payload.page;
      state.platform = action.payload.platform;
    },
    getAdminBannersResult(state, action: PayloadAction<getAdminBannersResult>) {
      state.loadAdminBannersLoading = false;
      state.getBannersResult = action.payload;
    },
    getAdminBannerDetail(state, action: PayloadAction<getAdminBannerDetailPayload>) {
      state.loadAdminBannersLoading = true;
      state.id = action.payload.id;
    },
    getAdminBannerDetailResult(state, action: PayloadAction<getAdminBannerDetailResult>) {
      state.loadAdminBannersLoading = false;
      state.getBannerDetailResult = action.payload;
    },
    //api res req
    loadAdminBannersRequest(state) {
      state.loadAdminBannersLoading = true;
      state.loadAdminBannersDone = null;
      state.loadAdminBannersError = null;
    },
    loadAdminBannersSuccess(state, action: PayloadAction<LoadAdminBannersResponse>) {
      state.loadAdminBannersLoading = false;
      state.loadAdminBannersDone = action.payload;
      state.loadAdminBannersError = null;
    },
    loadAdminBannersFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadAdminBannersLoading = false;
      state.loadAdminBannersDone = null;
      state.loadAdminBannersError = action.payload.message;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const adminBannersActions = adminBannersSlice.actions;
// RootReducer 생성 시 사용
export default adminBannersSlice.reducer;
