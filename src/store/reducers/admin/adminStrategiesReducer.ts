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
  getAdminStrategyDetailPayload,
  getAdminStrategyDetailResult,
  LoadAdminStrategiesResponse,
  ResponseFailure,
  certifiedAdminStrategyPayload,
  deleteAdminStrategyPayload,
  getAdminCommissionDetailResult,
  commissionPayload,
  updateQuantroStrategyPayload,
  updateQuantroIndicatorPayload,
} from '../../types';

export type AdminStrategiesStateType = {
  id: number | null;
  page: number | null;
  category: string | null;
  title: string | null;
  nickname: string | null;
  email: string | null;
  confirmStatus: string | null;
  content: string | null;
  certifiedStrategyPayload: {
    id: number | null;
    comminities: Array<{ channel: string; url: string }> | null;
    platform: string | null;
    symbol: string | null;
    chartCycle: string | null;
    profitPct: number | null;
    confirmStatus: string | null;
    fileUrl: string | null;
  } | null;
  quantroStrategyPayload: {
    category: string | null;
    title: string | null;
    content: string | null;
    platform: string | null;
    symbol: string | null;
    chartCycle: string | null;
    profitPct: number | null;
    fileUrls: Array<string> | null;
  } | null;
  quantroIndicatorPayload: {
    category: string | null;
    title: string | null;
    content: string | null;
    fileUrls: Array<string> | [];
  } | null;
  updateQuantroStrategyPayload: {
    id: number | null;
    category: string | null;
    title: string | null;
    content: string | null;
    platform: string | null;
    symbol: string | null;
    chartCycle: string | null;
    profitPct: number | null;
    fileUrls: Array<string> | null;
  } | null;
  updateQuantroIndicatorPayload: {
    id: number | null;
    category: string | null;
    title: string | null;
    content: string | null;
    fileUrls: Array<string> | [];
  } | null;
  getAdminStrategyResult: {
    total: number | null;
    boards: Array<{
      category: string | null;
      createdAt: string | null;
      deletedAt: string | null;
      id: number | null;
      strategy: { confirmStatus: string } | null;
      title: string | null;
      user: { email: string | null; nickname: string | null };
    }> | null;
  } | null;
  getAdminStrategyDetailResult: {
    category: string | null;
    content: string | null;
    files: Array<{ url: string }> | [];
    strategy: {
      communities: Array<{ channel: string | null; url: string | null }> | null;
      platform: string | null;
      symbol: string | null;
      chartCycle: string | null;
      profitPct: number | null;
      confirmStatus: string | null;
    };
    title: string | null;
    user: { nickname: string | null };
  } | null;
  getAdminCommissionDetailResult: {
    category: string | null;
    content: string | null;
    files: Array<{ url: string }> | [];
    commission: {
      answer: string | null;
    };
    title: string | null;
    user: { nickname: string | null };
  } | null;
  answer: string | null;
  loadAdminStrategiesLoading: boolean;
  loadAdminStrategiesDone: {
    message: string | null;
  } | null;
  loadAdminStrategiesError: string | null;
};

const initialState: AdminStrategiesStateType = {
  id: 0,
  page: 0,
  category: '',
  title: '',
  nickname: '',
  email: '',
  confirmStatus: '',
  content: '',
  certifiedStrategyPayload: null,
  quantroStrategyPayload: null,
  quantroIndicatorPayload: null,
  updateQuantroStrategyPayload: null,
  updateQuantroIndicatorPayload: null,
  getAdminStrategyResult: { total: 0, boards: null },
  getAdminStrategyDetailResult: null,
  getAdminCommissionDetailResult: null,
  answer: null,
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
    changeContent(state, action: PayloadAction<{ content: string | null }>) {
      state.content = action.payload.content;
    },
    getAllAdminStrategies(state, action: PayloadAction<getAdminStrategiesPayload>) {
      state.loadAdminStrategiesLoading = true;
      state.page = action.payload.page;
    },
    getAllAdminStrategiesResult(state, action: PayloadAction<getAdminStrategiesResult>) {
      state.loadAdminStrategiesLoading = false;
      state.getAdminStrategyResult = action.payload;
    },
    getAdminStrategyDetail(state, action: PayloadAction<getAdminStrategyDetailPayload>) {
      state.loadAdminStrategiesLoading = true;
      state.id = action.payload.id;
      state.category = action.payload.category;
    },
    getAdminStrategyDetailResult(state, action: PayloadAction<getAdminStrategyDetailResult>) {
      state.loadAdminStrategiesLoading = false;
      state.getAdminStrategyDetailResult = action.payload;
    },
    getAdminCommissionDetailResult(state, action: PayloadAction<getAdminCommissionDetailResult>) {
      state.loadAdminStrategiesLoading = false;
      state.getAdminCommissionDetailResult = action.payload;
    },
    changeAdminCommission(state, action: PayloadAction<commissionPayload>) {
      state.id = action.payload.id;
      state.answer = action.payload.answer;
    },
    updateAdminCommission(state, action: PayloadAction<commissionPayload>) {
      state.loadAdminStrategiesLoading = true;
      state.id = action.payload.id;
      state.answer = action.payload.answer;
    },
    deleteAdminStrategy(state, action: PayloadAction<deleteAdminStrategyPayload>) {
      state.loadAdminStrategiesLoading = true;
      state.id = action.payload.id;
    },
    changeCertifiedStarteField(state, action: PayloadAction<certifiedAdminStrategyPayload>) {
      state.certifiedStrategyPayload = action.payload;
    },
    updateCertifiedStrategy(state, action: PayloadAction<certifiedAdminStrategyPayload>) {
      state.loadAdminStrategiesLoading = true;
      state.certifiedStrategyPayload = action.payload;
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
    updateQuantroStrategy(state, action: PayloadAction<updateQuantroStrategyPayload>) {
      state.loadAdminStrategiesLoading = true;
      state.updateQuantroStrategyPayload = action.payload;
    },
    updateQuantroIndicator(state, action: PayloadAction<updateQuantroIndicatorPayload>) {
      state.loadAdminStrategiesLoading = true;
      state.updateQuantroIndicatorPayload = action.payload;
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
