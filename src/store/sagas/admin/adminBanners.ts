import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { adminBannersActions } from '../../reducers';
import {
  createAdminBannerPayload,
  getAdminBannerDetailPayload,
  getAdminBannerDetailResult,
  getAdminBannersPayload,
  getAdminBannersResult,
  LoadAdminBannersResponse,
  updateAdminBannerPayload,
} from '../../types';
import { apiCreateAdminBanner, apiGetAdminAllBanners, apiGetAdminBannerDetail } from '../../api';
import { apiUpdateAdminBanner } from '../../api/admin/banners';

// api
// admin get all banners
function* getAdminAllBannersSaga(action: PayloadAction<getAdminBannersPayload>) {
  yield put(adminBannersActions.loadAdminBannersRequest());
  try {
    const { data }: AxiosResponse<getAdminBannersResult> = yield call(apiGetAdminAllBanners, action.payload);
    console.log(data);

    yield put(adminBannersActions.getAdminBannersResult(data));
  } catch (error: any) {
    console.error('adminBannersSaga getAdminAllBannersSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBannersActions.loadAdminBannersFailure({ status: { ok: false }, message }));
  }
}

// admin get banner detail
function* getAdminBannerDetailSaga(action: PayloadAction<getAdminBannerDetailPayload>) {
  yield put(adminBannersActions.loadAdminBannersRequest());
  try {
    const { data }: AxiosResponse<getAdminBannerDetailResult> = yield call(apiGetAdminBannerDetail, action.payload);
    console.log(data);

    yield put(adminBannersActions.getAdminBannerDetailResult(data));
  } catch (error: any) {
    console.error('adminBannersSaga getAdminBannerDetailSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBannersActions.loadAdminBannersFailure({ status: { ok: false }, message }));
  }
}
// // admin delete banner detail
// function* deleteAdminBannerDetailSaga(action: PayloadAction<getAdminBannerDetailPayload>) {
//   yield put(adminBannersActions.loadAdminBannersRequest());
//   try {
//     const { data }: AxiosResponse<getAdminBannerDetailResult> = yield call(apiDeleteAdminBanner, action.payload);
//     console.log(data);

//     yield put(adminBannersActions.getAdminBannerDetailResult(data));
//   } catch (error: any) {
//     console.error('adminBannersSaga deleteAdminBannerDetailSaga >> ', error);

//     const message =
//       error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

//     // 실패한 액션 디스패치
//     yield put(adminBannersActions.loadAdminBannersFailure({ status: { ok: false }, message }));
//   }
// }

// admin update banner detail
function* updateAdminBannerSaga(action: PayloadAction<updateAdminBannerPayload>) {
  yield put(adminBannersActions.loadAdminBannersRequest());
  try {
    const { data }: AxiosResponse<LoadAdminBannersResponse> = yield call(apiUpdateAdminBanner, action.payload);
    console.log(data);

    yield put(adminBannersActions.loadAdminBannersSuccess(data));
  } catch (error: any) {
    console.error('adminBannersSaga updateAdminBannerSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBannersActions.loadAdminBannersFailure({ status: { ok: false }, message }));
  }
}
// create Banner
function* createAdminBannerSaga(action: PayloadAction<createAdminBannerPayload>) {
  yield put(adminBannersActions.loadAdminBannersRequest());
  try {
    const { data }: AxiosResponse<LoadAdminBannersResponse> = yield call(apiCreateAdminBanner, action.payload);
    console.log(data);

    yield put(adminBannersActions.loadAdminBannersSuccess(data));
  } catch (error: any) {
    console.error('adminBannersSaga createAdminBannerSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBannersActions.loadAdminBannersFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(adminBannersActions.getAdminAllBanners, getAdminAllBannersSaga);
  yield takeLatest(adminBannersActions.getAdminBannerDetail, getAdminBannerDetailSaga);
  yield takeLatest(adminBannersActions.createAdminBanner, createAdminBannerSaga);
  yield takeLatest(adminBannersActions.updateAdminBanner, updateAdminBannerSaga);
}

export default function* adminBannersSaga() {
  yield all([fork(watchLoadfile)]);
}
