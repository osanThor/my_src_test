import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  GetAdminPackageCountResult,
  GetAdminUserCountResult,
  GetAllAdminExchagneCountResult,
  ResponseFailure,
} from '../../types';

export type AdminDashboardStateType = {
  getAllUserCountResult: {
    totalUserCount: number | null;
    comparedLastMonth: number | null;
  } | null;
  getAllExchangeResult: {
    totalExchangeCount: number | null;
    comparedLastMonth: number | null;
    countByPlatforms: Array<{
      date: string | null;
      bybit: number | null;
      bybitTest: number | null;
      binance: number | null;
      binanceTest: number | null;
      bitget: number | null;
    }>;
  } | null;
  getPackageResult: {
    basicCount: number | null;
    regularCount: number | null;
    premiumCount: number | null;
  } | null;
  loadAdminDashboardLoading: boolean;
  loadAdminDashboardDone: {
    message: string | undefined;
  } | null;
  loadAdminDashboardError: string | null;
};

const initialState: AdminDashboardStateType = {
  getAllUserCountResult: null,
  getAllExchangeResult: null,
  getPackageResult: null,
  loadAdminDashboardLoading: false,
  loadAdminDashboardDone: null,
  loadAdminDashboardError: null,
};

const adminDashboardsSlice = createSlice({
  name: 'adminDashBoards',
  initialState,
  reducers: {
    //reset
    initializeBoardsForm(state) {
      Object.assign(state, initialState);
    },
    //action
    getUserCount(state) {
      state.loadAdminDashboardLoading = true;
      state.getAllUserCountResult = null;
    },
    getUserCountResult(state, action: PayloadAction<GetAdminUserCountResult>) {
      state.loadAdminDashboardLoading = false;
      state.getAllUserCountResult = action.payload;
    },
    getExchagneCount(state) {
      state.loadAdminDashboardLoading = true;
      state.getAllExchangeResult = null;
    },
    getExchangeCountResult(state, action: PayloadAction<GetAllAdminExchagneCountResult>) {
      state.loadAdminDashboardLoading = false;
      state.getAllExchangeResult = action.payload;
    },
    getPackageCount(state) {
      state.loadAdminDashboardLoading = true;
      state.getPackageResult = null;
    },
    getPackageCountResult(state, action: PayloadAction<GetAdminPackageCountResult>) {
      state.loadAdminDashboardLoading = false;
      state.getPackageResult = action.payload;
    },
    //api res req
    loadAdminDashboardsRequest(state) {
      state.loadAdminDashboardLoading = true;
      state.loadAdminDashboardDone = null;
      state.loadAdminDashboardError = null;
    },
    loadAdminDashboardsSuccess(state, action: PayloadAction) {
      state.loadAdminDashboardLoading = false;
    },
    loadAdminDashboardsFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadAdminDashboardLoading = false;
      state.loadAdminDashboardDone = null;
      state.loadAdminDashboardError = action.payload.message;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const adminDashboardsActions = adminDashboardsSlice.actions;
// RootReducer 생성 시 사용
export default adminDashboardsSlice.reducer;
