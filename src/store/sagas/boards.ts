import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action
import { boardsActions } from '../reducers';
import type { PayloadAction } from '@reduxjs/toolkit';

// types
import { getBoardsPayload, getBoardsResult, LoadBoardsPayload, LoadBoardsResponse } from '../types';

// api
import type { AxiosResponse } from 'axios';
import { apiCreateBoard, apiGetBoards } from '../api';

// get boards
function* getBoardsSaga(action: PayloadAction<getBoardsPayload>) {
  yield put(boardsActions.loadBoardsRequest());
  try {
    const { data }: AxiosResponse<getBoardsResult> = yield call(apiGetBoards, action.payload);
    console.log(data);

    yield put(boardsActions.getBoardsResult(data));
  } catch (error: any) {
    console.error('boardsSaga getBoardsSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
// create board
function* createBoardsSaga(action: PayloadAction<LoadBoardsPayload>) {
  yield put(boardsActions.loadBoardsRequest());
  try {
    const { data }: AxiosResponse<LoadBoardsResponse> = yield call(apiCreateBoard, action.payload);
    console.log(data);

    yield put(boardsActions.loadBoardsSuccess(data));
  } catch (error: any) {
    console.error('boardsSaga createBoardsSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(boardsActions.createBoards, createBoardsSaga);
  yield takeLatest(boardsActions.getBoards, getBoardsSaga);
}

export default function* boardsSaga() {
  yield all([fork(watchLoadfile)]);
}
