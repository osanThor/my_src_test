import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { axiosInstance } from '../store/api';
import { authActions, userActions } from '../store/reducers';
import { LoadAuthResponse } from '../store/types';

class AuthService {
  // 자동 로그인
  autoLogin(dispatch: Dispatch<AnyAction>) {
    try {
      const email = localStorage.getItem('userId');
      const pw = localStorage.getItem('userPw');
      if (!email && !pw) {
        delete axiosInstance.defaults.headers.common['Authorization'];
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('userPw');
        localStorage.removeItem('AuthStatus');
        localStorage.removeItem('Authorization');
        deleteAllCookies();
        return;
      }
      dispatch(authActions.userLogin({ email, pw }));
    } catch (e) {
      console.log(e);
    }
  }

  // 사용자 확인
  isUser(dispatch: Dispatch<AnyAction>, loadAuthDone: LoadAuthResponse) {
    try {
      const user = localStorage.getItem('user');
      if (!user) return;

      const authS = localStorage.getItem('AuthStatus');
      const authT = localStorage.getItem('Authorization');
      dispatch(authActions.AuthChange({ message: authS, accessToken: authT }));

      if (loadAuthDone.message === undefined || loadAuthDone.message === null) {
        dispatch(userActions.userFailure());
        delete axiosInstance.defaults.headers.common['Authorization'];
        localStorage.removeItem('user');
        localStorage.removeItem('AuthStatus');
        localStorage.removeItem('Authorization');
        localStorage.clear();
        deleteAllCookies();
        return;
      } else {
        dispatch(userActions.userSuccess());
      }
    } catch (e) {
      console.log(e);
    }
  }
  // axios 토큰 관리
  jwtToken(loadAuthDone: LoadAuthResponse) {
    if (loadAuthDone.accessToken != undefined || loadAuthDone.accessToken != '') {
      axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + loadAuthDone.accessToken;
      console.log();
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
      console.log('토큰 없음');
    }
  }

  // 토큰 재발급
  intervalRefresh(dispatch: Dispatch<AnyAction>, loadAuthDone: LoadAuthResponse) {
    if (loadAuthDone.message === 'ACCESS_DENIED') {
      delete axiosInstance.defaults.headers.common['Authorization'];
      localStorage.removeItem('user');
      localStorage.removeItem('AuthStatus');
      localStorage.removeItem('Authorization');
      localStorage.clear();
      deleteAllCookies();
      console.log('토큰 만료');
      return;
    }
    dispatch(authActions.refreshToken());
    const authS = localStorage.getItem('AuthStatus');
    const authT = localStorage.getItem('Authorization');
    dispatch(authActions.AuthChange({ message: authS, accessToken: authT }));
  }

  // 로그아웃
  logout(dispatch: Dispatch<AnyAction>) {
    dispatch(authActions.userLogOut());
    dispatch(userActions.userLogOut());
    delete axiosInstance.defaults.headers.common['Authorization'];
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('userPw');
    localStorage.removeItem('AuthStatus');
    localStorage.removeItem('Authorization');
    localStorage.clear();
    deleteAllCookies();
  }
}
function deleteAllCookies() {
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf('=');
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}
export default AuthService;
