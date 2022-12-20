import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  changeGroupPayload,
  changeIsWaitPayload,
  changeNicknamePayload,
  changePagePayload,
  changeTitle,
  CreateAdminGuidePayload,
  CreateAdminInquiryAnswerPayload,
  GetAdminAllGuidesPayload,
  GetAdminAllGuidesResult,
  GetAdminAllInquiriesPayload,
  GetAdminAllInquiriesResult,
  GetAdminGuideDetailPayload,
  GetAdminGuideDetailResult,
  GetAdminInquiryDetailPayload,
  GetAdminInquiryDetailResult,
  LoadAdminCustomersResponse,
  ResponseFailure,
  UpdateAdminGuidePayload,
} from '../../types';

export type AdminCustomersStateType = {
  group: string | null;
  page: number | null;
  guideId: number | null;
  id: number | null;
  inquiryId: number | null;
  nickname: string | null;
  title: string | null;
  isWait: string | null;
  getGuidesResult: {
    total: number | null;
    groups:
      | Array<{
          content: string | null;
          createdAt: string | null;
          group: string | null;
          id: number | null;
          isVisible: boolean;
          title: string | null;
        }>
      | [];
  };
  getGuideDetailResult: {
    content: string | null;
    createdAt: string | null;
    group: string | null;
    id: number | null;
    isVisible: boolean;
    title: string | null;
  } | null;
  getInquiriesResult: {
    total: number | null;
    inquiries:
      | Array<{
          answer: { id: number | null };
          createdAt: string | null;
          id: number | null;
          title: string | null;
          user: { nickname: string | null; email: string | null };
        }>
      | [];
  } | null;
  getInquiryDetailResult: {
    answer: { content: string | null; createdAt: string | null; id: number | null; inquiryId: number | null } | null;
    content: string | null;
    createdAt: '2022-12-01T04:57:24.779Z';
    files: Array<{ url: string }> | [];
    title: string | null;
    user: {
      nickname: string | null;
      photoUrl: string | null;
      styles: Array<{ name: string | null }> | [];
    };
  };
  createGuide: {
    group: string | null;
    title: string | null;
    content: string | null;
    isVisible: boolean;
  } | null;
  UpdateGuide: {
    guideId: number | null;
    group: string | null;
    title: string | null;
    content: string | null;
    isVisible: boolean;
  } | null;
  createInquiryAnswer: {
    inquiryId: number | null;
    content: string | null;
  } | null;
  loadAdminCustomersLoading: boolean;
  loadAdminCustomersDone: {
    message: string | undefined;
  } | null;
  loadAdminCustomersError: string | null;
};

const initialState: AdminCustomersStateType = {
  group: '',
  page: 0,
  guideId: 0,
  id: 0,
  inquiryId: 0,
  nickname: '',
  title: '',
  isWait: '',
  getGuidesResult: { total: 0, groups: [] },
  getGuideDetailResult: null,
  getInquiriesResult: { total: 0, inquiries: [] },
  getInquiryDetailResult: null,
  createGuide: null,
  UpdateGuide: null,
  createInquiryAnswer: null,
  loadAdminCustomersLoading: false,
  loadAdminCustomersDone: null,
  loadAdminCustomersError: null,
};

