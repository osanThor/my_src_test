import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export type LocalStateType = {
  bgBlur: boolean;
  basic: boolean;
  order: boolean;
  quantity: boolean;
  option: boolean;
  orderMessage: boolean;
  noSignMessage: boolean;
  errorMessage: boolean;
};

const initialState: LocalStateType = {
  //container blur state
  bgBlur: false,
  //writeQuant state
  basic: true,
  order: false,
  quantity: false,
  option: false,
  //message state
  orderMessage: true,
  noSignMessage: false,
  errorMessage: false,
};

const localSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    //reset
    initializeAuthForm(state) {
      Object.assign(state, initialState);
    },
    //container blur
    isLocalBgBlur(state) {
      state.bgBlur = true;
    },
    isNotLocalBgBlur(state) {
      state.bgBlur = false;
    },
    //writeQuant Actions
    gotoBasic(state) {
      state.basic = true;
      state.order = false;
      state.quantity = false;
      state.option = false;
    },
    gotoOrder(state) {
      state.basic = false;
      state.order = true;
      state.quantity = false;
      state.option = false;
    },
    gotoQuantity(state) {
      state.basic = false;
      state.order = false;
      state.quantity = true;
      state.option = false;
    },
    gotoOption(state) {
      state.basic = false;
      state.order = false;
      state.quantity = false;
      state.option = true;
    },
    //message Page Actions
    gotoOrderMessage(state) {
      state.orderMessage = true;
      state.noSignMessage = false;
      state.errorMessage = false;
    },
    gotoNoSignMessage(state) {
      state.orderMessage = false;
      state.noSignMessage = true;
      state.errorMessage = false;
    },
    gotoErrorMessage(state) {
      state.orderMessage = false;
      state.noSignMessage = false;
      state.errorMessage = true;
    },
  },
});

export const localActions = localSlice.actions;
// RootReducer 생성 시 사용
export default localSlice.reducer;