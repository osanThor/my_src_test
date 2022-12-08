import React, { useEffect, useState } from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/login/LoginForm';
import { NextPage } from 'next';
import { authActions } from '@/src/store/reducers';
import { RootState } from '@/src/store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import AuthService from '@/src/utils/auth_service';
import { useSession } from 'next-auth/react';
import Loading from '@/src/components/common/Loading';
import Modal from '@/src/components/common/modals/Modal';

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const authService = new AuthService();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('Authorization');
    if (!auth) {
      localStorage.clear();
      return;
    }
    const user = localStorage.getItem('user');
    if (user) {
      router.push('/');
    }
  }, []);

  // 상태 관리
  const { email, pw, loadAuthDone, loadAuthError } = useSelector(({ auth }: RootState) => ({
    email: auth.email,
    pw: auth.pw,
    loadAuthDone: auth.loadAuthDone,
    loadAuthError: auth.loadAuthError,
  }));

  const handleChangeLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let emailVal = email;
    let pwVal = pw;
    if (name === 'email') {
      emailVal = value;
    } else {
      pwVal = value;
    }
    dispatch(
      authActions.changeLoginField({
        email: emailVal,
        pw: pwVal,
      }),
    );
  };

  // 자동 로그인 설정
  const [autoLogin, setAutoLogin] = useState(false);
  const handleAutoLogin = () => {
    setAutoLogin(!autoLogin);
  };

  // 로그인
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(authActions.userLogin({ email, pw }));
  };

  // 메세지 모달
  const [modalOpen, setModalOpen] = React.useState(false);
  const [message, setMessage] = useState('');
  const [modalSt, setModalSt] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  //Error handler
  useEffect(() => {
    if (loadAuthError) {
      if (loadAuthDone.message === 'ACCESS_DENIED') {
        setModalOpen(true);
        setMessage('세션이 만료되었어요. 다시 로그인해주세요');
        setModalSt(true);
        return;
      }
      setModalOpen(true);
      setMessage(loadAuthError);
      setModalSt(true);
      return;
    }

    // email login
    if (loadAuthDone.message === 'EMAIL_PW_REQUIRED' || loadAuthDone.message === 'NO_MATCH_USER') {
      setModalOpen(true);
      setMessage('이메일과 비밀번호를 확인해요 ');
      setModalSt(true);
      return;
    } else if (loadAuthDone.message === 'NOT_FOUND_USER') {
      setModalOpen(true);
      setMessage('로그인 정보를 다시 확인해주세요');
      setModalSt(true);
      return;
    } else if (loadAuthDone.message === 'LOGGED_IN') {
      if (autoLogin) {
        localStorage.setItem('userInfo', JSON.stringify({ email: email, pw: pw }));
      }
      authService.userLogin(loadAuthDone);
      router.push('/');
    }

    // google login
    if (status === 'authenticated') {
      if (loadAuthDone.message === 'CAN_CREATE') {
        const { user, accessToken } = session;
        let email;
        email = user.email;
        localStorage.setItem('gId', email);
        localStorage.setItem('gAuth', accessToken);
        router.push('/auth/terms');
      } else if (loadAuthDone.accessToken) {
        localStorage.setItem('gId', 'true');
        authService.userLogin(loadAuthDone);
        router.push('/');
      }
    }
  }, [loadAuthDone, loadAuthError]);

  //loading
  const [googleLoading, setGoogleLogin] = useState(false);
  useEffect(() => {
    if (status === 'loading') {
      setGoogleLogin(true);
    } else {
      setTimeout(() => {
        setGoogleLogin(false);
      }, 1000);
    }
  }, [status]);

  // 상태 초기화
  useEffect(() => {
    dispatch(authActions.initializeAuthForm());
  }, [dispatch]);

  return (
    <AuthLayout type="login">
      <LoginForm
        email={email}
        pw={pw}
        onChange={handleChangeLoginForm}
        autoLogin={autoLogin}
        handleAutoLogin={handleAutoLogin}
        onSubmit={handleLoginSubmit}
      />
      <Modal open={modalOpen} close={handleModalClose} message={message} error={modalSt} />
      {googleLoading && <Loading />}
    </AuthLayout>
  );
};

export default Login;
