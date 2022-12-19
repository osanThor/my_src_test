import { adminStrategiesActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import DefaultTop from '../../components/strategies/detail/DefaultTop';
import IndicatorWrite from '../../components/strategies/write/IndicatorWrite';

const IndicatorContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <DefaultTop />
      <IndicatorWrite />
    </>
  );
};

export default IndicatorContainer;
