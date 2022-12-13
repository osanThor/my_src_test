import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { adminAuthActions } from '../../reducers';
import { adminLoginPayload, LoadAdminAuthResponse } from '../../types';
import { apiAdminLogin, apiAdminLogout, apiAdminRefresh } from '../../api';

// api
// admin login
function* adminLoginSaga(action: PayloadAction<adminLoginPayload>) {
  yield put(adminAuthActions.loadAdminAuthRequest());
  try {
    const { data }: AxiosResponse<LoadAdminAuthResponse> = yield call(apiAdminLogin, action.payload);
    console.log(data);

    yield put(adminAuthActions.loadAdminAuthSuccess(data));
  } catch (error: any) {
    console.error('adminAuthSaga adminLoginSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminAuthActions.loadAdminAuthFailure({ status: { ok: false }, message }));
  }
}
// admin logout
function* adminLogoutSaga() {
  yield put(adminAuthActions.loadAdminAuthRequest());
  try {
    const { data }: AxiosResponse<LoadAdminAuthResponse> = yield call(apiAdminLogout);
    console.log(data);

    yield put(adminAuthActions.loadAdminAuthSuccess(data));
  } catch (error: any) {
    console.error('adminAuthSaga adminLogoutSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminAuthActions.loadAdminAuthFailure({ status: { ok: false }, message }));
  }
}
// admin refresh
function* adminRefreshSaga() {
  yield put(adminAuthActions.loadAdminAuthRequest());
  try {
    const { data }: AxiosResponse<LoadAdminAuthResponse> = yield call(apiAdminRefresh);
    console.log(data);

    yield put(adminAuthActions.loadAdminAuthSuccess(data));
  } catch (error: any) {
    console.error('adminAuthSaga adminRefreshSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminAuthActions.loadAdminAuthFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(adminAuthActions.adminLogin, adminLoginSaga);
  yield takeLatest(adminAuthActions.adminLogout, adminLogoutSaga);
  yield takeLatest(adminAuthActions.adminRefresh, adminRefreshSaga);
}

export default function* adminAuthSaga() {
  yield all([fork(watchLoadfile)]);
}
