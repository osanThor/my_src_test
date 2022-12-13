import { adminDashboardsActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DashBoardGraph from '../../components/dashboard/DashBoardGraph';
import DashboardTop from '../../components/dashboard/DashboardTop';
import AdminLayout from '../../layouts/AdminLayout';

const DashboardsIndex: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      alert('권한이 없습니다');
      router.push('/admin/login');
    }
  }, []);

  useEffect(() => {
    dispatch(adminDashboardsActions.getUserCount());
    dispatch(adminDashboardsActions.getExchagneCount());
    dispatch(adminDashboardsActions.getPackageCount());
  }, []);
  return (
    <AdminLayout>
      <DashboardTop />
      <DashBoardGraph />
    </AdminLayout>
  );
};

export default DashboardsIndex;
