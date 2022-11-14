import React from 'react';
import { NextPage } from 'next';

import UserLayout from '@/src/components/layout/UserLayout';

const IndexPage: NextPage = () => {
  return (
    <UserLayout>
      <div>
        <h1>퀀트로 Index 페이지</h1>
      </div>
    </UserLayout>
  );
};

export default IndexPage;
