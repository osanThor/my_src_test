import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';
import userSaga from './user';
import fileSaga from './file';
import boardsSaga from './boards';
import indexSaga from './indexSaga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(userSaga), fork(fileSaga), fork(boardsSaga), fork(indexSaga)]);
}
