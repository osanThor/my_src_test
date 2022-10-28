import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

// action
import { userActions } from '../reducers';

// types
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoadUserResponse, LoadUserBody } from '../types';

// api
import { apiChangeTheme } from '../api';

function* loadUser(action: PayloadAction<LoadUserBody>) {
  try {
    // api 요청 및 응답 대기
    console.log('시작');
    const { data }: AxiosResponse<LoadUserResponse> = yield call(apiChangeTheme, action.payload);

    // 성공한 액션 디스패치
    yield put(userActions.loadUserSuccess(data));
  } catch (error: any) {
    console.error('postSaga loadPosts >> ', error);

    // "AxiosError"라면 예측한 에러라서 백엔드로부터 전송된 메시지로 응답하고 아니라면 알 수 없는 서버 측 에러라는 메시지 응답
    // 팔로우한 유저를 다시 팔로우, 좋아요 누른 게시글에 다시 좋아요 누르는 경우 같은 경우 "409"로 응답하는데 "axios"에서 "2xx"가 아니면 에러로 처리함
    const message =
      error?.name === 'AxiosError'
        ? error.response.data.data.message
        : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    // 실패한 액션 디스패치
    yield put(userActions.loadUserFailure({ status: { ok: false }, data: { message } }));
    console.log('끝');
  }
}
function* watchLoadUser() {
  // "postActions.loadPostsRequest"의 요청이 오면 "loadPosts()" 실행
  yield takeLatest(userActions.loadUserRequest, loadUser);
}

export default function* userSaga() {
  yield all([fork(watchLoadUser)]);
}
