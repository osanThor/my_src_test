import UserLayout from '@/src/components/layout/UserLayout';
import InquiriesLayout from '@/src/components/mypage/inquiries/InquiriesLayout';
import InquiriesWriteCon from '@/src/components/mypage/inquiries/write/InquiriesWriteCon';
import { NextPage } from 'next';
import React from 'react';

const InquiriesWrite: NextPage = () => {
  return (
    <UserLayout>
      <InquiriesLayout>
        <InquiriesWriteCon />
      </InquiriesLayout>
    </UserLayout>
  );
};

export default InquiriesWrite;
