import React, { useEffect, useState } from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/login/LoginForm';
import { NextPage } from 'next';
import { authActions } from '@/src/store/reducers';
import { RootState } from '@/src/store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Modal from '@/src/components/common/Modal';
import AuthService from '@/src/utils/auth_service';
import { useSession } from 'next-auth/react';

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const authService = new AuthService();
  const { data: session } = useSession();
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
    console.log(loadAuthDone);
    const gId = localStorage.getItem('gId');
    if (gId) {
      if (loadAuthDone.message === 'CAN_CREATE') {
        // const { accessToken } = session;
        // localStorage.setItem('Authorization', accessToken);
        router.push('/auth/terms');
        return;
      }
      authService.userLogin(loadAuthDone);
      router.push('/');
    }
  }, [loadAuthDone, loadAuthError]);

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
    </AuthLayout>
  );
};

export default Login;
