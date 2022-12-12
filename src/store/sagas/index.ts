import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';
import userSaga from './user';
import fileSaga from './file';
import boardsSaga from './boards';
import exchangeSaga from './exchange';
import indexSaga from './indexSaga';
import adminDashboardsSaga from './admin/adminDashboards';
import adminUsersSaga from './admin/adminUsers';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(fileSaga),
    fork(boardsSaga),
    fork(exchangeSaga),
    fork(indexSaga),
    fork(adminDashboardsSaga),
    fork(adminUsersSaga),
  ]);
}
