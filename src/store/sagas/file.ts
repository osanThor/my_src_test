import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action
import { fileActions } from '../reducers';

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoadFileBody, LoadFileResponse } from '../types';

// api
import { apiUploadFile } from '../api';

// 테마변경
function* uploadFile(action: PayloadAction<LoadFileBody>) {
  yield put(fileActions.loadFileRequest());
  try {
    const { data }: AxiosResponse<LoadFileResponse> = yield call(apiUploadFile, action.payload);
    console.log(data);

    yield put(fileActions.loadFileSuccess(data));
  } catch (error: any) {
    console.error('fileSaga uploadFile >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(fileActions.loadFileFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(fileActions.uploadProfileImage, uploadFile);
}

export default function* fileSaga() {
  yield all([fork(watchLoadfile)]);
}
