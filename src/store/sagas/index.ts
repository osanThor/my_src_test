import { all, fork } from "redux-saga/effects";

// 나머지 사가도 있다고 가정
import postSaga from "./post";

export default function* rootSaga() {
  yield all([fork(postSaga)]);
}
