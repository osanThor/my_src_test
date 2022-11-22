import UserLayout from '@/src/components/layout/UserLayout';
import LicensesLayout from '@/src/components/licenses/LicensesLayout';
import LicensesTop from '@/src/components/licenses/LicensesTop';
import React from 'react';

const ApiIndex = () => {
  return (
    <UserLayout>
      <LicensesLayout>
        <LicensesTop />
      </LicensesLayout>
    </UserLayout>
  );
};

export default ApiIndex;
