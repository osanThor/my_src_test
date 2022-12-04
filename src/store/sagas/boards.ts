import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action
import { boardsActions } from '../reducers';
import type { PayloadAction } from '@reduxjs/toolkit';

// types
import {
  createCommentPayload,
  CreateUserInquiruesPayload,
  deleteCommentPayload,
  getBoardPayload,
  getBoardsPayload,
  getBoardsResult,
  getNoticePayload,
  getNoticeResult,
  GetUserBoardsPayload,
  getUserCommentsResult,
  GetUserInquiriesPayload,
  LoadBoardsPayload,
  LoadBoardsResponse,
  updateBoardPayload,
  updateCommentPayload,
} from '../types';

// api
import type { AxiosResponse } from 'axios';
import {
  apiGetBoard,
  apiGetNoice,
  apiCreateBoard,
  apiGetBoards,
  apiGetUserBoards,
  apiGetUserCollection,
  apiGetUserInquiries,
  apiGetUserLikes,
  apiCreateUserInquiries,
  apiUpdateBoard,
  apiDeleteBoard,
  apiCreateComment,
  apiGetUserComments,
  apiDeleteComment,
  apiUpdateComment,
} from '../api';

// get boards
function* getBoardsSaga(action: PayloadAction<getBoardsPayload>) {
  yield put(boardsActions.loadBoardsRequest());
  try {
    const { data }: AxiosResponse<getBoardsResult> = yield call(apiGetBoards, action.payload);
    console.log(data);

    yield put(boardsActions.getBoardsResult(data));
  } catch (error: any) {
    console.error('boardsSaga getBoardsSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}

// get notice
function* getNoticesSaga(action: PayloadAction<getNoticePayload>) {
  yield put(boardsActions.loadBoardsRequest());
  try {
    const { data }: AxiosResponse<getNoticeResult> = yield call(apiGetNoice, action.payload);
    console.log(data);

    yield put(boardsActions.getNoticesResult(data));
  } catch (error: any) {
    console.error('boardsSaga getNoticesSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
//get user boards
function* getUserBoardsSaga(action: PayloadAction<GetUserBoardsPayload>) {
  try {
    yield put(boardsActions.loadBoardsRequest());
    const { data } = yield call(apiGetUserBoards, action.payload);
    console.log(data);
    yield put(boardsActions.getUserBoardsResult(data));
  } catch (error: any) {
    console.error('boardsSaga getUserBoardsSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
// get user comments
function* getUserCommentsSaga(action: PayloadAction<GetUserBoardsPayload>) {
  yield put(boardsActions.loadBoardsRequest());
  try {
    const { data }: AxiosResponse<getUserCommentsResult> = yield call(apiGetUserComments, action.payload);
    console.log(data);

    yield put(boardsActions.getUserCommentsResult(data));
  } catch (error: any) {
    console.error('boardsSaga getUserLikesSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
// get user likes
function* getUserLikesSaga(action: PayloadAction<GetUserBoardsPayload>) {
  yield put(boardsActions.loadBoardsRequest());
  try {
    const { data }: AxiosResponse<getBoardsResult> = yield call(apiGetUserLikes, action.payload);
    console.log(data);

    yield put(boardsActions.getBoardsResult(data));
  } catch (error: any) {
    console.error('boardsSaga getUserLikesSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
// get user collections
function* getUserCollectionsSaga(action: PayloadAction<GetUserBoardsPayload>) {
  yield put(boardsActions.loadBoardsRequest());
  try {
    const { data }: AxiosResponse<getUserCommentsResult> = yield call(apiGetUserCollection, action.payload);
    console.log(data);

    yield put(boardsActions.getUserCommentsResult(data));
  } catch (error: any) {
    console.error('boardsSaga getUserCollectionsSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
//get user inquiries
function* getUserInquiriesSaga(action: PayloadAction<GetUserInquiriesPayload>) {
  try {
    yield put(boardsActions.loadBoardsRequest());
    const { data } = yield call(apiGetUserInquiries, action.payload);
    console.log(data);
    yield put(boardsActions.getUserInquiriesResult(data));
  } catch (error: any) {
    console.error('boardsSaga getUserInquiriesSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
// create board
function* createBoardsSaga(action: PayloadAction<LoadBoardsPayload>) {
  yield put(boardsActions.loadBoardsRequest());
  try {
    const { data }: AxiosResponse<LoadBoardsResponse> = yield call(apiCreateBoard, action.payload);
    console.log(data);

    yield put(boardsActions.loadBoardsSuccess(data));
  } catch (error: any) {
    console.error('boardsSaga createBoardsSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
// create user inpuiry
function* createInquiry(action: PayloadAction<CreateUserInquiruesPayload>) {
  try {
    yield put(boardsActions.loadBoardsRequest());
    const { data } = yield call(apiCreateUserInquiries, action.payload);
    console.log(data);
    yield put(boardsActions.loadBoardsSuccess(data));
  } catch (error: any) {
    console.error('userSaga createInquiry >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
// get board
function* getBoardSaga(action: PayloadAction<getBoardPayload>) {
  yield put(boardsActions.loadBoardsRequest());
  try {
    const { data } = yield call(apiGetBoard, action.payload);
    console.log(data);

    yield put(boardsActions.getBoardResult(data));
  } catch (error: any) {
    console.error('boardsSaga getBoardSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
// update board
function* updateBoardSaga(action: PayloadAction<updateBoardPayload>) {
  yield put(boardsActions.loadBoardsRequest());
  try {
    const { data } = yield call(apiUpdateBoard, action.payload);
    console.log(data);

    yield put(boardsActions.loadBoardsSuccess(data));
  } catch (error: any) {
    console.error('boardsSaga updateBoardSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
// delete board
function* deleteBoardSaga(action: PayloadAction<getBoardPayload>) {
  yield put(boardsActions.loadBoardsRequest());
  try {
    const { data } = yield call(apiDeleteBoard, action.payload);
    console.log(data);

    yield put(boardsActions.loadBoardsSuccess(data));
  } catch (error: any) {
    console.error('boardsSaga updateBoardSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
// create comment
function* createCommentSaga(action: PayloadAction<createCommentPayload>) {
  yield put(boardsActions.loadBoardsRequest());
  try {
    const { data } = yield call(apiCreateComment, action.payload);
    console.log(data);

    yield put(boardsActions.loadBoardsSuccess(data));
  } catch (error: any) {
    console.error('boardsSaga createCommentSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
// update comment
function* updateCommentSaga(action: PayloadAction<updateCommentPayload>) {
  yield put(boardsActions.loadBoardsRequest());
  try {
    const { data } = yield call(apiUpdateComment, action.payload);
    console.log(data);

    yield put(boardsActions.loadBoardsSuccess(data));
  } catch (error: any) {
    console.error('boardsSaga createCommentSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}
// delete comment
function* deleteCommentSaga(action: PayloadAction<deleteCommentPayload>) {
  yield put(boardsActions.loadBoardsRequest());
  try {
    const { data } = yield call(apiDeleteComment, action.payload);
    console.log(data);

    yield put(boardsActions.loadBoardsSuccess(data));
  } catch (error: any) {
    console.error('boardsSaga createCommentSaga >> ', error);

    const message =
      error?.name === 'AxiosError' ? error.response.data.message : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(boardsActions.loadBoardsFailure({ status: { ok: false }, message }));
  }
}

function* watchLoadfile() {
  yield takeLatest(boardsActions.createBoards, createBoardsSaga);
  yield takeLatest(boardsActions.getUserBoards, getUserBoardsSaga);
  yield takeLatest(boardsActions.getUserComments, getUserCommentsSaga);
  yield takeLatest(boardsActions.getUserLikes, getUserLikesSaga);
  yield takeLatest(boardsActions.getUserCollections, getUserCollectionsSaga);
  yield takeLatest(boardsActions.getUserInquiries, getUserInquiriesSaga);
  yield takeLatest(boardsActions.createInquiries, createInquiry);
  yield takeLatest(boardsActions.getBoards, getBoardsSaga);
  yield takeLatest(boardsActions.getNotices, getNoticesSaga);
  yield takeLatest(boardsActions.getBoard, getBoardSaga);
  yield takeLatest(boardsActions.updateBoard, updateBoardSaga);
  yield takeLatest(boardsActions.deleteBoard, deleteBoardSaga);
  yield takeLatest(boardsActions.createComment, createCommentSaga);
  yield takeLatest(boardsActions.updateComment, updateCommentSaga);
  yield takeLatest(boardsActions.deleteComment, deleteCommentSaga);
}

export default function* boardsSaga() {
  yield all([fork(watchLoadfile)]);
}
