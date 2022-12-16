import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  changeGroupPayload,
  changePagePayload,
  CreateAdminGuidePayload,
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
  getGuidesResult: { total: number | null; guides: Array<any> | [] };
  getGuideDetailResult: any;
  getInquiriesResult: { total: number | null; inquiries: Array<any> | [] };
  getInquiryDetailResult: any;
  createGuide: {
    group: string | null;
    title: string | null;
    content: string | null;
    isVisible: boolean;
  } | null;
  UpdateGuide: {
    id: number | null;
    group: string | null;
    title: string | null;
    content: string | null;
    isVisible: boolean;
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
  getGuidesResult: { total: 0, guides: [] },
  getGuideDetailResult: null,
  getInquiriesResult: { total: 0, inquiries: [] },
  getInquiryDetailResult: null,
  createGuide: null,
  UpdateGuide: null,
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
    createAdminGuideDetail(state, action: PayloadAction<CreateAdminGuidePayload>) {
      state.loadAdminCustomersLoading = true;
      state.createGuide = action.payload;
    },
    updateAdminGuideDetail(state, action: PayloadAction<UpdateAdminGuidePayload>) {
      state.loadAdminCustomersLoading = true;
      state.UpdateGuide = action.payload;
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
