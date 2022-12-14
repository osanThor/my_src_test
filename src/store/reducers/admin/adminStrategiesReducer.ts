import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  changeCategory,
  changeConfirmStatusPayload,
  changeEmailPayload,
  changeNicknamePayload,
  changePagePayload,
  changeTitle,
  createQuantroIndicatorPayload,
  createQuantroStrategyPayload,
  getAdminStrategiesPayload,
  getAdminStrategiesResult,
  LoadAdminStrategiesResponse,
  ResponseFailure,
} from '../../types';

export type AdminStrategiesStateType = {
  page: number | null;
  category: string | null;
  title: string | null;
  nickname: string | null;
  email: string | null;
  confirmStatus: string | null;
  quantroStrategyPayload: {
    category: string | null;
    title: string | null;
    content: string | null;
    fileUrls: [string] | [];
    platform: string | null;
    symbol: string | null;
    chartCycle: string | null;
    profitPct: number | null;
  } | null;
  quantroIndicatorPayload: {
    category: string | null;
    title: string | null;
    content: string | null;
    fileUrls: [string] | [];
  } | null;
  getAdminStrategyResult: {
    total: number | null;
    strategies: Array<{
      board: {
        title: string | null;
        user: { email: string | null; nickname: string | null };
        category: string | null;
        createdAt: string | null;
      };
      confirmStatus: string | null;
    }> | null;
  } | null;
  loadAdminStrategiesLoading: boolean;
  loadAdminStrategiesDone: {
    message: string | null;
  } | null;
  loadAdminStrategiesError: string | null;
};

const initialState: AdminStrategiesStateType = {
  page: 0,
  category: '',
  title: '',
  nickname: '',
  email: '',
  confirmStatus: '',
  quantroStrategyPayload: null,
  quantroIndicatorPayload: null,
  getAdminStrategyResult: { total: 0, strategies: null },
  loadAdminStrategiesLoading: false,
  loadAdminStrategiesDone: null,
  loadAdminStrategiesError: null,
};

const adminStrategiesSlice = createSlice({
  name: 'adminStrategies',
  initialState,
  reducers: {
    //reset
    initializeAdminStrategiesForm(state) {
      Object.assign(state, initialState);
    },
    //action
    changePage(state, action: PayloadAction<changePagePayload>) {
      state.page = action.payload.page;
    },
    changeCategory(state, action: PayloadAction<changeCategory>) {
      state.category = action.payload.category;
    },
    changeTitle(state, action: PayloadAction<changeTitle>) {
      state.title = action.payload.title;
    },
    changeNickname(state, action: PayloadAction<changeNicknamePayload>) {
      state.nickname = action.payload.nickname;
    },
    changeEmail(state, action: PayloadAction<changeEmailPayload>) {
      state.email = action.payload.email;
    },
    changeConfirmStatus(state, action: PayloadAction<changeConfirmStatusPayload>) {
      state.confirmStatus = action.payload.confirmStatus;
    },
    getAllAdminStrategies(state, action: PayloadAction<getAdminStrategiesPayload>) {
      state.loadAdminStrategiesLoading = true;
      state.page = action.payload.page;
    },
    getAllAdminStrategiesResult(state, action: PayloadAction<getAdminStrategiesResult>) {
      state.loadAdminStrategiesLoading = true;
      state.getAdminStrategyResult = action.payload;
    },
    //quantro indicator strategy
    changeQuantroStrategyField(state, action: PayloadAction<createQuantroStrategyPayload>) {
      state.quantroStrategyPayload = action.payload;
    },
    changeQuantroIndicatorField(state, action: PayloadAction<createQuantroIndicatorPayload>) {
      state.quantroIndicatorPayload = action.payload;
    },
    createQuantroStrategy(state, action: PayloadAction<createQuantroStrategyPayload>) {
      state.loadAdminStrategiesLoading = true;
      state.quantroStrategyPayload = action.payload;
    },
    createQuantroIndicator(state, action: PayloadAction<createQuantroIndicatorPayload>) {
      state.loadAdminStrategiesLoading = true;
      state.quantroIndicatorPayload = action.payload;
    },
    loadAdminStrategiesRequest(state) {
      state.loadAdminStrategiesLoading = true;
      state.loadAdminStrategiesDone = null;
      state.loadAdminStrategiesError = null;
    },
    loadAdminStrategiesSuccess(state, action: PayloadAction<LoadAdminStrategiesResponse>) {
      state.loadAdminStrategiesLoading = false;
      state.loadAdminStrategiesDone = action.payload;
      state.loadAdminStrategiesError = null;
    },
    loadAdminStrategiesFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadAdminStrategiesLoading = false;
      state.loadAdminStrategiesDone = null;
      state.loadAdminStrategiesError = action.payload.message;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const adminStrategiesActions = adminStrategiesSlice.actions;
// RootReducer 생성 시 사용
export default adminStrategiesSlice.reducer;
