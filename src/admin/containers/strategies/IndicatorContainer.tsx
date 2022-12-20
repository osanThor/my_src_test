import { RootState } from '@/src/store/configureStore';
import { adminStrategiesActions } from '@/src/store/reducers';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultTop from '../../components/strategies/detail/DefaultTop';
import IndicatorWrite from '../../components/strategies/write/IndicatorWrite';

const IndicatorContainer = () => {
  const dispatch = useDispatch();
  const { getAdminStrategyDetailResult } = useSelector(({ adminStrategies }: RootState) => ({
    getAdminStrategyDetailResult: adminStrategies.getAdminStrategyDetailResult,
  }));

  useEffect(() => {
    if (getAdminStrategyDetailResult) {
      dispatch(
        adminStrategiesActions.changeQuantroIndicatorField({
          title: getAdminStrategyDetailResult?.title,
          category: 'QUANTRO_INDICATOR',
          content: getAdminStrategyDetailResult?.content,
          fileUrls: getAdminStrategyDetailResult?.files.map((file) => file.url),
        }),
      );
    }
  }, [getAdminStrategyDetailResult]);

  return (
    <>
      <DefaultTop />
      <IndicatorWrite />
    </>
  );
};

export default IndicatorContainer;
