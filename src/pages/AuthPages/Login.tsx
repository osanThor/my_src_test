import React, { useEffect, useState } from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/login/LoginForm';
import { NextPage } from 'next';
import { authActions, userActions } from '@/src/store/reducers';
import { RootState } from '@/src/store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Modal from '@/src/components/common/Modal';

const Login: NextPage = () => {
  const dispatch = useDispatch();

  // 상태 관리
  const { email, pw, loadAuthDone } = useSelector(({ auth }: RootState) => ({
    email: auth.email,
    pw: auth.pw,
    loadAuthDone: auth.loadAuthDone,
  }));
  const { user, userError } = useSelector(({ user }: RootState) => ({
    user: user.user,
    userError: user.userError,
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
    if (autoLogin) {
      localStorage.setItem('userId', email);
      localStorage.setItem('userPw', pw);
    }
    dispatch(authActions.userLogin({ email, pw }));
  };

  // 메세지 모달
  const [modalOpen, setModalOpen] = React.useState(false);
  const [message, setMessage] = useState('');
  const [modalSt, setModalSt] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // 로그인 성공 시 user확인
  const router = useRouter();

  useEffect(() => {
    if (userError === true) {
      setModalOpen(true);
      setMessage('로그인정보를 다시 확인해주세요.');
      setModalSt(true);
      dispatch(userActions.initializeUserForm());
      return;
    }

    if (user) {
      router.push('/');
      console.log('앞이 먼저');
      //구글
      const gId = localStorage.getItem('gId');
      if (!gId) {
        try {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('AuthStatus', loadAuthDone.message);
          localStorage.setItem('Authorization', loadAuthDone.accessToken);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }, [user, userError]);

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
