import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { getAdminStrategiesPayload, LoadAdminStrategiesResponse, ResponseFailure } from '../../types';

export type AdminStrategiesStateType = {
  page: number | null;
  loadAdminStrategiesLoading: boolean;
  loadAdminStrategiesDone: {
    message: string | null;
  } | null;
  loadAdminStrategiesError: string | null;
};

const initialState: AdminStrategiesStateType = {
  page: 0,
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
    changePage(state, action: PayloadAction<getAdminStrategiesPayload>) {
      state.page = action.payload.page;
    },
    getAllAdminStrategies(state, action: PayloadAction<getAdminStrategiesPayload>) {
      state.loadAdminStrategiesLoading = true;
      state.page = action.payload.page;
    },
    getAllAdminStrategiesResult(state, action: PayloadAction<getAdminStrategiesPayload>) {
      state.loadAdminStrategiesLoading = true;
      state.page = action.payload.page;
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
