import UserLayout from '@/src/components/layout/UserLayout';
import AddApiKeyCon from '@/src/components/licenses/AddApiKeyCon';
import LicenseCenterLayout from '@/src/components/licenses/LicenseCenterLayout';
import LicensesLayout from '@/src/components/licenses/LicensesLayout';
import LicensesTop from '@/src/components/licenses/LicensesTop';
import LicenseIndex from '@/src/components/licenses/process/LicenseIndex';
import React from 'react';

const LicensePageIndex = () => {
  return (
    <UserLayout>
      <LicensesLayout>
        <LicensesTop />
        <LicenseCenterLayout>
          <LicenseIndex />
        </LicenseCenterLayout>
        <AddApiKeyCon />
      </LicensesLayout>
    </UserLayout>
  );
};

export default LicensePageIndex;
