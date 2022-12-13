import { RootState } from '@/src/store/configureStore';
import { adminDashboardsActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashBoardGraph from '../../components/dashboard/DashBoardGraph';
import DashboardTop from '../../components/dashboard/DashboardTop';
import AdminLayout from '../../layouts/AdminLayout';

const DashboardsIndex: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthLoading, loadAdminAuthDone, loadAdminAuthError } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthLoading: adminAuth.loadAdminAuthLoading,
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
    loadAdminAuthError: adminAuth.loadAdminAuthError,
  }));

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      alert('권한이 없습니다');
      router.push('/admin/login');
    }
  }, []);

  useEffect(() => {
    if (!loadAdminAuthLoading) {
      if (loadAdminAuthDone) {
        if (loadAdminAuthDone.accessToken) {
          setIsAdmin(true);
        }
      }
    }
  }, [loadAdminAuthLoading, loadAdminAuthDone]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(adminDashboardsActions.getUserCount());
      dispatch(adminDashboardsActions.getExchagneCount());
      dispatch(adminDashboardsActions.getPackageCount());
    }
  }, [router, isAdmin]);
  return (
    <AdminLayout>
      <DashboardTop />
      <DashBoardGraph />
    </AdminLayout>
  );
};

export default DashboardsIndex;
