import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  changeBannerPositionPayload,
  changeIsAllSubscribePayload,
  changePagePayload,
  createAdminBannerPayload,
  getAdminBannerDetailPayload,
  getAdminBannerDetailResult,
  getAdminBannersPayload,
  getAdminBannersResult,
  LoadAdminBannersResponse,
  ResponseFailure,
} from '../../types';

export type AdminBannersStateType = {
  page: number | null;
  id: number | null;
  bannerPosition: string | null;
  isAllSubscribe: boolean | '';
  position: string | null;
  isVisiblePc: boolean;
  isVisibleMobile: boolean;
  fileUrlPc: string | null;
  fileUrlMobile: string | null;
  getBannersResult: {
    total: number | null;
    banners: Array<{
      createdAt: string | null;
      files: Array<{ file: string }> | [];
      id: number | null;
      isVisibleMobile: boolean;
      isVisiblePc: boolean;
      position: string | null;
    }>;
  } | null;
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
  bannerPosition: '',
  isAllSubscribe: false,
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
    changePage(state, action: PayloadAction<changePagePayload>) {
      state.page = action.payload.page;
    },
    changebannerPosition(state, action: PayloadAction<changeBannerPositionPayload>) {
      state.bannerPosition = action.payload.bannerPosition;
    },
    changeisAllSubscribe(state, action: PayloadAction<changeIsAllSubscribePayload>) {
      state.isAllSubscribe = action.payload.isAllSubscribe;
    },
    getAdminAllBanners(state, action: PayloadAction<getAdminBannersPayload>) {
      state.loadAdminBannersLoading = true;
      state.page = action.payload.page;
      state.bannerPosition = action.payload.bannerPosition;
      state.isAllSubscribe = action.payload.isAllSubscribe;
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
    createAdminBanner(state, action: PayloadAction<createAdminBannerPayload>) {
      state.loadAdminBannersLoading = true;
      state.position = action.payload.position;
      state.fileUrlPc = action.payload.fileUrlPc;
      state.fileUrlMobile = action.payload.fileUrlMobile;
      state.isVisiblePc = action.payload.isVisiblePc;
      state.isVisibleMobile = action.payload.isVisibleMobile;
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
