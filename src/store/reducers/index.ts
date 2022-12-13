import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from '@reduxjs/toolkit';
import type { AnyAction, CombinedState } from '@reduxjs/toolkit';

// reducers
import authReducer, { AuthStateType } from './authReducer';
import userReducer, { UserStateType } from './userReducer';
import localReducer, { LocalStateType } from './localReducer';
import fileReducer, { FileStateType } from './fileReducer';
import boardsReducer, { BoardsStateType } from './boardsReducer';
import indexReducer, { IndexStateType } from './indexReducer';
import exchangeReducer, { ExchangeStateType } from './exchangeReducer';
//admin reducers
import adminAuthReducer, { AdminAuthStateType } from './admin/adminAuthReducer';
import adminDashboardReducer, { AdminDashboardStateType } from './admin/adminDashboardReducer';
import adminUsersReducer, { AdminUsersStateType } from './admin/adminUsersReducer';
import adminBannersReducer, { AdminBannersStateType } from './admin/adminBannersReducer';

// actions
export { authActions } from './authReducer';
export { userActions } from './userReducer';
export { localActions } from './localReducer';
export { fileActions } from './fileReducer';
export { boardsActions } from './boardsReducer';
export { exchangeActions } from './exchangeReducer';
export { indexActions } from './indexReducer';
// admin actions
export { adminAuthActions } from './admin/adminAuthReducer';
export { adminDashboardsActions } from './admin/adminDashboardReducer';
export { adminUsersActions } from './admin/adminUsersReducer';
export { adminBannersActions } from './admin/adminBannersReducer';

type ReducerState = {
  auth: AuthStateType;
  user: UserStateType;
  local: LocalStateType;
  file: FileStateType;
  boards: BoardsStateType;
  exchange: ExchangeStateType;
  index: IndexStateType;
  //admin
  adminAuth: AdminAuthStateType;
  adminDashBoards: AdminDashboardStateType;
  adminUsers: AdminUsersStateType;
  adminBanners: AdminBannersStateType;
};

// 원래 "rootReducer"로 합쳐줄 필요 없이 "configureStore()"에서 합칠 수 있지만 "HYDRATE"를 위해서 사용
const rootReducer = (state: any, action: AnyAction): CombinedState<ReducerState> => {
  switch (action.type) {
    // SSR을 위해서 사용 ( "next.js"의 "getServerSideProps()" )
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return combineReducers({
        auth: authReducer,
        user: userReducer,
        local: localReducer,
        file: fileReducer,
        boards: boardsReducer,
        exchange: exchangeReducer,
        index: indexReducer,
        //admin
        adminAuth: adminAuthReducer,
        adminDashBoards: adminDashboardReducer,
        adminUsers: adminUsersReducer,
        adminBanners: adminBannersReducer,
      })(state, action);
  }
};

export default rootReducer;
