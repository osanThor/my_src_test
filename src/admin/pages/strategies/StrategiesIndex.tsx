import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useDispatch } from 'react-redux';
import BasicContainer from '../../layouts/BasicContainer';
import { adminStrategiesActions } from '@/src/store/reducers';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import StrategyTop from '../../components/strategies/StrategyTop';
import StrategiesList from '../../components/strategies/StrategiesList';

const StrategiesIndex = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { page } = useSelector(({ adminStrategies }: RootState) => ({
    page: adminStrategies.page,
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

  useEffect(() => {
    if (isAdmin) {
      dispatch(
        adminStrategiesActions.getAllAdminStrategies({
          page,
        }),
      );

      if (router.query.page) {
        dispatch(adminStrategiesActions.changePage({ page: parseInt(router.query.page as string) }));
      } else {
        dispatch(adminStrategiesActions.changePage({ page: 1 }));
      }
    }
  }, [router, isAdmin, page]);
  return (
    <AdminLayout>
      <BasicContainer>
        <StrategyTop />
        <StrategiesList />
      </BasicContainer>
    </AdminLayout>
  );
};

export default StrategiesIndex;
