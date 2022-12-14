import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  CreateUpdateApiKeyPayload,
  GetAllExchangeResult,
  LoadExchangeIdPayload,
  LoadExchangeResponse,
  ResponseFailure,
} from '../types';

export type ExchangeStateType = {
  exchange: string | null;
  id: string | null;
  alias: string | null;
  apiKey: string | null;
  apiSecret: string | null;
  exchangeId: string | null;
  apiKeyObj: {
    id: string | null;
    alias: string | null;
    apiKey: string | null;
    apiSecret: string | null;
  } | null;
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
  apiKeyObj: null,
  allExchangeResult: [],
  loadExchangeLoading: false,
  loadExchangeDone: { message: '' },
  loadExchangeError: null,
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    initializeExchangeState(state) {
      Object.assign(state, initialState);
    },
    //state
    changeExchangeId(state, action: PayloadAction<LoadExchangeIdPayload>) {
      state.exchangeId = action.payload.exchangeId;
    },
    // get all exchange
    getAllExchange(state) {
      state.loadExchangeLoading = true;
      state.allExchangeResult = [];
      state.loadExchangeError = null;
    },
    getAllExchangeResult(state, action: PayloadAction<GetAllExchangeResult>) {
      state.loadExchangeLoading = false;
      state.allExchangeResult = action.payload;
    },
    //create API Key
    chagneCreateApiKeyFeild(state, action: PayloadAction<CreateUpdateApiKeyPayload>) {
      state.exchange = action.payload.exchange;
      state.apiKeyObj = action.payload.apiKeyObj;
    },
    createApiKey(state, action: PayloadAction<CreateUpdateApiKeyPayload>) {
      state.loadExchangeLoading = true;
      state.exchange = action.payload.exchange;
      state.apiKeyObj = action.payload.apiKeyObj;
    },
    //close position
    closePosition(state, action: PayloadAction<LoadExchangeIdPayload>) {
      state.loadExchangeLoading = true;
      state.exchangeId = action.payload.exchangeId;
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
