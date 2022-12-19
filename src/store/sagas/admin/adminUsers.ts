import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { adminUsersActions } from '../../reducers';
import {
  adminTelegramUsersMessage,
  adminUserDetailPayload,
  getAdminUserDetailResult,
  getAdminUsersPayload,
  getAdminUsersResult,
  LoadAdminUsersResponse,
} from '../../types';
import { apiDeleteAdminUser, apiGetAdminUserDetail, apiGetAdminUsers, apiSendAdminUserMessage } from '../../api';
import { apiChangeAdminUserDefaultPhoto } from '../../api/admin/user';

// api
// get all admin users
function* getAdminUsersSaga(action: PayloadAction<getAdminUsersPayload>) {
  yield put(adminUsersActions.loadAdminUsersRequest());
  try {
    const { data }: AxiosResponse<getAdminUsersResult> = yield call(apiGetAdminUsers, action.payload);
    console.log(data);

    yield put(adminUsersActions.getAdminUsersResult(data));
  } catch (error: any) {
    console.error('adminUsersSaga getAdminUsersSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminUsersActions.loadAdminUsersFailure({ status: { ok: false }, message }));
  }
}

// get admin user detail
function* getAdminUserDetailSaga(action: PayloadAction<adminUserDetailPayload>) {
  yield put(adminUsersActions.loadAdminUsersRequest());
  try {
    const { data }: AxiosResponse<getAdminUserDetailResult> = yield call(apiGetAdminUserDetail, action.payload);
    console.log(data);

    yield put(adminUsersActions.getAdminUserDetailResult(data));
  } catch (error: any) {
    console.error('adminUsersSaga getAdminUserDetailSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminUsersActions.loadAdminUsersFailure({ status: { ok: false }, message }));
  }
}

// user delete
function* adminUserDeleteSaga(action: PayloadAction<adminUserDetailPayload>) {
  yield put(adminUsersActions.loadAdminUsersRequest());
  try {
    const { data }: AxiosResponse<LoadAdminUsersResponse> = yield call(apiDeleteAdminUser, action.payload);
    console.log(data);

    yield put(adminUsersActions.loadAdminUsersSuccess(data));
  } catch (error: any) {
    console.error('adminUsersSaga adminUserDeleteSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminUsersActions.loadAdminUsersFailure({ status: { ok: false }, message }));
  }
}
// chagne user default iamge
function* adminChangeUserDefaultImageSaga(action: PayloadAction<adminUserDetailPayload>) {
  yield put(adminUsersActions.loadAdminUsersRequest());
  try {
    const { data }: AxiosResponse<LoadAdminUsersResponse> = yield call(apiChangeAdminUserDefaultPhoto, action.payload);
    console.log(data);

    yield put(adminUsersActions.loadAdminUsersSuccess(data));
  } catch (error: any) {
    console.error('adminUsersSaga adminChangeUserDefaultImageSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminUsersActions.loadAdminUsersFailure({ status: { ok: false }, message }));
  }
}

// send telegram message
function* sendAdminTelegramMessageSaga(action: PayloadAction<adminTelegramUsersMessage>) {
  yield put(adminUsersActions.loadAdminUsersRequest());
  try {
    const { data }: AxiosResponse<LoadAdminUsersResponse> = yield call(apiSendAdminUserMessage, action.payload);
    console.log(data);

    yield put(adminUsersActions.loadAdminUsersSuccess(data));
  } catch (error: any) {
    console.error('adminUsersSaga sendAdminTelegramMessageSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminUsersActions.loadAdminUsersFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(adminUsersActions.getAdminUsers, getAdminUsersSaga);
  yield takeLatest(adminUsersActions.getAdminUserDetail, getAdminUserDetailSaga);
  yield takeLatest(adminUsersActions.adminUserDelete, adminUserDeleteSaga);
  yield takeLatest(adminUsersActions.changeAdminUserDefaultImage, adminChangeUserDefaultImageSaga);
  yield takeLatest(adminUsersActions.sendTelegramMessage, sendAdminTelegramMessageSaga);
}

export default function* adminUsersSaga() {
  yield all([fork(watchLoadfile)]);
}
