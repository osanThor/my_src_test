import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { LoadBoardsBody, LoadBoardsResponse, ResponseFailure } from '../types';

export type BoardsStateType = {
  category: string | null;
  title: string | null;
  content: string | null;
  fileUrls: Array<[string]> | [];
  loadBoardsLoading: boolean;
  loadBoardsDone: {
    message: string | undefined;
  } | null;
  loadBoardsError: string | null;
};

const initialState: BoardsStateType = {
  category: '',
  title: '',
  content: '',
  fileUrls: [],
  loadBoardsLoading: false,
  loadBoardsDone: null,
  loadBoardsError: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    //reset
    initializeBoardsForm(state) {
      Object.assign(state, initialState);
    },
    // boards payload
    changeBoardsField(state, action: PayloadAction<LoadBoardsBody>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.fileUrls = action.payload.fileUrls;
    },
    loadUserRequest(state) {
      state.loadBoardsLoading = true;
      state.loadBoardsDone = null;
      state.loadBoardsError = null;
    },
    loadUserSuccess(state, action: PayloadAction<LoadBoardsResponse>) {
      state.loadBoardsLoading = false;
      state.loadBoardsDone = action.payload;
    },
    loadUserFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadBoardsLoading = false;
      state.loadBoardsDone = null;
      state.loadBoardsError = action.payload.message;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const boardsActions = boardsSlice.actions;
// RootReducer 생성 시 사용
export default boardsSlice.reducer;
