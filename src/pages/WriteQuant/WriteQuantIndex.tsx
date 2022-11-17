import UserLayout from '@/src/components/layout/UserLayout';
import WriteQuantBottom from '@/src/components/writeQuant/WriteQuantBottom';
import WriteQuantLayout from '@/src/components/writeQuant/WriteQuantLayout';
import Basic from '@/src/components/writeQuant/writeQuantProccess/Basic';
import OrderInfo from '@/src/components/writeQuant/writeQuantProccess/OrderInfo';
import WriteQuantTop from '@/src/components/writeQuant/WriteQuantTop';
import { RootState } from '@/src/store/configureStore';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const WriteQuantIndex: NextPage = () => {
  const { basic, order, quantity, option } = useSelector(({ local }: RootState) => ({
    basic: local.basic,
    order: local.order,
    quantity: local.quantity,
    option: local.option,
  }));
  return (
    <UserLayout>
      <WriteQuantLayout>
        <WriteQuantTop />
        <WriteQuantBottom>
          {basic && <Basic />}
          {order && <OrderInfo />}
        </WriteQuantBottom>
      </WriteQuantLayout>
    </UserLayout>
  );
};

export default WriteQuantIndex;
