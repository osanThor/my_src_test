import { RootState } from '@/src/store/configureStore';
import { adminStrategiesActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultTop from '../../components/strategies/detail/DefaultTop';
import PublicWrite from '../../components/strategies/write/PublicWrite';

const PublicContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { getAdminStrategyDetailResult, quantroStrategyPayload } = useSelector(({ adminStrategies }: RootState) => ({
    getAdminStrategyDetailResult: adminStrategies.getAdminStrategyDetailResult,
    quantroStrategyPayload: adminStrategies.quantroStrategyPayload,
  }));

  useEffect(() => {
    if (getAdminStrategyDetailResult) {
      dispatch(
        adminStrategiesActions.changeQuantroStrategyField({
          title: getAdminStrategyDetailResult?.title,
          category: 'QUANTRO_STRATEGY',
          content: getAdminStrategyDetailResult?.content,
          platform: getAdminStrategyDetailResult?.strategy?.platform,
          symbol: getAdminStrategyDetailResult?.strategy?.symbol,
          chartCycle: getAdminStrategyDetailResult?.strategy?.chartCycle,
          profitPct: getAdminStrategyDetailResult?.strategy?.profitPct,
          fileUrls: getAdminStrategyDetailResult?.files.map((file) => file.url),
        }),
      );
    }
  }, [getAdminStrategyDetailResult]);

  return (
    <>
      <DefaultTop />
      <PublicWrite />
    </>
  );
};

export default PublicContainer;
