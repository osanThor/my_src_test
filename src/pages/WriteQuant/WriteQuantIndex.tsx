import UserLayout from '@/src/components/layout/UserLayout';
import WriteQuantBottom from '@/src/components/writeQuant/WriteQuantBottom';
import WriteQuantLayout from '@/src/components/writeQuant/WriteQuantLayout';
import WriteQuantTop from '@/src/components/writeQuant/WriteQuantTop';
import { NextPage } from 'next';
import React from 'react';

const WriteQuantIndex: NextPage = () => {
  return (
    <UserLayout>
      <WriteQuantLayout>
        <WriteQuantTop />
        <WriteQuantBottom />
      </WriteQuantLayout>
    </UserLayout>
  );
};

export default WriteQuantIndex;
