import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';
import userSaga from './user';
import fileSaga from './file';
import boardsSaga from './boards';
import exchangeSaga from './exchange';
import indexSaga from './indexSaga';
import adminAuthSaga from './admin/adminAuth';
import adminDashboardsSaga from './admin/adminDashboards';
import adminUsersSaga from './admin/adminUsers';
import adminBannersSaga from './admin/adminBanners';
import adminStrategiesSaga from './admin/adminStrategies';
import adminBoardsSaga from './admin/adminBoards';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(fileSaga),
    fork(boardsSaga),
    fork(exchangeSaga),
    fork(indexSaga),
    fork(adminAuthSaga),
    fork(adminDashboardsSaga),
    fork(adminUsersSaga),
    fork(adminBannersSaga),
    fork(adminStrategiesSaga),
    fork(adminBoardsSaga),
  ]);
}
