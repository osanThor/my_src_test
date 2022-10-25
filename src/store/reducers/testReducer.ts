import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { LoadTestBody, LoadTestResponse, ResponseFailure } from "../types";

export type TestStateType = {
  test: boolean;
};

const initialState: TestStateType = {
  // 모든 게시글들 요청 관련 변수
  test: false,
};

/**
 * "createSlice()"는 액션 타입, 액션 크리에이터, 리듀서를 한 번에 만드는 함수입니다.
 * name: 유니크한 액션을 만들 때 사용
 * initialState: 최초 상태
 * reducers: 리듀서들을 정의
 * PayloadAction로 인자의 타입을 정의해주면 자동완성 지원됨
 */
const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    // 모든 게시글들 패치
    loadTestRequest(state, action: PayloadAction<LoadTestBody>) {
      state.test = true;
    },
    loadTestSuccess(state, action: PayloadAction<LoadTestResponse>) {
      state.test = false;
    },
    loadTestFailure(state, action: PayloadAction<ResponseFailure>) {
      state.test = false;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const testActions = testSlice.actions;
// RootReducer 생성 시 사용
export default testSlice.reducer;
