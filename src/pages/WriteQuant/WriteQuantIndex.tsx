import UserLayout from '@/src/components/layout/UserLayout';
import WriteQuantBottom from '@/src/components/writeQuant/WriteQuantBottom';
import WriteQuantLayout from '@/src/components/writeQuant/WriteQuantLayout';
import Basic from '@/src/components/writeQuant/writeQuantProccess/Basic';
import Option from '@/src/components/writeQuant/writeQuantProccess/Option';
import OrderInfo from '@/src/components/writeQuant/writeQuantProccess/OrderInfo';
import Quantity from '@/src/components/writeQuant/writeQuantProccess/Quantity';
import WriteQuantTop from '@/src/components/writeQuant/WriteQuantTop';
import { RootState } from '@/src/store/configureStore';
import { localActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const WriteQuantIndex: NextPage = () => {
  const dispatch = useDispatch();
  const { basic, order, quantity, option } = useSelector(({ local }: RootState) => ({
    basic: local.basic,
    order: local.order,
    quantity: local.quantity,
    option: local.option,
  }));

  useEffect(() => {
    dispatch(localActions.initializeAuthForm());
  }, [dispatch]);
  return (
    <UserLayout>
      <WriteQuantLayout>
        <WriteQuantTop />
        <WriteQuantBottom>
          {basic && <Basic />}
          {order && <OrderInfo />}
          {quantity && <Quantity />}
          {option && <Option />}
        </WriteQuantBottom>
      </WriteQuantLayout>
    </UserLayout>
  );
};

export default WriteQuantIndex;
