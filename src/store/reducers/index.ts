import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "@reduxjs/toolkit";
import type { AnyAction, CombinedState } from "@reduxjs/toolkit";

// reducers ( 나머지 리듀서도 있다고 가정 )
import postReducer, { PostStateType } from "./postReducer";
import testReducer, { TestStateType } from "./testReducer";

// actions ( 하나의 파일에서 import 해주기 위해서 export ~ from 사용 )
export { postActions } from "./postReducer";
export { testActions } from "./testReducer";

type ReducerState = {
  post: PostStateType;
  test: TestStateType;
};

// 원래 "rootReducer"로 합쳐줄 필요 없이 "configureStore()"에서 합칠 수 있지만 "HYDRATE"를 위해서 사용
const rootReducer = (
  state: any,
  action: AnyAction
): CombinedState<ReducerState> => {
  switch (action.type) {
    // SSR을 위해서 사용 ( "next.js"의 "getServerSideProps()" )
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return combineReducers({
        post: postReducer,
        test: testReducer,
      })(state, action);
  }
};

export default rootReducer;
