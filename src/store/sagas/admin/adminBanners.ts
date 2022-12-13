import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { adminBannersActions } from '../../reducers';
import {
  getAdminBannerDetailPayload,
  getAdminBannersPayload,
  getAdminBannersResult,
  getAdminSubscripbePlatformPayload,
  LoadAdminBannersResponse,
} from '../../types';
import {
  apiGetAdminAllBanners,
  apiGetAdminBannerDetail,
  apiGetAdminMainBanners,
  apiGetAdminSubscribeBanners,
  apiGetAdminSubscribeByPlatformBanners,
} from '../../api';

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
// admin get Main banners
function* getAdminMainBannersSaga(action: PayloadAction<getAdminBannersPayload>) {
  yield put(adminBannersActions.loadAdminBannersRequest());
  try {
    const { data }: AxiosResponse<getAdminBannersResult> = yield call(apiGetAdminMainBanners, action.payload);
    console.log(data);

    yield put(adminBannersActions.getAdminBannersResult(data));
  } catch (error: any) {
    console.error('adminBannersSaga getAdminMainBannersSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBannersActions.loadAdminBannersFailure({ status: { ok: false }, message }));
  }
}

// admin get subScribe banners
function* getAdminsubScribeBannersSaga(action: PayloadAction<getAdminBannersPayload>) {
  yield put(adminBannersActions.loadAdminBannersRequest());
  try {
    const { data }: AxiosResponse<getAdminBannersResult> = yield call(apiGetAdminSubscribeBanners, action.payload);
    console.log(data);

    yield put(adminBannersActions.getAdminBannersResult(data));
  } catch (error: any) {
    console.error('adminBannersSaga getAdminsubScribeBannersSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBannersActions.loadAdminBannersFailure({ status: { ok: false }, message }));
  }
}
// admin get subScribe banners by platform
function* getAdminsubScribeBannersByPlatformSaga(action: PayloadAction<getAdminSubscripbePlatformPayload>) {
  yield put(adminBannersActions.loadAdminBannersRequest());
  try {
    const { data }: AxiosResponse<getAdminBannersResult> = yield call(
      apiGetAdminSubscribeByPlatformBanners,
      action.payload,
    );
    console.log(data);

    yield put(adminBannersActions.getAdminBannersResult(data));
  } catch (error: any) {
    console.error('adminBannersSaga getAdminsubScribeBannersByPlatformSaga >> ', error);

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
    const { data }: AxiosResponse<LoadAdminBannersResponse> = yield call(apiGetAdminBannerDetail, action.payload);
    console.log(data);

    yield put(adminBannersActions.loadAdminBannersSuccess(data));
  } catch (error: any) {
    console.error('adminBannersSaga getAdminBannerDetailSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBannersActions.loadAdminBannersFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(adminBannersActions.getAdminAllBanners, getAdminAllBannersSaga);
  yield takeLatest(adminBannersActions.getAdminMainBanners, getAdminMainBannersSaga);
  yield takeLatest(adminBannersActions.getAdminSubScribeBanners, getAdminsubScribeBannersSaga);
  yield takeLatest(adminBannersActions.getAdminSubScribeByPlatformBanners, getAdminsubScribeBannersByPlatformSaga);
  yield takeLatest(adminBannersActions.getAdminBannerDetail, getAdminBannerDetailSaga);
}

export default function* adminBannersSaga() {
  yield all([fork(watchLoadfile)]);
}
