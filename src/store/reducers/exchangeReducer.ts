import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { GetAllExchangeResult, LoadExchangeResponse, ResponseFailure } from '../types';

export type ExchangeStateType = {
  exchange: string | null;
  id: string | null;
  alias: string | null;
  apiKey: string | null;
  apiSecret: string | null;
  exchangeId: string | null;
  allExchangeResult:
    | Array<{
        id: string | null;
        platform: string | null;
        alias: string | null;
        apiKey: string | null;
        isReferral: boolean | null;
        balance: null;
        profit: null;
        totalProfit: null;
        orders: [];
        pastProfits: [];
        positions: [];
      }>
    | [];
  loadExchangeLoading: boolean;
  loadExchangeDone: { message: string | null } | null;
  loadExchangeError: string | null;
};

const initialState: ExchangeStateType = {
  exchange: '',
  id: '',
  alias: '',
  apiKey: '',
  apiSecret: '',
  exchangeId: '',
  allExchangeResult: [],
  loadExchangeLoading: false,
  loadExchangeDone: { message: '' },
  loadExchangeError: null,
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    initializeFileState(state) {
      Object.assign(state, initialState);
    },
    getAllExchange(state) {
      state.loadExchangeLoading = true;
      state.allExchangeResult = [];
      state.loadExchangeError = null;
    },
    getAllExchangeResult(state, action: PayloadAction<GetAllExchangeResult>) {
      state.loadExchangeLoading = false;
      state.allExchangeResult = action.payload;
    },
    //api res req
    loadBoardsRequest(state) {
      state.loadExchangeLoading = true;
      state.loadExchangeDone = null;
      state.loadExchangeError = null;
    },
    loadBoardsSuccess(state, action: PayloadAction<LoadExchangeResponse>) {
      state.loadExchangeLoading = false;
      state.loadExchangeDone = action.payload;
    },
    loadBoardsFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadExchangeLoading = false;
      state.loadExchangeDone = null;
      state.loadExchangeError = action.payload.message;
    },
  },
});

export const exchangeActions = exchangeSlice.actions;
// RootReducer 생성 시 사용
export default exchangeSlice.reducer;
