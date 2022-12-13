import React, { useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useDispatch } from 'react-redux';
import BasicContainer from '../../layouts/BasicContainer';
import { adminUsersActions } from '@/src/store/reducers';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import DetailCommonTop from '../../components/common/DetailCommonTop';

const UserDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { email } = useSelector(({ adminUsers }: RootState) => ({
    email: adminUsers.email,
  }));
  useEffect(() => {
    dispatch(adminUsersActions.initializeAdminUsersForm());
  }, [dispatch]);

  useEffect(() => {
    if (router.query.email) {
      dispatch(adminUsersActions.getAdminUserDetail({ email: router.query.email as string }));
    }
  }, [router]);
  return (
    <AdminLayout>
      <BasicContainer>
        <DetailCommonTop />
      </BasicContainer>
    </AdminLayout>
  );
};

export default UserDetail;
