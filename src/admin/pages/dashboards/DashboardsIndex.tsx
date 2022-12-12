import { RootState } from '@/src/store/configureStore';
import { adminDashboardsActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import DashBoardGraph from '../../components/dashboard/DashBoardGraph';
import DashboardTop from '../../components/dashboard/DashboardTop';
import AdminLayout from '../../layouts/AdminLayout';

const DashboardsIndex: NextPage = () => {
  const dispatch = useDispatch();
  const { getAllUserCountResult, getAllExchangeResult, getPackageResult } = useSelector(
    ({ adminDashBoards }: RootState) => ({
      getAllUserCountResult: adminDashBoards.getAllUserCountResult,
      getAllExchangeResult: adminDashBoards.getAllExchangeResult,
      getPackageResult: adminDashBoards.getPackageResult,
    }),
  );
  console.log(getAllUserCountResult, getAllExchangeResult, getPackageResult);

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
