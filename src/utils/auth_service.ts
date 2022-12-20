import { useRouter } from 'next/router';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { axiosInstance } from '../store/api';
import { authActions, userActions } from '../store/reducers';
import { LoadAuthResponse } from '../store/types';

class AuthService {
  router = useRouter();
  // email login
  userLogin(loadAuthDone: LoadAuthResponse) {
    localStorage.setItem('user', 'true');
    localStorage.setItem('Authorization', loadAuthDone.accessToken);
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + loadAuthDone.accessToken;
  }

  //refresh token
  userRefreshToken(dispatch: Dispatch<AnyAction>, loadAuthDone: LoadAuthResponse) {
    const user = localStorage.getItem('user');
    const admin = localStorage.getItem('admin');
    let auth = localStorage.getItem('Authorization');
    let timeoutId: NodeJS.Timeout;

    if (user) {
      dispatch(authActions.refreshToken());
      timeoutId = setTimeout(() => {
        if (!auth) return;
        console.log('refresh!');
        dispatch(authActions.refreshToken());
      }, loadAuthDone.expiryTime - 120000);
    } else {
      if (loadAuthDone.message === 'CAN_CREATE') {
        return;
      }
      if (admin) {
        return;
      }
      clearTimeout(timeoutId);
      delete axiosInstance.defaults.headers.common['Authorization'];
      dispatch(userActions.initializeUserForm());
      dispatch(authActions.initializeAuthForm());
      localStorage.clear();
      console.log('Not User');
      return;
    }
    clearTimeout(timeoutId);
  }

  userLogOut(dispatch: Dispatch<AnyAction>) {
    dispatch(authActions.userLogOut());
    localStorage.clear();
    delete axiosInstance.defaults.headers.common['Authorization'];
    dispatch(authActions.initializeAuthForm());
    dispatch(userActions.initializeUserForm());
  }
}

export default AuthService;
