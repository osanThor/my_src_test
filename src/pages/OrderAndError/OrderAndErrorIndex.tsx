import UserLayout from '@/src/components/layout/UserLayout';
import MessageTop from '@/src/components/orderAndError/MessageTop';
import OrderAndErrorLayout from '@/src/components/orderAndError/OrderAndErrorLayout';
import React from 'react';

const OrderAndErrorIndex = () => {
  return (
    <UserLayout>
      <OrderAndErrorLayout>
        <MessageTop />
      </OrderAndErrorLayout>
    </UserLayout>
  );
};

export default OrderAndErrorIndex;
