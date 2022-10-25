import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  LoadPostsBody,
  LoadPostsResponse,
  ResponseFailure,
} from "../types";

export type PostStateType = {
  posts: IPostWithPhotoAndCommentAndLikerAndCount[]; // "IPostWithPhotoAndCommentAndLikerAndCount"는 게시글 타입
  loadPostsLoading: boolean;
  loadPostsDone: null | string;
  loadPostsError: null | string;
};

const initialState: PostStateType = {
  // 모든 게시글들의 정보를 저장할 변수
  posts: [],

  // 모든 게시글들 요청 관련 변수
  loadPostsLoading: false,
  loadPostsDone: null,
  loadPostsError: null,
};

/**
 * "createSlice()"는 액션 타입, 액션 크리에이터, 리듀서를 한 번에 만드는 함수입니다.
 * name: 유니크한 액션을 만들 때 사용
 * initialState: 최초 상태
 * reducers: 리듀서들을 정의
 * PayloadAction로 인자의 타입을 정의해주면 자동완성 지원됨
 */
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // 모든 게시글들 패치
    loadPostsRequest(state, action: PayloadAction<LoadPostsBody>) {
      state.loadPostsLoading = true;
      state.loadPostsDone = null;
      state.loadPostsError = null;
    },
    loadPostsSuccess(state, action: PayloadAction<LoadPostsResponse>) {
      state.loadPostsLoading = false;
      state.loadPostsDone = action.payload.data.message;
      // 여기서는 "immer"가 적용되기 때문에 불변성을 지키지 않아도 됨
      // 하지만 아래처럼 불변성 지키는게 코드가 더 간단해보여서 이렇게 작성함
      state.posts = [...state.posts, ...action.payload.data.posts];
      // state.hasMorePosts =
      //   action.payload.data.posts.length === action.payload.data.limit;
    },
    loadPostsFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadPostsLoading = false;
      state.loadPostsError = action.payload.data.message;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const postActions = postSlice.actions;
// RootReducer 생성 시 사용
export default postSlice.reducer;
