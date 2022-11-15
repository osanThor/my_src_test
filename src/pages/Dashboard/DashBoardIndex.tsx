import DashboardLayout from '@/src/components/dashboard/DashboardLayout';
import UserLayout from '@/src/components/layout/UserLayout';
import React from 'react';

const DashBoardIndex = () => {
  return (
    <UserLayout>
      <DashboardLayout />
    </UserLayout>
  );
};

export default DashBoardIndex;
