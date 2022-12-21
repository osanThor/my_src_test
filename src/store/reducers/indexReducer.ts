import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { getBoardsPayload, getBoardsResult, LoadBoardsResponse, ResponseFailure } from '../types';

export type IndexStateType = {
  category: string | null;
  page: number | null;
  user: string | null;
  comment: string | null;
  title: string | null;
  rankIsPopStr: boolean;
  rankIsProStr: boolean;
  rankIsPctTra: boolean;
  rankIsProTra: boolean;
  fileUrls: Array<string> | [];
  loadGetCertifiedDone: {
    total: number | null;
    boards:
      | Array<{
          id: number;
          title: string;
          hits: number;
          createdAt: string;
          deletedAt: string | null;
          user: {
            nickname: string;
            styles: Array<{ name: string }> | null;
            photoUrl: string | null;
          };
          strategy: {
            calcMdd: number | null;
            calcProfitPct: number | null;
            calcWinningPct: number | null;
            communities: Array<{ channel: string | null; url: string | null }> | null;
          } | null;
          _count: {
            comments: number;
          };
        }>
      | [];
  };
  CertifiedDone: boolean;
  loadGetRankDone: {
    total: number | null;
    boards:
      | Array<{
          id: number;
          title: string;
          hits: number;
          createdAt: string;
          user: {
            nickname: string;
          };
          _count: {
            comments: number;
          };
        }>
      | [];
  };
  RankDone: boolean;
  loadGetUserStrategyDone: {
    total: number | null;
    boards:
      | Array<{
          id: number;
          title: string;
          hits: number;
          createdAt: string;
          user: {
            nickname: string;
          };
          _count: {
            comments: number;
          };
        }>
      | [];
  };
  UserStrategyDone: boolean;
  loadGetDiscussionDone: {
    total: number | null;
    boards:
      | Array<{
          id: number;
          title: string;
          hits: number;
          createdAt: string;
          user: {
            nickname: string;
          };
          _count: {
            comments: number;
          };
        }>
      | [];
  };
  DiscussionDone: boolean;
  loadGetQuantroStrategyDone: {
    total: number | null;
    boards:
      | Array<{
          id: number;
          title: string;
          hits: number;
          createdAt: string;
          user: {
            nickname: string;
          };
          _count: {
            comments: number;
          };
        }>
      | [];
  };
  QuantroStrategyDone: boolean;
  loadBoardsLoading: boolean;
  loadBoardsDone: {
    message: string | undefined;
  } | null;
  loadBoardsError: string | null;
};

const initialState: IndexStateType = {
  category: '',
  page: 1,
  user: '',
  comment: '',
  title: '',
  fileUrls: [],
  loadGetCertifiedDone: { total: 0, boards: [] },
  CertifiedDone: false,
  loadGetRankDone: { total: 0, boards: [] },
  RankDone: false,
  loadGetUserStrategyDone: { total: 0, boards: [] },
  UserStrategyDone: false,
  loadGetDiscussionDone: { total: 0, boards: [] },
  DiscussionDone: false,
  loadGetQuantroStrategyDone: { total: 0, boards: [] },
  QuantroStrategyDone: false,
  rankIsPopStr: false,
  rankIsProStr: false,
  rankIsPctTra: false,
  rankIsProTra: false,
  loadBoardsLoading: false,
  loadBoardsDone: null,
  loadBoardsError: null,
};

const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    //reset
    initializeIndexFeild(state) {
      Object.assign(state, initialState);
    },
    //action
    //boards
    getIndexBoards(state, action: PayloadAction<getBoardsPayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
      state.user = action.payload.user;
      state.title = action.payload.title;
      state.comment = action.payload.comment;
    },
    getCertified(state, action: PayloadAction<getBoardsPayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
      state.user = action.payload.user;
      state.title = action.payload.title;
      state.comment = action.payload.comment;
    },
    getRank(state, action: PayloadAction<getBoardsPayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
      state.user = action.payload.user;
      state.title = action.payload.title;
      state.comment = action.payload.comment;
    },
    getUserStrategy(state, action: PayloadAction<getBoardsPayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
      state.user = action.payload.user;
      state.title = action.payload.title;
      state.comment = action.payload.comment;
    },
    getDiscussion(state, action: PayloadAction<getBoardsPayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
      state.user = action.payload.user;
      state.title = action.payload.title;
      state.comment = action.payload.comment;
    },
    getQunatroStrategy(state, action: PayloadAction<getBoardsPayload>) {
      state.loadBoardsLoading = true;
      state.category = action.payload.category;
      state.page = action.payload.page;
      state.user = action.payload.user;
      state.title = action.payload.title;
      state.comment = action.payload.comment;
    },
    getCertifiedResult(state, action: PayloadAction<getBoardsResult>) {
      state.loadBoardsLoading = false;
      state.loadGetCertifiedDone = action.payload;
    },
    certifiedDone(state) {
      state.CertifiedDone = true;
    },
    getRankResult(state, action: PayloadAction<getBoardsResult>) {
      state.loadBoardsLoading = false;
      state.loadGetRankDone = action.payload;
    },
    RankDone(state) {
      state.RankDone = true;
    },
    getUserStrategyResult(state, action: PayloadAction<getBoardsResult>) {
      state.loadBoardsLoading = false;
      state.loadGetUserStrategyDone = action.payload;
    },
    UserStrategyDone(state) {
      state.UserStrategyDone = true;
    },
    getDiscussionResult(state, action: PayloadAction<getBoardsResult>) {
      state.loadBoardsLoading = false;
      state.loadGetDiscussionDone = action.payload;
    },
    DiscussionDone(state) {
      state.DiscussionDone = true;
    },
    getQuantroStrategyResult(state, action: PayloadAction<getBoardsResult>) {
      state.loadBoardsLoading = false;
      state.loadGetQuantroStrategyDone = action.payload;
    },
    QuantroStrategyDone(state) {
      state.QuantroStrategyDone = true;
    },
    //rank
    isRankPopStra(state) {
      state.rankIsPopStr = true;
      state.rankIsProStr = false;
      state.rankIsPctTra = false;
      state.rankIsProTra = false;
    },
    isRankProStra(state) {
      state.rankIsPopStr = false;
      state.rankIsProStr = true;
      state.rankIsPctTra = false;
      state.rankIsProTra = false;
    },
    isRankPctTra(state) {
      state.rankIsPopStr = false;
      state.rankIsProStr = false;
      state.rankIsPctTra = true;
      state.rankIsProTra = false;
    },
    isRankProTra(state) {
      state.rankIsPopStr = false;
      state.rankIsProStr = false;
      state.rankIsPctTra = false;
      state.rankIsProTra = true;
    },
    //api res req
    loadBoardsRequest(state) {
      state.loadBoardsLoading = true;
      state.loadBoardsDone = null;
      state.loadBoardsError = null;
    },
    loadBoardsSuccess(state, action: PayloadAction<LoadBoardsResponse>) {
      state.loadBoardsLoading = false;
      state.loadBoardsDone = action.payload;
    },
    loadBoardsFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadBoardsLoading = false;
      state.loadBoardsDone = null;
      state.loadBoardsError = action.payload.message;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const indexActions = indexSlice.actions;
// RootReducer 생성 시 사용
export default indexSlice.reducer;
