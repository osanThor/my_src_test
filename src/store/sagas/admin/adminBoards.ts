import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { adminBoardsActions } from '../../reducers';
import {
  createAdminNoticePayload,
  deleteAdminBoardCommentPayload,
  GetAdminAllBoardsPayload,
  GetAdminAllBoardsResult,
  GetAdminBoardDetailPayload,
  LoadAdminBoardsResponse,
  updateAdminNoticePayload,
} from '../../types';

// api
import {
  apiGetAdminAllBoards,
  apiGetAdminBoardComments,
  apiDeleteAdminBoardDetail,
  apiDeleteAdminBoardComments,
  apiCreateAdminNotice,
  apiUpdateAdminNotice,
  apiGetAdminDiscussionDetail,
  apiGetAdminNoticeDetail,
} from './../../api';
// admin get all boards
function* getAdminAllBoardsSaga(action: PayloadAction<GetAdminAllBoardsPayload>) {
  yield put(adminBoardsActions.loadAdminBoardsRequest());
  try {
    const { data }: AxiosResponse<GetAdminAllBoardsResult> = yield call(apiGetAdminAllBoards, action.payload);
    console.log(data);

    yield put(adminBoardsActions.getAdminAllBoardsResult(data));
  } catch (error: any) {
    console.error('adminBoardsSaga getAdminAllBoardsSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBoardsActions.loadAdminBoardsFailure({ status: { ok: false }, message }));
  }
}
// admin get board detail and comments
function* getAdminDiscussionSaga(action: PayloadAction<GetAdminBoardDetailPayload>) {
  yield put(adminBoardsActions.loadAdminBoardsRequest());
  try {
    const { data }: AxiosResponse<any> = yield call(apiGetAdminDiscussionDetail, action.payload);
    console.log(data);

    yield put(adminBoardsActions.getAdminDiscussionDetailResult(data));
  } catch (error: any) {
    console.error('adminBoardsSaga getAdminDiscussionSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBoardsActions.loadAdminBoardsFailure({ status: { ok: false }, message }));
  }
}
function* getAdminNoticeSaga(action: PayloadAction<GetAdminBoardDetailPayload>) {
  yield put(adminBoardsActions.loadAdminBoardsRequest());
  try {
    const { data }: AxiosResponse<any> = yield call(apiGetAdminNoticeDetail, action.payload);
    console.log(data);

    yield put(adminBoardsActions.getAdminNoticeDetailResult(data));
  } catch (error: any) {
    console.error('adminBoardsSaga getAdminNoticeSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBoardsActions.loadAdminBoardsFailure({ status: { ok: false }, message }));
  }
}
function* getAdminBoardCommentsSaga(action: PayloadAction<GetAdminBoardDetailPayload>) {
  yield put(adminBoardsActions.loadAdminBoardsRequest());
  try {
    const { data }: AxiosResponse<any> = yield call(apiGetAdminBoardComments, action.payload);
    console.log(data);

    yield put(adminBoardsActions.getAdminBoardCommentsResult(data));
  } catch (error: any) {
    console.error('adminBoardsSaga getAdminBoardCommentsSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBoardsActions.loadAdminBoardsFailure({ status: { ok: false }, message }));
  }
}
//delete board
function* deleteAdminBoardSaga(action: PayloadAction<GetAdminBoardDetailPayload>) {
  yield put(adminBoardsActions.loadAdminBoardsRequest());
  try {
    const { data }: AxiosResponse<LoadAdminBoardsResponse> = yield call(apiDeleteAdminBoardDetail, action.payload);
    console.log(data);

    yield put(adminBoardsActions.loadAdminBoardsSuccess(data));
  } catch (error: any) {
    console.error('adminBoardsSaga deleteAdminBoardSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBoardsActions.loadAdminBoardsFailure({ status: { ok: false }, message }));
  }
}
//delete Comment
function* deleteAdminCommentSaga(action: PayloadAction<deleteAdminBoardCommentPayload>) {
  yield put(adminBoardsActions.loadAdminBoardsRequest());
  try {
    const { data }: AxiosResponse<LoadAdminBoardsResponse> = yield call(apiDeleteAdminBoardComments, action.payload);
    console.log(data);

    yield put(adminBoardsActions.loadAdminBoardsSuccess(data));
  } catch (error: any) {
    console.error('adminBoardsSaga deleteAdminCommentSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBoardsActions.loadAdminBoardsFailure({ status: { ok: false }, message }));
  }
}
//create Notice
function* createAdminNoticeSaga(action: PayloadAction<createAdminNoticePayload>) {
  yield put(adminBoardsActions.loadAdminBoardsRequest());
  try {
    const { data }: AxiosResponse<LoadAdminBoardsResponse> = yield call(apiCreateAdminNotice, action.payload);
    console.log(data);

    yield put(adminBoardsActions.loadAdminBoardsSuccess(data));
  } catch (error: any) {
    console.error('adminBoardsSaga createAdminNoticeSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBoardsActions.loadAdminBoardsFailure({ status: { ok: false }, message }));
  }
}
//update Notice
function* updateAdminNoticeSaga(action: PayloadAction<updateAdminNoticePayload>) {
  yield put(adminBoardsActions.loadAdminBoardsRequest());
  try {
    const { data }: AxiosResponse<LoadAdminBoardsResponse> = yield call(apiUpdateAdminNotice, action.payload);
    console.log(data);

    yield put(adminBoardsActions.loadAdminBoardsSuccess(data));
  } catch (error: any) {
    console.error('adminBoardsSaga updateAdminNoticeSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(adminBoardsActions.loadAdminBoardsFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(adminBoardsActions.getAdminAllBoards, getAdminAllBoardsSaga);
  yield takeLatest(adminBoardsActions.getAdminDiscussionDetail, getAdminDiscussionSaga);
  yield takeLatest(adminBoardsActions.getAdminNoticeDetail, getAdminNoticeSaga);
  yield takeLatest(adminBoardsActions.getAdminBoardComments, getAdminBoardCommentsSaga);
  yield takeLatest(adminBoardsActions.deleteAdminBoard, deleteAdminBoardSaga);
  yield takeLatest(adminBoardsActions.deleteAdminComment, deleteAdminCommentSaga);
  yield takeLatest(adminBoardsActions.createAdminNotice, createAdminNoticeSaga);
  yield takeLatest(adminBoardsActions.updateAdminNotice, updateAdminNoticeSaga);
}

export default function* adminBoardsSaga() {
  yield all([fork(watchLoadfile)]);
}
