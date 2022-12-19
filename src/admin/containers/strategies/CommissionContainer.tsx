import { adminStrategiesActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import CommissionCon from '../../components/strategies/detail/commission/CommissionCon';
import CommissionTop from '../../components/strategies/detail/commission/CommissionTop';

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
      <CommissionTop />
      <CommissionCon handleChangeCommisssionField={handleChangeCommisssionField} />
    </>
  );
};

export default CommissionContainer;
