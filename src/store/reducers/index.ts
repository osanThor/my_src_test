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
import adminDashboardReducer, { AdminDashboardStateType } from './admin/adminDashboardReducer';

// actions
export { authActions } from './authReducer';
export { userActions } from './userReducer';
export { localActions } from './localReducer';
export { fileActions } from './fileReducer';
export { boardsActions } from './boardsReducer';
export { exchangeActions } from './exchangeReducer';
export { indexActions } from './indexReducer';
// admin actions
export { adminDashboardsActions } from './admin/adminDashboardReducer';

type ReducerState = {
  auth: AuthStateType;
  user: UserStateType;
  local: LocalStateType;
  file: FileStateType;
  boards: BoardsStateType;
  exchange: ExchangeStateType;
  index: IndexStateType;
  //admin
  adminDashBoards: AdminDashboardStateType;
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
        adminDashBoards: adminDashboardReducer,
      })(state, action);
  }
};

export default rootReducer;
