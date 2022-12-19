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
  apiDeleteAdminStrategy,
  apiGetAdminAllStrategies,
  apiGetAdminStrategyDetail,
  apiUpdateAdminCommission,
} from '../../api';
import {
  certifiedAdminStrategyPayload,
  commissionPayload,
  createQuantroIndicatorPayload,
  createQuantroStrategyPayload,
  deleteAdminStrategyPayload,
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
    const { data }: AxiosResponse = yield call(apiGetAdminStrategyDetail, action.payload);
    console.log(data);
    if (action.payload.category === 'CERTIFIED_STRATEGY') {
      yield put(adminStrategiesActions.getAdminStrategyDetailResult(data));
    } else if (action.payload.category === 'COMMISSION') {
      yield put(adminStrategiesActions.getAdminCommissionDetailResult(data));
    } else {
      yield put(adminStrategiesActions.getAdminStrategyDetailResult(data));
    }
  } catch (error: any) {
    console.error('adminStrategiesSaga getAllAdminStrategiesSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminStrategiesActions.loadAdminStrategiesFailure({ status: { ok: false }, message }));
  }
}

//delete strategy
function* deleteAdminStrategySaga(action: PayloadAction<deleteAdminStrategyPayload>) {
  yield put(adminStrategiesActions.loadAdminStrategiesRequest());
  try {
    const { data }: AxiosResponse<LoadAdminStrategiesResponse> = yield call(apiDeleteAdminStrategy, action.payload);
    console.log(data);

    yield put(adminStrategiesActions.loadAdminStrategiesSuccess(data));
  } catch (error: any) {
    console.error('adminStrategiesSaga deleteAdminStrategySaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminStrategiesActions.loadAdminStrategiesFailure({ status: { ok: false }, message }));
  }
}

//update commission
function* updateAdminCommissionSaga(action: PayloadAction<commissionPayload>) {
  yield put(adminStrategiesActions.loadAdminStrategiesRequest());
  try {
    const { data }: AxiosResponse<LoadAdminStrategiesResponse> = yield call(apiUpdateAdminCommission, action.payload);
    console.log(data);

    yield put(adminStrategiesActions.loadAdminStrategiesSuccess(data));
  } catch (error: any) {
    console.error('adminStrategiesSaga updateAdminCommissionSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminStrategiesActions.loadAdminStrategiesFailure({ status: { ok: false }, message }));
  }
}

//certified strategy
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
  yield takeLatest(adminStrategiesActions.deleteAdminStrategy, deleteAdminStrategySaga);
  yield takeLatest(adminStrategiesActions.createQuantroStrategy, createQuantroStrategySaga);
  yield takeLatest(adminStrategiesActions.createQuantroIndicator, createQuantroIndicatorSaga);
  yield takeLatest(adminStrategiesActions.getAdminStrategyDetail, getAllAdminStrategyDetailSaga);
  yield takeLatest(adminStrategiesActions.updateCertifiedStrategy, updateAdminCertifiedStrategySaga);
  yield takeLatest(adminStrategiesActions.updateAdminCommission, updateAdminCommissionSaga);
}

export default function* adminStrategiesSaga() {
  yield all([fork(watchLoadfile)]);
}
