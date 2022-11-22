import UserLayout from '@/src/components/layout/UserLayout';
import LicenseCenterLayout from '@/src/components/licenses/LicenseCenterLayout';
import LicensesLayout from '@/src/components/licenses/LicensesLayout';
import LicensesTop from '@/src/components/licenses/LicensesTop';
import LicenseIndex from '@/src/components/licenses/process/LicenseIndex';
import React from 'react';

const ApiIndex = () => {
  return (
    <UserLayout>
      <LicensesLayout>
        <LicensesTop />
        <LicenseCenterLayout>
          <LicenseIndex />
        </LicenseCenterLayout>
      </LicensesLayout>
    </UserLayout>
  );
};

export default ApiIndex;
