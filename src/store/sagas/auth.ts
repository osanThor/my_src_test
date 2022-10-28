import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action
import { authActions } from '../reducers';

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoadAuthResponse, LoadAuthBody } from '../types';

// api
import { userLogin } from '../api';

function* loginSaga(action: PayloadAction<LoadAuthBody>) {
  console.log('시작');
  yield put(authActions.loadAuthRequest());
  try {
    const { data }: AxiosResponse<LoadAuthResponse> = yield call(userLogin, action.payload);
    console.log(data);

    yield put(authActions.loadAuthSuccess(data));
  } catch (error: any) {
    console.error('authSaga loadPosts >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(authActions.loadAuthFailure({ status: { ok: false }, data: { message } }));
  }
  console.log('끝');
}
function* watchLoadAuth() {
  yield takeLatest(authActions.userLogin, loginSaga);
}

export default function* authSaga() {
  yield all([fork(watchLoadAuth)]);
}
