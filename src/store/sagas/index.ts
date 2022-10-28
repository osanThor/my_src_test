import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';
import userSaga from './user';
import postSaga from './post';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(userSaga), fork(postSaga)]);
}
