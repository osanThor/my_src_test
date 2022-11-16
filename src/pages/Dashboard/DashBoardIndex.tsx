import Balance from '@/src/components/dashboard/Balance';
import DashboardLayout from '@/src/components/dashboard/DashboardLayout';
import MyExchangeArea from '@/src/components/dashboard/MyExchangeArea';
import MyPositionArea from '@/src/components/dashboard/MyPositionArea';
import NoticeArea from '@/src/components/dashboard/NoticeArea';
import UserLayout from '@/src/components/layout/UserLayout';
import { NextPage } from 'next';
import React from 'react';

const DashBoardIndex: NextPage = () => {
  return (
    <UserLayout>
      <DashboardLayout>
        <NoticeArea />
        <MyExchangeArea />
        <Balance />
        <MyPositionArea />
      </DashboardLayout>
    </UserLayout>
  );
};

export default DashBoardIndex;
