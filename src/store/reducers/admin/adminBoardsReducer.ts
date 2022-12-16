import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  changeCategory,
  changePagePayload,
  changeTitle,
  changeUser,
  GetAdminAllBoardsPayload,
  GetAdminAllBoardsResult,
  getAdminBoardCommentsResult,
  GetAdminBoardDetailPayload,
  LoadAdminBoardsResponse,
  ResponseFailure,
  getAdminBoardDetailResult,
  deleteAdminBoardCommentPayload,
  updateAdminNoticePayload,
  createAdminNoticePayload,
} from '../../types';

export type AdminBoardsStateType = {
  page: number | null;
  category: string | null;
  title: string | null;
  user: string | null;
  boardId: number | null;
  commentId: number | null;
  getAdminAllBoardsResult: {
    total: number | null;
    boards: Array<{
      category: string | null;
      createdAt: string | null;
      hits: number | null;
      id: number | null;
      title: string | null;
      user: {
        email: string | null;
        nickname: string | null;
      };
    }> | null;
  } | null;
  getAdminBoardDetailResult: {
    comments:
      | Array<{
          childComment:
            | Array<{
                content: string;
                createdAt: string;
                deletedAt: string | null;
                file: { url: string } | null;
                id: number;
                user: { nickname: string; photoUrl: string | null };
              }>
            | [];
          content: string;
          createdAt: string;
          deletedAt: string | null;
          id: number;
          file: { url: string } | null;
          user: { nickname: string; photoUrl: string | null };
        }>
      | [];
    content: string | null;
    createdAt: string | null;
    files: [];
    hits: number | null;
    id: number | null;
    title: string | null;
    user: {
      photoUrl: string | null;
      nickname: string | null;
      styles:
        | Array<{
            name: string | null;
          }>
        | [];
    };
    _count: {
      likes: number | null;
    };
  } | null;
  getAdminBoardCommentsResult:
    | {
        childComment:
          | Array<{
              content: string;
              createdAt: string;
              deletedAt: string | null;
              file: { url: string } | null;
              id: number;
              user: { nickname: string; photoUrl: string | null };
            }>
          | [];
        content: string;
        createdAt: string;
        deletedAt: string | null;
        id: number;
        file: { url: string } | null;
        user: { nickname: string; photoUrl: string | null };
      }[]
    | [];
  createAdminNotice: {
    title: string | null;
    content: string | null;
    targetCategory: Array<string> | null;
  } | null;
  updateAdminNotice: {
    boardId: number | null;
    title: string | null;
    content: string | null;
    targetCategory: Array<string> | null;
  } | null;
  loadAdminBoardsLoading: boolean;
  loadAdminBoardsDone: {
    message: string | undefined;
  } | null;
  loadAdminBoardsError: string | null;
};

const initialState: AdminBoardsStateType = {
  page: 0,
  category: '',
  title: '',
  user: '',
  boardId: 0,
  commentId: 0,
  getAdminAllBoardsResult: { total: 0, boards: [] },
  getAdminBoardDetailResult: null,
  getAdminBoardCommentsResult: null,
  createAdminNotice: null,
  updateAdminNotice: null,
  loadAdminBoardsLoading: false,
  loadAdminBoardsDone: null,
  loadAdminBoardsError: null,
};

const adminBoardsSlice = createSlice({
  name: 'adminBoards',
  initialState,
  reducers: {
    //reset
    initializeAdminBoardsForm(state) {
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
    changeUser(state, action: PayloadAction<changeUser>) {
      state.user = action.payload.user;
    },
    getAdminAllBoards(state, action: PayloadAction<GetAdminAllBoardsPayload>) {
      state.loadAdminBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
      state.title = action.payload.title;
      state.user = action.payload.user;
    },
    getAdminAllBoardsResult(state, action: PayloadAction<GetAdminAllBoardsResult>) {
      state.loadAdminBoardsLoading = false;
      state.getAdminAllBoardsResult = action.payload;
    },
    getAdminBoardDetail(state, action: PayloadAction<GetAdminBoardDetailPayload>) {
      state.loadAdminBoardsLoading = true;
      state.boardId = action.payload.boardId;
    },
    getAdminBoardDetailResult(state, action: PayloadAction<getAdminBoardDetailResult>) {
      state.loadAdminBoardsLoading = false;
      state.getAdminBoardDetailResult = action.payload;
    },
    getAdminBoardComments(state, action: PayloadAction<GetAdminBoardDetailPayload>) {
      state.loadAdminBoardsLoading = true;
      state.boardId = action.payload.boardId;
    },
    getAdminBoardCommentsResult(state, action: PayloadAction<getAdminBoardCommentsResult>) {
      state.loadAdminBoardsLoading = false;
      state.getAdminBoardCommentsResult = action.payload;
    },
    deleteAdminBoard(state, action: PayloadAction<GetAdminBoardDetailPayload>) {
      state.loadAdminBoardsLoading = true;
      state.boardId = action.payload.boardId;
    },
    deleteAdminComment(state, action: PayloadAction<deleteAdminBoardCommentPayload>) {
      state.loadAdminBoardsLoading = true;
      state.commentId = action.payload.commentId;
    },
    changeAdminNoticeField(state, action: PayloadAction<createAdminNoticePayload>) {
      state.createAdminNotice = action.payload;
    },
    updateAdminNotice(state, action: PayloadAction<updateAdminNoticePayload>) {
      state.loadAdminBoardsLoading = true;
      state.updateAdminNotice = action.payload;
    },
    createAdminNotice(state, action: PayloadAction<createAdminNoticePayload>) {
      state.loadAdminBoardsLoading = true;
      state.createAdminNotice = action.payload;
    },
    //api res req
    loadAdminBoardsRequest(state) {
      state.loadAdminBoardsLoading = true;
      state.loadAdminBoardsDone = null;
      state.loadAdminBoardsError = null;
    },
    loadAdminBoardsSuccess(state, action: PayloadAction<LoadAdminBoardsResponse>) {
      state.loadAdminBoardsLoading = false;
      state.loadAdminBoardsDone = action.payload;
      state.loadAdminBoardsError = null;
    },
    loadAdminBoardsFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadAdminBoardsLoading = false;
      state.loadAdminBoardsDone = null;
      state.loadAdminBoardsError = action.payload.message;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const adminBoardsActions = adminBoardsSlice.actions;
// RootReducer 생성 시 사용
export default adminBoardsSlice.reducer;
