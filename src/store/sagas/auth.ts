import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action
import { authActions } from '../reducers';

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoadAuthResponse, LoadAuthBody } from '../types';

// api
import {
  apiGoogleLogin,
  apiLogout,
  apiRefreshToken,
  apiResetPw,
  apiVerifyCode,
  apiVerifyEmial,
  userLogin,
} from '../api';

// 로그인
function* loginSaga(action: PayloadAction<LoadAuthBody>) {
  yield put(authActions.loadAuthRequest());
  try {
    const { data }: AxiosResponse<LoadAuthResponse> = yield call(userLogin, action.payload);
    console.log(data);

    yield put(authActions.loadAuthSuccess(data));
  } catch (error: any) {
    console.error('authSaga login >> ', error);

    const message = error?.name === 'AxiosError' ? error.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(authActions.loadAuthFailure({ status: { ok: false }, message }));
  }
}

//Google 로그인
function* googleLoginSaga(action: PayloadAction<LoadAuthBody>) {
  yield put(authActions.loadAuthRequest());
  try {
    const { data }: AxiosResponse<LoadAuthResponse> = yield call(apiGoogleLogin, action.payload);
    console.log(data);

    yield put(authActions.loadAuthSuccess(data));
  } catch (error: any) {
    console.error('authSaga googleLogin >> ', error);

    const message = error?.name === 'AxiosError' ? error.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(authActions.loadAuthFailure({ status: { ok: false }, message }));
  }
}

//토큰 재발급
function* refreshSaga() {
  yield put(authActions.loadAuthRequest());
  try {
    const { data }: AxiosResponse<LoadAuthResponse> = yield call(apiRefreshToken);
    console.log(data);

    yield put(authActions.loadAuthSuccess(data));
  } catch (error: any) {
    console.error('authSaga refresh >> ', error);

    const message = error?.name === 'AxiosError' ? error.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(authActions.loadAuthFailure({ status: { ok: false }, message }));
  }
}

// Email 인증 보내기
function* sendVerifyEmailSaga(action: PayloadAction<LoadAuthBody>) {
  yield put(authActions.loadAuthRequest());
  try {
    const { data }: AxiosResponse<LoadAuthResponse> = yield call(apiVerifyEmial, action.payload);

    yield put(authActions.loadAuthSuccess(data));
  } catch (error: any) {
    console.error('authSaga sendVerifyEmail >> ', error);

    const message = error?.name === 'AxiosError' ? error.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(authActions.loadAuthFailure({ status: { ok: false }, message }));
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

    const message = error?.name === 'AxiosError' ? error.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(authActions.loadAuthFailure({ status: { ok: false }, message }));
  }
}

// 로그아웃
function* userLogoutSaga() {
  yield put(authActions.loadAuthRequest());
  try {
    const { data }: AxiosResponse<LoadAuthResponse> = yield call(apiLogout);
    console.log(data);

    yield put(authActions.loadAuthSuccess(data));
  } catch (error: any) {
    console.error('authSaga logout >> ', error);

    const message = error?.name === 'AxiosError' ? error.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(authActions.loadAuthFailure({ status: { ok: false }, message }));
  }
}
// reset pw
function* userResetPwSaga(action: PayloadAction<LoadAuthBody>) {
  yield put(authActions.loadAuthRequest());
  try {
    const { data }: AxiosResponse<LoadAuthResponse> = yield call(apiResetPw, action.payload);

    yield put(authActions.loadAuthSuccess(data));
  } catch (error: any) {
    console.error('authSaga logout >> ', error);

    const message = error?.name === 'AxiosError' ? error.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(authActions.loadAuthFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadAuth() {
  yield takeLatest(authActions.userLogin, loginSaga);
  yield takeLatest(authActions.googleLogin, googleLoginSaga);
  yield takeLatest(authActions.refreshToken, refreshSaga);
  yield takeLatest(authActions.sendVerifyEmail, sendVerifyEmailSaga);
  yield takeLatest(authActions.checkVerifyCode, checkVerifySaga);
  yield takeLatest(authActions.userLogOut, userLogoutSaga);
  yield takeLatest(authActions.userResetPw, userResetPwSaga);
}

export default function* authSaga() {
  yield all([fork(watchLoadAuth)]);
}
