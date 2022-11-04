import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action
import { authActions, userActions } from '../reducers';

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoadUserResponse, LoadUserBody } from '../types';

// api
import { apiCheckNickname, apiChangeTheme, apiRegister, apiTelegramUsername } from '../api';

// 테마변경
function* changeThemeSaga(action: PayloadAction<LoadUserBody>) {
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
  }
}
// 닉네임체크
function* checkNickNameSaga(action: PayloadAction<LoadUserBody>) {
  yield put(userActions.loadUserRequest());
  try {
    const { data } = yield call(apiCheckNickname, action.payload);
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
}
// 회원가입
function* userRegisterSaga(action: PayloadAction<LoadUserBody>) {
  console.log('회원가입 시작');
  yield put(userActions.loadUserRequest());
  try {
    const { data } = yield call(apiRegister, action.payload);
    console.log(data);

    if (data.message === 'CREATED') {
      yield put(authActions.AuthSuccess());
    } else {
      yield put(authActions.AuthFailure());
    }
    yield put(userActions.loadUserSuccess(data));
  } catch (error: any) {
    console.error('userSaga checkNickname >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(userActions.loadUserFailure({ status: { ok: false }, data: { message } }));
    yield put(authActions.AuthFailure());
  }
  console.log('회원가입 끝');
}
// 텔레그램 사용자명
function* telegramUsernameSaga(action: PayloadAction<LoadUserBody>) {
  console.log('시작');
  yield put(userActions.loadUserRequest());
  try {
    const { data } = yield call(apiTelegramUsername, action.payload);
    console.log(data);
    if (data.message === 'CHANGED') {
      console.log('텔레그램 등록 완료');
    } else if (data.message === 'NOT_FOUND_TELEGRAM') {
      console.log('텔레그램 등록 실패');
    }

    yield put(userActions.loadUserSuccess(data));
  } catch (error: any) {
    console.error('userSaga telegramUsername >> ', error);

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
  yield takeLatest(userActions.userRegister, userRegisterSaga);
  yield takeLatest(userActions.telegramUsername, telegramUsernameSaga);
}

export default function* userSaga() {
  yield all([fork(watchLoadUser)]);
}
