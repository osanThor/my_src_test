import React from 'react';
import { NextPage } from 'next';

import UserLayout from '@/src/components/layout/UserLayout';
import IndexLayout from '@/src/components/index/IndexLayout';
import { useDispatch } from 'react-redux';

const IndexPage: NextPage = () => {
  const dispatch = useDispatch();
  return (
    <UserLayout>
      <IndexLayout />
    </UserLayout>
  );
};

export default IndexPage;
