import React, { useEffect } from 'react';
import UserTop from '../../components/user/UserTop';
import AdminLayout from '../../layouts/AdminLayout';
import { useDispatch } from 'react-redux';
import BasicContainer from '../../layouts/BasicContainer';
import { adminUsersActions } from '@/src/store/reducers';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import UserList from '../../components/user/UserList';

const UserIndex = () => {
  const dispatch = useDispatch();
  const { page } = useSelector(({ adminUsers }: RootState) => ({
    page: adminUsers.page,
  }));
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
