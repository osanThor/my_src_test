import React from 'react';
import { NextPage } from 'next';

import UserLayout from '@/src/components/layout/UserLayout';
import IndexLayout from '@/src/components/index/IndexLayout';

const IndexPage: NextPage = () => {
  return (
    <UserLayout>
      <IndexLayout />
    </UserLayout>
  );
};

export default IndexPage;
