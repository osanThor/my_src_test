import UserLayout from '@/src/components/layout/UserLayout';
import WriteQuantLayout from '@/src/components/writeQuant/WriteQuantLayout';
import WriteQuantTop from '@/src/components/writeQuant/WriteQuantTop';
import { NextPage } from 'next';
import React from 'react';

const WriteQuantIndex: NextPage = () => {
  return (
    <UserLayout>
      <WriteQuantLayout>
        <WriteQuantTop />
      </WriteQuantLayout>
    </UserLayout>
  );
};

export default WriteQuantIndex;
