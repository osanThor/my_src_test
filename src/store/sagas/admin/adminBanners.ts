import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { adminBannersActions } from '../../reducers';
import { getAdminBannersPayload, LoadAdminBannersResponse } from '../../types';
import { apiGetAdminAllBanners } from '../../api';

// api
// admin get all banners
function* getAdminAllBannersSaga(action: PayloadAction<getAdminBannersPayload>) {
  yield put(adminBannersActions.loadAdminBannersRequest());
  try {
    const { data }: AxiosResponse<LoadAdminBannersResponse> = yield call(apiGetAdminAllBanners, action.payload);
    console.log(data);

    yield put(adminBannersActions.loadAdminBannersSuccess(data));
  } catch (error: any) {
    console.error('adminBannersSaga getAdminAllBannersSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBannersActions.loadAdminBannersFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(adminBannersActions.getAdminAllBanners, getAdminAllBannersSaga);
}

export default function* adminBannersSaga() {
  yield all([fork(watchLoadfile)]);
}
