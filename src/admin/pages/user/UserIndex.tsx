import React, { useEffect } from 'react';
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
    dispatch(adminUsersActions.initializeAdminUsersForm());
  }, [dispatch]);

  useEffect(() => {
    dispatch(adminUsersActions.getAdminUsers({ page }));
  }, []);
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
