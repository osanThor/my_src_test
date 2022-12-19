import { adminStrategiesActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import CommissionCon from '../../components/strategies/detail/commission/CommissionCon';
import DefaultTop from '../../components/strategies/detail/DefaultTop';

const CommissionContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChangeCommisssionField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    dispatch(
      adminStrategiesActions.changeAdminCommission({
        id: parseInt(router.query.id as string),
        answer: value,
      }),
    );
  };
  return (
    <>
      <DefaultTop />
      <CommissionCon handleChangeCommisssionField={handleChangeCommisssionField} />
    </>
  );
};

export default CommissionContainer;
