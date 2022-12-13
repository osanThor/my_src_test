import Loading from '@/src/components/common/Loading';
import { axiosInstance } from '@/src/store/api';
import { RootState } from '@/src/store/configureStore';
import { adminAuthActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Login from '../../components/auth/login/Login';

const AdminLogin: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { email, pw, loadAdminAuthLoading, loadAdminAuthDone, loadAdminAuthError } = useSelector(
    ({ adminAuth }: RootState) => ({
      email: adminAuth.email,
      pw: adminAuth.pw,
      loadAdminAuthLoading: adminAuth.loadAdminAuthLoading,
      loadAdminAuthDone: adminAuth.loadAdminAuthDone,
      loadAdminAuthError: adminAuth.loadAdminAuthError,
    }),
  );

  const handleChangeAdminField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      dispatch(adminAuthActions.changeAdminLoginField({ email: value, pw }));
    } else if (name === 'pw') {
      dispatch(adminAuthActions.changeAdminLoginField({ email, pw: value }));
    }
  };

  const handleSubmitAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('이메일을 입력해주세요!');
      return;
    } else if (!pw) {
      alert('비밀번호를 입력해주세요!');
      return;
    }

    dispatch(adminAuthActions.adminLogin({ email, pw }));
  };

  useEffect(() => {
    if (loadAdminAuthError) {
      alert(loadAdminAuthError);
      return;
    }
    if (loadAdminAuthDone) {
      if (loadAdminAuthDone.message === 'LOGGED_IN') {
        localStorage.setItem('admin', 'true');
        localStorage.setItem('Authorization', loadAdminAuthDone.accessToken);
        router.push('/admin/dashboard');
      }
    }
  }, [loadAdminAuthLoading, loadAdminAuthError, loadAdminAuthDone]);

  useEffect(() => {
    dispatch(adminAuthActions.initializeAdminAuthForm());
  }, [dispatch]);
  return (
    <>
      {loadAdminAuthLoading ? (
        <Loading />
      ) : (
        <Login handleChangeAdminField={handleChangeAdminField} handleSubmitAdminLogin={handleSubmitAdminLogin} />
      )}
    </>
  );
};

export default AdminLogin;
