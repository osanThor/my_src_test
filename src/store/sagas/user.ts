import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action
import { userActions } from '../reducers';

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoadUserResponse, LoadUserBody } from '../types';

// api
import { apiChangeTheme } from '../api';

function* changeThemeSaga(action: PayloadAction<LoadUserBody>) {
  console.log('시작');
  yield put(userActions.loadUserRequest());
  try {
    const { data }: AxiosResponse<LoadUserResponse> = yield call(apiChangeTheme, action.payload);

    yield put(userActions.loadUserSuccess(data));
  } catch (error: any) {
    console.error('userSaga loadPosts >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(userActions.loadUserFailure({ status: { ok: false }, data: { message } }));
    console.log('끝');
  }
}
function* watchLoadUser() {
  yield takeLatest(userActions.changeTheme, changeThemeSaga);
}

export default function* userSaga() {
  yield all([fork(watchLoadUser)]);
}
