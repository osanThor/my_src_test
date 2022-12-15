import { apiGetAdminAllBoards } from './../../api/admin/boards';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { adminBoardsActions } from '../../reducers';
import { GetAdminAllBoardsPayload, GetAdminAllBoardsResult, LoadAdminBoardsResponse } from '../../types';

// api
// admin get all boards
function* getAdminAllBoardsSaga(action: PayloadAction<GetAdminAllBoardsPayload>) {
  yield put(adminBoardsActions.loadAdminBoardsRequest());
  try {
    const { data }: AxiosResponse<GetAdminAllBoardsResult> = yield call(apiGetAdminAllBoards, action.payload);
    console.log(data);

    yield put(adminBoardsActions.getAdminAllBoardsResult(data));
  } catch (error: any) {
    console.error('adminBoardsSaga getAdminAllBoardsSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBoardsActions.loadAdminBoardsFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(adminBoardsActions.getAdminAllBoards, getAdminAllBoardsSaga);
}

export default function* adminBoardsSaga() {
  yield all([fork(watchLoadfile)]);
}
