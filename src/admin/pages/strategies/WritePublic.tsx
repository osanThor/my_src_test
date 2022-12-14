import { RootState } from '@/src/store/configureStore';
import { adminStrategiesActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailCommonTop from '../../components/common/DetailCommonTop';
import StrategyWriteTop from '../../components/strategies/write/StrategyWriteTop';
import AdminLayout from '../../layouts/AdminLayout';
import BasicContainer from '../../layouts/BasicContainer';

const WritePublic = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
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
    dispatch(adminStrategiesActions.initializeAdminStrategiesForm());
  }, [dispatch]);

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (loadAdminAuthDone) {
      if (loadAdminAuthDone.accessToken) {
        setIsAdmin(true);
      }
    }
  }, [loadAdminAuthDone]);

  return (
    <AdminLayout>
      <BasicContainer>
        <DetailCommonTop handleDeleteModalOpen={null} handleSubmit={null} />
        <StrategyWriteTop />
      </BasicContainer>
    </AdminLayout>
  );
};

export default WritePublic;
