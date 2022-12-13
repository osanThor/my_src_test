import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useDispatch } from 'react-redux';
import BasicContainer from '../../layouts/BasicContainer';
import { adminUsersActions } from '@/src/store/reducers';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import DetailCommonTop from '../../components/common/DetailCommonTop';
import UserDetailBox from '../../components/user/detail/UserDetailBox';
import UserMiddleBox from '../../components/user/detail/UserMiddleBox';

const UserDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthLoading, loadAdminAuthDone, loadAdminAuthError } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthLoading: adminAuth.loadAdminAuthLoading,
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
    loadAdminAuthError: adminAuth.loadAdminAuthError,
  }));
  const { email } = useSelector(({ adminUsers }: RootState) => ({
    email: adminUsers.email,
  }));

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      alert('권한이 없습니다');
      router.push('/admin/login');
    }
  }, []);

  useEffect(() => {
    setIsAdmin(false);
    dispatch(adminUsersActions.initializeAdminUsersForm());
  }, [dispatch]);

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (loadAdminAuthDone) {
      if (loadAdminAuthDone.accessToken) {
        setIsAdmin(true);
      }
    }
  }, [loadAdminAuthDone]);

  useEffect(() => {
    if (router.query.email) {
      if (isAdmin) {
        dispatch(adminUsersActions.getAdminUserDetail({ email: router.query.email as string }));
      }
    }
  }, [router, isAdmin]);
  return (
    <AdminLayout>
      <BasicContainer>
        <DetailCommonTop />
        <UserDetailBox />
        <UserMiddleBox />
      </BasicContainer>
    </AdminLayout>
  );
};

export default UserDetail;
