import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { LoadFileBody, LoadFileResponse, ResponseFailure } from '../types';

export type FileStateType = {
  data: FormData | string | null;
  loadFileLoading: boolean;
  loadFileDone: {
    message: string | null;
    url: string | null;
  };
  loadFileError: string | null;
};

const initialState: FileStateType = {
  data: '',
  loadFileLoading: false,
  loadFileDone: {
    message: '',
    url: '',
  },
  loadFileError: null,
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    initializeFileState(state) {
      Object.assign(state, initialState);
    },
    uploadProfileImage(state, action: PayloadAction<LoadFileBody>) {
      state.data = action.payload;
    },
    loadFileRequest(state) {
      state.loadFileLoading = true;
      state.loadFileDone = { message: '', url: '' };
      state.loadFileError = null;
    },
    loadFileSuccess(state, action: PayloadAction<LoadFileResponse>) {
      state.loadFileLoading = false;
      state.loadFileDone = action.payload;
    },
    loadFileFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadFileLoading = false;
      state.loadFileDone = { message: '', url: '' };
      state.loadFileError = action.payload.message;
    },
  },
});

export const fileActions = fileSlice.actions;
// RootReducer 생성 시 사용
export default fileSlice.reducer;
