import CenterLayout from '@/src/components/center/CenterLayout';
import UserLayout from '@/src/components/layout/UserLayout';
import React from 'react';

const CenterPageIndex = () => {
  return (
    <UserLayout>
      <CenterLayout></CenterLayout>
    </UserLayout>
  );
};

export default CenterPageIndex;
