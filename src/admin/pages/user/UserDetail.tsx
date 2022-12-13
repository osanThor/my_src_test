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
import FuncModal from '@/src/components/common/modals/FuncModal';
import Loading from '@/src/components/common/Loading';
import AcountTable from '../../components/user/detail/AcountTable';

const UserDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { email, loadAdminUsersdLoading, loadAdminUsersdDone, loadAdminUsersdError } = useSelector(
    ({ adminUsers }: RootState) => ({
      email: adminUsers.email,
      loadAdminUsersdLoading: adminUsers.loadAdminUsersdLoading,
      loadAdminUsersdDone: adminUsers.loadAdminUsersdDone,
      loadAdminUsersdError: adminUsers.loadAdminUsersdError,
    }),
  );

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

  //function modal
  const [fModalOpen, setFModalOpen] = useState(false);
  const handleDeleteModalOpen = () => {
    setFModalOpen(true);
  };
  const handleModalClose = () => {
    setFModalOpen(false);
  };
  //delete user
  const handleDeleteUser = () => {
    console.log(email);
    dispatch(adminUsersActions.adminUserDelete({ email }));
  };

  useEffect(() => {
    if (loadAdminUsersdError) {
      alert(loadAdminUsersdError);
      return;
    }

    if (loadAdminUsersdDone) {
      if (loadAdminUsersdDone.message === 'DELETED') {
        alert('삭제 되었어요');
        router.push('/admin/users');
      }
    }
  }, [loadAdminUsersdError, loadAdminUsersdDone]);
  return (
    <>
      <AdminLayout>
        <BasicContainer>
          <DetailCommonTop handleDeleteModalOpen={handleDeleteModalOpen} />
          <UserDetailBox />
          <UserMiddleBox />
          <AcountTable />
        </BasicContainer>
      </AdminLayout>
      <FuncModal
        open={fModalOpen}
        onClose={handleModalClose}
        message={{
          title: '해당 회원을 삭제하시겠습니까?',
          description: '',
          btnTxt: '삭제하기',
        }}
        dubBtn={true}
        onClick={handleDeleteUser}
        onClick2={handleModalClose}
      />
      {loadAdminUsersdLoading && <Loading />}
    </>
  );
};

export default UserDetail;
