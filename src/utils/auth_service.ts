import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { axiosInstance } from '../store/api';
import { authActions, userActions } from '../store/reducers';
import { LoadAuthResponse } from '../store/types';

class AuthService {
  // 사용자 확인
  isUser(dispatch: Dispatch<AnyAction>) {
    try {
      const user = localStorage.getItem('user');
      if (!user) return;

      dispatch(userActions.userSuccess());
    } catch (e) {
      console.log(e);
    }
  }
  // axios 토큰 관리
  jwtToken(loadAuthDone: LoadAuthResponse) {
    if (loadAuthDone.accessToken != undefined || loadAuthDone.accessToken === '') {
      axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + loadAuthDone.accessToken;
    }
  }

  // 토큰 재발급
  intervalRefresh(dispatch: Dispatch<AnyAction>) {
    dispatch(authActions.refreshToken());
  }

  // 로그아웃
  logout(dispatch: Dispatch<AnyAction>) {
    dispatch(authActions.userLogOut());
    dispatch(userActions.userLogOut());
    delete axiosInstance.defaults.headers.common['Authorization'];
    localStorage.removeItem('user');
  }
}

export default AuthService;
