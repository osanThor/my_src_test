import React, { useEffect, useState } from 'react';
import UserTop from '../../components/user/UserTop';
import AdminLayout from '../../layouts/AdminLayout';
import { useDispatch } from 'react-redux';
import BasicContainer from '../../layouts/BasicContainer';
import { adminUsersActions } from '@/src/store/reducers';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import UserList from '../../components/user/UserList';
import { useRouter } from 'next/router';

const UserIndex = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthLoading, loadAdminAuthDone, loadAdminAuthError } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthLoading: adminAuth.loadAdminAuthLoading,
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
    loadAdminAuthError: adminAuth.loadAdminAuthError,
  }));
  const { page } = useSelector(({ adminUsers }: RootState) => ({
    page: adminUsers.page,
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
    if (isAdmin) {
      dispatch(adminUsersActions.getAdminUsers({ page }));
    }
  }, [isAdmin]);
  return (
    <AdminLayout>
      <BasicContainer>
        <UserTop />
        <UserList />
      </BasicContainer>
    </AdminLayout>
  );
};

export default UserIndex;
