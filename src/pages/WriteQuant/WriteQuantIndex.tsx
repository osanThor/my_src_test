import UserLayout from '@/src/components/layout/UserLayout';
import WriteQuantBottom from '@/src/components/writeQuant/WriteQuantBottom';
import WriteQuantLayout from '@/src/components/writeQuant/WriteQuantLayout';
import Basic from '@/src/components/writeQuant/writeQuantProccess/Basic';
import OrderInfo from '@/src/components/writeQuant/writeQuantProccess/OrderInfo';
import WriteQuantTop from '@/src/components/writeQuant/WriteQuantTop';
import { NextPage } from 'next';
import React, { useState } from 'react';

const WriteQuantIndex: NextPage = () => {
  const [basic, setBasic] = useState(true);
  const [order, setOrder] = useState(false);
  const [quantity, setQuantity] = useState(false);
  const [option, setOption] = useState(false);

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
