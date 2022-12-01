import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action
import { authActions, userActions } from '../reducers';

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  LoadUserResponse,
  LoadUserBody,
  ChangePwPayload,
  UpdateUserProfilePayload,
  DeleteUserPayload,
} from '../types';

// api
import {
  apiCheckNickname,
  apiChangeTheme,
  apiRegister,
  apiTelegramUsername,
  apiGetUserProfile,
  apiGoogleRegister,
  apiChangePw,
  apiUpdateUserProfile,
  apiDeleteUser,
} from '../api';

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
    yield put(userActions.loadUserFailure({ status: { ok: false }, message }));
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
    yield put(userActions.loadUserFailure({ status: { ok: false }, message }));
  }
}
// email 회원가입
function* userRegisterSaga(action: PayloadAction<LoadUserBody>) {
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
    yield put(userActions.loadUserFailure({ status: { ok: false }, message }));
    yield put(authActions.AuthFailure());
  }
}
// google 회원가입
function* userGoogleRegisterSaga(action: PayloadAction<LoadUserBody>) {
  yield put(userActions.loadUserRequest());
  try {
    const { data } = yield call(apiGoogleRegister, action.payload);
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
    yield put(userActions.loadUserFailure({ status: { ok: false }, message }));
    yield put(authActions.AuthFailure());
  }
}
// 텔레그램 사용자명
function* telegramUsernameSaga(action: PayloadAction<LoadUserBody>) {
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
    yield put(userActions.loadUserFailure({ status: { ok: false }, message }));
  }
}
// get user profile
function* getUserProfileSaga() {
  try {
    yield put(userActions.loadUserRequest());
    const { data } = yield call(apiGetUserProfile);
    console.log(data);
    yield put(userActions.getUserProfileResult(data));
  } catch (error: any) {
    console.error('userSaga getUserProfileSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(userActions.loadUserFailure({ status: { ok: false }, message }));
  }
}
// update user profile
function* updateUserProfileSaga(action: PayloadAction<UpdateUserProfilePayload>) {
  try {
    yield put(userActions.loadUserRequest());
    const { data } = yield call(apiUpdateUserProfile, action.payload);
    console.log(data);
    yield put(userActions.loadUserSuccess(data));
  } catch (error: any) {
    console.error('userSaga updateUserProfileSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(userActions.loadUserFailure({ status: { ok: false }, message }));
  }
}
// change user pw
function* changeUserPwSaga(action: PayloadAction<ChangePwPayload>) {
  try {
    yield put(userActions.loadUserRequest());
    const { data } = yield call(apiChangePw, action.payload);
    console.log(data);
    yield put(userActions.loadUserSuccess(data));
  } catch (error: any) {
    console.error('userSaga changeUserPw >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(userActions.loadUserFailure({ status: { ok: false }, message }));
  }
}
// delete user
function* deleteUserSaga(action: PayloadAction<DeleteUserPayload>) {
  try {
    yield put(userActions.loadUserRequest());
    const { data } = yield call(apiDeleteUser, action.payload);
    console.log(data);
    yield put(userActions.loadUserSuccess(data));
  } catch (error: any) {
    console.error('userSaga deleteUserSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(userActions.loadUserFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadUser() {
  yield takeLatest(userActions.changeTheme, changeThemeSaga);
  yield takeLatest(userActions.checkNickName, checkNickNameSaga);
  yield takeLatest(userActions.userRegister, userRegisterSaga);
  yield takeLatest(userActions.userGoogleRegister, userGoogleRegisterSaga);
  yield takeLatest(userActions.telegramUsername, telegramUsernameSaga);
  yield takeLatest(userActions.getUserProfile, getUserProfileSaga);
  yield takeLatest(userActions.updateUserProfile, updateUserProfileSaga);
  yield takeLatest(userActions.ChangePw, changeUserPwSaga);
  yield takeLatest(userActions.deleteUser, deleteUserSaga);
}

export default function* userSaga() {
  yield all([fork(watchLoadUser)]);
}
