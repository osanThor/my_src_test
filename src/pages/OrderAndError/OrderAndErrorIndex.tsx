import UserLayout from '@/src/components/layout/UserLayout';
import MessageContainer from '@/src/components/orderAndError/MessageContainer';
import MessageTop from '@/src/components/orderAndError/MessageTop';
import NoMessageBox from '@/src/components/orderAndError/NoMessageBox';
import OrderAndErrorLayout from '@/src/components/orderAndError/OrderAndErrorLayout';
import React from 'react';

const OrderAndErrorIndex = () => {
  return (
    <UserLayout>
      <OrderAndErrorLayout>
        <MessageTop />
        <MessageContainer>
          <NoMessageBox />
        </MessageContainer>
      </OrderAndErrorLayout>
    </UserLayout>
  );
};

export default OrderAndErrorIndex;
