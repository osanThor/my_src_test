import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

const OrderAndErrorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <OrderAndErrorLayoutBlock className="container">
      <OrderAndErrorHeaderSpacer />
      {children}
    </OrderAndErrorLayoutBlock>
  );
};

const OrderAndErrorLayoutBlock = styled.div`
  width: 100%;
`;
const OrderAndErrorHeaderSpacer = styled.div`
  ${media.tablet} {
    width: 100%;
    height: 56px;
  }
`;
export default OrderAndErrorLayout;
