import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { adminStrategiesActions } from '../../reducers';
import {
  apiCertifiedAdminStrategy,
  apiCreateQuantroIndicator,
  apiCreateQuantroStrategy,
  apiGetAdminAllStrategies,
  apiGetAdminStrategyDetail,
} from '../../api';
import {
  certifiedAdminStrategyPayload,
  createQuantroIndicatorPayload,
  createQuantroStrategyPayload,
  getAdminStrategiesPayload,
  getAdminStrategiesResult,
  getAdminStrategyDetailPayload,
  getAdminStrategyDetailResult,
  LoadAdminStrategiesResponse,
} from '../../types';

// api

function* getAllAdminStrategiesSaga(action: PayloadAction<getAdminStrategiesPayload>) {
  yield put(adminStrategiesActions.loadAdminStrategiesRequest());
  try {
    const { data }: AxiosResponse<getAdminStrategiesResult> = yield call(apiGetAdminAllStrategies, action.payload);
    console.log(data);

    yield put(adminStrategiesActions.getAllAdminStrategiesResult(data));
  } catch (error: any) {
    console.error('adminStrategiesSaga getAllAdminStrategiesSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminStrategiesActions.loadAdminStrategiesFailure({ status: { ok: false }, message }));
  }
}

function* getAllAdminStrategyDetailSaga(action: PayloadAction<getAdminStrategyDetailPayload>) {
  yield put(adminStrategiesActions.loadAdminStrategiesRequest());
  try {
    const { data }: AxiosResponse<getAdminStrategyDetailResult> = yield call(apiGetAdminStrategyDetail, action.payload);
    console.log(data);

    yield put(adminStrategiesActions.getAdminStrategyDetailResult(data));
  } catch (error: any) {
    console.error('adminStrategiesSaga getAllAdminStrategiesSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminStrategiesActions.loadAdminStrategiesFailure({ status: { ok: false }, message }));
  }
}
function* updateAdminCertifiedStrategySaga(action: PayloadAction<certifiedAdminStrategyPayload>) {
  yield put(adminStrategiesActions.loadAdminStrategiesRequest());
  try {
    const { data }: AxiosResponse<LoadAdminStrategiesResponse> = yield call(apiCertifiedAdminStrategy, action.payload);
    console.log(data);

    yield put(adminStrategiesActions.loadAdminStrategiesSuccess(data));
  } catch (error: any) {
    console.error('adminStrategiesSaga updateAdminCertifiedStrategySaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminStrategiesActions.loadAdminStrategiesFailure({ status: { ok: false }, message }));
  }
}

//create quantro strategy
function* createQuantroStrategySaga(action: PayloadAction<createQuantroStrategyPayload>) {
  yield put(adminStrategiesActions.loadAdminStrategiesRequest());
  try {
    const { data }: AxiosResponse<LoadAdminStrategiesResponse> = yield call(apiCreateQuantroStrategy, action.payload);
    console.log(data);

    yield put(adminStrategiesActions.loadAdminStrategiesSuccess(data));
  } catch (error: any) {
    console.error('adminStrategiesSaga createQuantroStrategySaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminStrategiesActions.loadAdminStrategiesFailure({ status: { ok: false }, message }));
  }
}

//create quantro indicator
function* createQuantroIndicatorSaga(action: PayloadAction<createQuantroIndicatorPayload>) {
  yield put(adminStrategiesActions.loadAdminStrategiesRequest());
  try {
    const { data }: AxiosResponse<LoadAdminStrategiesResponse> = yield call(apiCreateQuantroIndicator, action.payload);
    console.log(data);

    yield put(adminStrategiesActions.loadAdminStrategiesSuccess(data));
  } catch (error: any) {
    console.error('adminStrategiesSaga createQuantroIndicatorSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminStrategiesActions.loadAdminStrategiesFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(adminStrategiesActions.getAllAdminStrategies, getAllAdminStrategiesSaga);
  yield takeLatest(adminStrategiesActions.createQuantroStrategy, createQuantroStrategySaga);
  yield takeLatest(adminStrategiesActions.createQuantroIndicator, createQuantroIndicatorSaga);
  yield takeLatest(adminStrategiesActions.getAdminStrategyDetail, getAllAdminStrategyDetailSaga);
  yield takeLatest(adminStrategiesActions.updateCertifiedStrategy, updateAdminCertifiedStrategySaga);
}

export default function* adminStrategiesSaga() {
  yield all([fork(watchLoadfile)]);
}
