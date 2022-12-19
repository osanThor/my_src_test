import { adminStrategiesActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import DefaultTop from '../../components/strategies/detail/DefaultTop';
import PublicWrite from '../../components/strategies/write/PublicWrite';

const PublicContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <DefaultTop />
      <PublicWrite />
    </>
  );
};

export default PublicContainer;
