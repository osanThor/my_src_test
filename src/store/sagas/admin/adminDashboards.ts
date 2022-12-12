import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { adminDashboardsActions } from '../../reducers';
import { apiGetAdminUserCount } from '../../api';
import { GetAdminUserCountResult } from '../../types';

// api

function* getAllUserCountSaga() {
  yield put(adminDashboardsActions.loadAdminDashboardsRequest());
  try {
    const { data }: AxiosResponse<GetAdminUserCountResult> = yield call(apiGetAdminUserCount);
    console.log(data);

    yield put(adminDashboardsActions.getUserCountResult(data));
  } catch (error: any) {
    console.error('exchangeSaga getAllUserCountSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminDashboardsActions.loadAdminDashboardsFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(adminDashboardsActions.getUserCount, getAllUserCountSaga);
}

export default function* adminDashboardsSaga() {
  yield all([fork(watchLoadfile)]);
}
