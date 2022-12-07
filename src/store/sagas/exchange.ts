import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action
import { exchangeActions, fileActions } from '../reducers';

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';

// api
import { apiGetAllExchanges } from '../api';
import { GetAllExchangeResult } from '../types';

function* getAllExchanges() {
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

function* watchLoadfile() {
  yield takeLatest(exchangeActions.getAllExchange, getAllExchanges);
}

export default function* fileSaga() {
  yield all([fork(watchLoadfile)]);
}
