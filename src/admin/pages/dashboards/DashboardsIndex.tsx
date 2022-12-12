import { adminDashboardsActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DashBoardGraph from '../../components/dashboard/DashBoardGraph';
import DashboardTop from '../../components/dashboard/DashboardTop';
import AdminLayout from '../../layouts/AdminLayout';

const DashboardsIndex: NextPage = () => {
  const dispatch = useDispatch();

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
