import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action
import { boardsActions, indexActions } from '../reducers';
import type { PayloadAction } from '@reduxjs/toolkit';

// types
import { getBoardsPayload, getBoardsResult } from '../types';

// api
import type { AxiosResponse } from 'axios';
import { apiGetBoards } from '../api';

// get boards
function* getIndexBoardsSaga(action: PayloadAction<getBoardsPayload>) {
  yield put(boardsActions.loadBoardsRequest());
  try {
    if (action.payload.category === 'CERTIFIED_STRATEGY') {
      const { data }: AxiosResponse<getBoardsResult> = yield call(apiGetBoards, action.payload);
      console.log(1, data);
      yield put(indexActions.getCertifiedResult(data));
      yield put(indexActions.certifiedDone());
      return;
    }
    if (action.payload.category === 'USER_STRATEGY') {
      const { data }: AxiosResponse<getBoardsResult> = yield call(apiGetBoards, action.payload);
      console.log(2, data);
      yield put(indexActions.getUserStrategyResult(data));
      yield put(indexActions.UserStrategyDone());
      return;
    }
    if (action.payload.category === 'DISCUSSION') {
      const { data }: AxiosResponse<getBoardsResult> = yield call(apiGetBoards, action.payload);
      console.log(3, data);
      yield put(indexActions.getDiscussionResult(data));
      yield put(indexActions.DiscussionDone());
      return;
    }
    if (action.payload.category === 'QUANTRO_STRATEGY') {
      const { data }: AxiosResponse<getBoardsResult> = yield call(apiGetBoards, action.payload);
      console.log(4, data);
      yield put(indexActions.getQuantroStrategyResult(data));
      yield put(indexActions.QuantroStrategyDone());
      return;
    }
  } catch (error: any) {
    console.error('boardsSaga getBoardsSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(indexActions.getIndexBoards, getIndexBoardsSaga);
}

export default function* indexSaga() {
  yield all([fork(watchLoadfile)]);
}
