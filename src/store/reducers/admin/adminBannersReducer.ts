import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { getAdminBannersPayload, LoadAdminBannersResponse, ResponseFailure } from '../../types';

export type AdminBannersStateType = {
  page: number | null;
  id: number | null;
  platform: string | null;
  position: string | null;
  isVisiblePc: boolean;
  isVisibleMobile: boolean;
  fileUrlPc: string | boolean | null;
  fileUrlMobile: string | boolean | null;
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
