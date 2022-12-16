import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { adminCustomersActions } from '../../reducers';
import {
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
  UpdateAdminGuidePayload,
} from '../../types';
import {
  apiCreateAdminGuide,
  apiGetAdminAllGuides,
  apiGetAdminAllInquiries,
  apiGetAdminGuideDetail,
  apiGetAdminInquiryDetail,
  apiUpdateAdminGuide,
} from '../../api';

// api
// admin get all Guides
function* getAdminAllGuidesSaga(action: PayloadAction<GetAdminAllGuidesPayload>) {
  yield put(adminCustomersActions.loadAdminCustomersRequest());
  try {
    const { data }: AxiosResponse<GetAdminAllGuidesResult> = yield call(apiGetAdminAllGuides, action.payload);
    console.log(data);

    yield put(adminCustomersActions.getAdminAllGuidesResult(data));
  } catch (error: any) {
    console.error('adminCustomersSaga getAdminAllGuidesSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminCustomersActions.loadAdminCustomersFailure({ status: { ok: false }, message }));
  }
}
// admin get Guide detail
function* getAdminGuideDetailSaga(action: PayloadAction<GetAdminGuideDetailPayload>) {
  yield put(adminCustomersActions.loadAdminCustomersRequest());
  try {
    const { data }: AxiosResponse<GetAdminGuideDetailResult> = yield call(apiGetAdminGuideDetail, action.payload);
    console.log(data);

    yield put(adminCustomersActions.getAdminGuideDetailResult(data));
  } catch (error: any) {
    console.error('adminCustomersSaga getAdminGuideDetailSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminCustomersActions.loadAdminCustomersFailure({ status: { ok: false }, message }));
  }
}
// admin create Guide detail
function* createAdminGuideSaga(action: PayloadAction<CreateAdminGuidePayload>) {
  yield put(adminCustomersActions.loadAdminCustomersRequest());
  try {
    const { data }: AxiosResponse<LoadAdminCustomersResponse> = yield call(apiCreateAdminGuide, action.payload);
    console.log(data);

    yield put(adminCustomersActions.loadAdminCustomersSuccess(data));
  } catch (error: any) {
    console.error('adminCustomersSaga createAdminGuideSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminCustomersActions.loadAdminCustomersFailure({ status: { ok: false }, message }));
  }
}
// admin update Guide detail
function* updateAdminGuideSaga(action: PayloadAction<UpdateAdminGuidePayload>) {
  yield put(adminCustomersActions.loadAdminCustomersRequest());
  try {
    const { data }: AxiosResponse<LoadAdminCustomersResponse> = yield call(apiUpdateAdminGuide, action.payload);
    console.log(data);

    yield put(adminCustomersActions.loadAdminCustomersSuccess(data));
  } catch (error: any) {
    console.error('adminCustomersSaga updateAdminGuideSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminCustomersActions.loadAdminCustomersFailure({ status: { ok: false }, message }));
  }
}
// admin get all inquiries
function* getAdminAllInquiriesSaga(action: PayloadAction<GetAdminAllInquiriesPayload>) {
  yield put(adminCustomersActions.loadAdminCustomersRequest());
  try {
    const { data }: AxiosResponse<GetAdminAllInquiriesResult> = yield call(apiGetAdminAllInquiries, action.payload);
    console.log(data);

    yield put(adminCustomersActions.getAdminAllInquiriesResult(data));
  } catch (error: any) {
    console.error('adminCustomersSaga getAdminAllInquiriesSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminCustomersActions.loadAdminCustomersFailure({ status: { ok: false }, message }));
  }
}
// admin get inquiry detail
function* getAdminInquiryDetailSaga(action: PayloadAction<GetAdminInquiryDetailPayload>) {
  yield put(adminCustomersActions.loadAdminCustomersRequest());
  try {
    const { data }: AxiosResponse<GetAdminInquiryDetailResult> = yield call(apiGetAdminInquiryDetail, action.payload);
    console.log(data);

    yield put(adminCustomersActions.getAdminInquiryDetailResult(data));
  } catch (error: any) {
    console.error('adminCustomersSaga getAdminInquiryDetailSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminCustomersActions.loadAdminCustomersFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(adminCustomersActions.getAdminAllGuides, getAdminAllGuidesSaga);
  yield takeLatest(adminCustomersActions.getAdminGuideDetail, getAdminGuideDetailSaga);
  yield takeLatest(adminCustomersActions.createAdminGuideDetail, createAdminGuideSaga);
  yield takeLatest(adminCustomersActions.updateAdminGuideDetail, updateAdminGuideSaga);
  yield takeLatest(adminCustomersActions.getAdminAllInquiries, getAdminAllInquiriesSaga);
  yield takeLatest(adminCustomersActions.getAdminInquiryDetail, getAdminInquiryDetailSaga);
}

export default function* adminCustomersSaga() {
  yield all([fork(watchLoadfile)]);
}