const adminCustomersSlice = createSlice({
  name: 'adminCustomers',
  initialState,
  reducers: {
    //reset
    initializeAdminCustomersForm(state) {
      Object.assign(state, initialState);
    },
    //action
    changePage(state, action: PayloadAction<changePagePayload>) {
      state.page = action.payload.page;
    },
    changeGroup(state, action: PayloadAction<changeGroupPayload>) {
      state.group = action.payload.group;
    },
    changeNickname(state, action: PayloadAction<changeNicknamePayload>) {
      state.nickname = action.payload.nickname;
    },
    changeTitle(state, action: PayloadAction<changeTitle>) {
      state.title = action.payload.title;
    },
    changeIsWait(state, action: PayloadAction<changeIsWaitPayload>) {
      state.isWait = action.payload.isWait;
    },
    getAdminAllGuides(state, action: PayloadAction<GetAdminAllGuidesPayload>) {
      state.loadAdminCustomersLoading = true;
      state.group = action.payload.group;
      state.page = action.payload.page;
    },
    getAdminAllGuidesResult(state, action: PayloadAction<GetAdminAllGuidesResult>) {
      state.loadAdminCustomersLoading = false;
      state.getGuidesResult = action.payload;
    },
    getAdminGuideDetail(state, action: PayloadAction<GetAdminGuideDetailPayload>) {
      state.loadAdminCustomersLoading = true;
      state.guideId = action.payload.guideId;
    },
    getAdminGuideDetailResult(state, action: PayloadAction<GetAdminGuideDetailResult>) {
      state.loadAdminCustomersLoading = false;
      state.getGuideDetailResult = action.payload;
    },
    changeAdminGuideField(state, action: PayloadAction<CreateAdminGuidePayload>) {
      state.createGuide = action.payload;
    },
    createAdminGuideDetail(state, action: PayloadAction<CreateAdminGuidePayload>) {
      state.loadAdminCustomersLoading = true;
      state.createGuide = action.payload;
    },
    updateAdminGuideDetail(state, action: PayloadAction<UpdateAdminGuidePayload>) {
      state.loadAdminCustomersLoading = true;
      state.UpdateGuide = action.payload;
    },
    deleteAdminGuideDetail(state, action: PayloadAction<GetAdminGuideDetailPayload>) {
      state.loadAdminCustomersLoading = true;
      state.guideId = action.payload.guideId;
    },
    getAdminAllInquiries(state, action: PayloadAction<GetAdminAllInquiriesPayload>) {
      state.loadAdminCustomersLoading = true;
    },
    getAdminAllInquiriesResult(state, action: PayloadAction<GetAdminAllInquiriesResult>) {
      state.loadAdminCustomersLoading = false;
      state.getInquiriesResult = action.payload;
    },
    getAdminInquiryDetail(state, action: PayloadAction<GetAdminInquiryDetailPayload>) {
      state.loadAdminCustomersLoading = true;
      state.inquiryId = action.payload.inquiryId;
    },
    getAdminInquiryDetailResult(state, action: PayloadAction<GetAdminInquiryDetailResult>) {
      state.loadAdminCustomersLoading = false;
      state.getInquiryDetailResult = action.payload;
    },
    deleteAdminInquiry(state, action: PayloadAction<GetAdminInquiryDetailPayload>) {
      state.loadAdminCustomersLoading = true;
      state.inquiryId = action.payload.inquiryId;
    },
    changeAdminInquiryField(state, action: PayloadAction<CreateAdminInquiryAnswerPayload>) {
      state.createInquiryAnswer = action.payload;
    },
    createAdminInquiryAnswer(state, action: PayloadAction<CreateAdminInquiryAnswerPayload>) {
      state.loadAdminCustomersLoading = true;
      state.createInquiryAnswer = action.payload;
    },
    //api res req
    loadAdminCustomersRequest(state) {
      state.loadAdminCustomersLoading = true;
      state.loadAdminCustomersDone = null;
      state.loadAdminCustomersError = null;
    },
    loadAdminCustomersSuccess(state, action: PayloadAction<LoadAdminCustomersResponse>) {
      state.loadAdminCustomersLoading = false;
      state.loadAdminCustomersDone = action.payload;
      state.loadAdminCustomersError = null;
    },
    loadAdminCustomersFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadAdminCustomersLoading = false;
      state.loadAdminCustomersDone = null;
      state.loadAdminCustomersError = action.payload.message;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const adminCustomersActions = adminCustomersSlice.actions;
// RootReducer 생성 시 사용
export default adminCustomersSlice.reducer;
