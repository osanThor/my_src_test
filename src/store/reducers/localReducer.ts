import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export type LocalStateType = {
  bgBlur: boolean;
};

const initialState: LocalStateType = {
  bgBlur: false,
};

const localSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    initializeAuthForm(state) {
      Object.assign(state, initialState);
    },
    isLocalBgBlur(state) {
      state.bgBlur = true;
    },
    isNotLocalBgBlur(state) {
      state.bgBlur = false;
    },
  },
});

export const localActions = localSlice.actions;
// RootReducer 생성 시 사용
export default localSlice.reducer;
