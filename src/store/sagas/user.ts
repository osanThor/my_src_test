import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action
import { userActions } from '../reducers';

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoadUserResponse, LoadUserBody } from '../types';

// api
import { apiChangeTheme } from '../api';
import { checkNickname } from '../api/user';

// 테마변경
function* changeThemeSaga(action: PayloadAction<LoadUserBody>) {
  console.log('시작');
  yield put(userActions.loadUserRequest());
  try {
    const { data }: AxiosResponse<LoadUserResponse> = yield call(apiChangeTheme, action.payload);
    console.log(data);

    yield put(userActions.loadUserSuccess(data));
  } catch (error: any) {
    console.error('userSaga changeTheme >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(userActions.loadUserFailure({ status: { ok: false }, data: { message } }));
    console.log('끝');
  }
}
// 닉네임체크변경
function* checkNickNameSaga(action: PayloadAction<LoadUserBody>) {
  console.log('시작');
  yield put(userActions.loadUserRequest());
  try {
    const { data } = yield call(checkNickname, action.payload);
    console.log(data);

    yield put(userActions.loadCheckNickNameResult(data));
    yield put(userActions.loadUserSuccess(data));
  } catch (error: any) {
    console.error('userSaga checkNickname >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(userActions.loadUserFailure({ status: { ok: false }, data: { message } }));
  }
  console.log('끝');
}

function* watchLoadUser() {
  yield takeLatest(userActions.changeTheme, changeThemeSaga);
  yield takeLatest(userActions.checkNickName, checkNickNameSaga);
}

export default function* userSaga() {
  yield all([fork(watchLoadUser)]);
}
