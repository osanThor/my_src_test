import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action
import { exchangeActions, fileActions } from '../reducers';

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';

// api
import { apiClosePosition, apiCreateUpdateKey, apiGetAllExchanges } from '../api';
import { CreateUpdateApiKeyPayload, GetAllExchangeResult, LoadExchangeIdPayload, LoadExchangeResponse } from '../types';

function* getAllExchangesSaga() {
  yield put(exchangeActions.loadBoardsRequest());
  try {
    const { data }: AxiosResponse<GetAllExchangeResult> = yield call(apiGetAllExchanges);
    console.log(data);

    yield put(exchangeActions.getAllExchangeResult(data));
  } catch (error: any) {
    console.error('exchangeSaga getAllExchanges >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(exchangeActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
// create update api key
function* createUpdateKeySaga(action: PayloadAction<CreateUpdateApiKeyPayload>) {
  yield put(exchangeActions.loadBoardsRequest());
  try {
    const { data }: AxiosResponse<LoadExchangeResponse> = yield call(apiCreateUpdateKey, action.payload);
    console.log(data);

    yield put(exchangeActions.loadBoardsSuccess(data));
  } catch (error: any) {
    console.error('exchangeSaga createUpdateKeySaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(exchangeActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
// close position
function* closePositionSaga(action: PayloadAction<LoadExchangeIdPayload>) {
  yield put(exchangeActions.loadBoardsRequest());
  try {
    const { data }: AxiosResponse<LoadExchangeResponse> = yield call(apiClosePosition, action.payload);
    console.log(data);

    yield put(exchangeActions.loadBoardsSuccess(data));
  } catch (error: any) {
    console.error('exchangeSaga closePositionSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(exchangeActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(exchangeActions.getAllExchange, getAllExchangesSaga);
  yield takeLatest(exchangeActions.createApiKey, createUpdateKeySaga);
  yield takeLatest(exchangeActions.closePosition, closePositionSaga);
}

export default function* exchangeSaga() {
  yield all([fork(watchLoadfile)]);
}
