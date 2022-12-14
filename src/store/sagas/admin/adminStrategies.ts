import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { adminStrategiesActions } from '../../reducers';
import { apiGetAdminAllStrategies } from '../../api';
import { getAdminStrategiesPayload, getAdminStrategiesResult, LoadAdminStrategiesResponse } from '../../types';

// api

function* getAllUserCountSaga(action: PayloadAction<getAdminStrategiesPayload>) {
  yield put(adminStrategiesActions.loadAdminStrategiesRequest());
  try {
    const { data }: AxiosResponse<getAdminStrategiesResult> = yield call(apiGetAdminAllStrategies, action.payload);
    console.log(data);

    yield put(adminStrategiesActions.getAllAdminStrategiesResult(data));
  } catch (error: any) {
    console.error('adminStrategiesSaga getAllUserCountSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminStrategiesActions.loadAdminStrategiesFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(adminStrategiesActions.getAllAdminStrategies, getAllUserCountSaga);
}

export default function* adminStrategiesSaga() {
  yield all([fork(watchLoadfile)]);
}
