import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action
import { authActions, userActions } from '../reducers';

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoadAuthResponse, LoadAuthBody } from '../types';

// api
import { apiVerifyCode, apiVerifyEmial, userLogin } from '../api';

// 로그인
function* loginSaga(action: PayloadAction<LoadAuthBody>) {
  console.log('시작');
  yield put(authActions.loadAuthRequest());
  try {
    const { data }: AxiosResponse<LoadAuthResponse> = yield call(userLogin, action.payload);
    console.log(data);

    if (data.message === 'LOGGED_IN') {
      yield put(userActions.userSuccess());
    } else {
      yield put(userActions.userFailure());
    }
    yield put(authActions.loadAuthSuccess(data));
  } catch (error: any) {
    console.error('authSaga login >> ', error);

    const message = error?.name === 'AxiosError' ? error.response : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(authActions.loadAuthFailure({ status: { ok: false }, data: { message } }));
  }
  console.log('끝');
}

// Email 인증 보내기
function* sendVerifyEmailSaga(action: PayloadAction<LoadAuthBody>) {
  yield put(authActions.loadAuthRequest());
  try {
    const { data }: AxiosResponse<LoadAuthResponse> = yield call(apiVerifyEmial, action.payload);

    yield put(authActions.loadAuthSuccess(data));
  } catch (error: any) {
    console.error('authSaga sendVerifyEmail >> ', error);

    const message = error?.name === 'AxiosError' ? error.response : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(authActions.loadAuthFailure({ status: { ok: false }, data: { message } }));
  }
}

// 인증코드 검사
function* checkVerifySaga(action: PayloadAction<LoadAuthBody>) {
  yield put(authActions.loadAuthRequest());
  try {
    const { data }: AxiosResponse<LoadAuthResponse> = yield call(apiVerifyCode, action.payload);

    yield put(authActions.loadAuthSuccess(data));
  } catch (error: any) {
    console.error('authSaga checkVerifycode >> ', error);

    const message = error?.name === 'AxiosError' ? error.response : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(authActions.loadAuthFailure({ status: { ok: false }, data: { message } }));
  }
}

function* watchLoadAuth() {
  yield takeLatest(authActions.userLogin, loginSaga);
  yield takeLatest(authActions.sendVerifyEmail, sendVerifyEmailSaga);
  yield takeLatest(authActions.checkVerifyCode, checkVerifySaga);
}

export default function* authSaga() {
  yield all([fork(watchLoadAuth)]);
}
