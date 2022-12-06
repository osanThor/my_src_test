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
    let auth = localStorage.getItem('Authorization');
    let timeoutId: NodeJS.Timeout;

    if (user) {
      dispatch(authActions.refreshToken());
      timeoutId = setTimeout(() => {
        if (!auth) return;
        if (loadAuthDone.message === 'ACCESS_DENIED') {
          delete axiosInstance.defaults.headers.common['Authorization'];
          localStorage.clear();
          console.log('토큰 만료');
          this.router.push('/auth/login');
          clearTimeout(timeoutId);
          return;
        }
        console.log('refresh!');
        dispatch(authActions.refreshToken());
      }, loadAuthDone.expiryTime - 30000);
    } else {
      clearTimeout(timeoutId);
      if (loadAuthDone.message === 'ACCESS_DENIED') {
        delete axiosInstance.defaults.headers.common['Authorization'];
        localStorage.clear();
        console.log('토큰 만료');
        this.router.push('/auth/login');
        return;
      }
      console.log('Not User');
      return;
    }
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
