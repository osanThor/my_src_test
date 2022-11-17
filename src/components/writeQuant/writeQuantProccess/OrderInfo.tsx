import { Mark } from '@/src/assets/Images';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const OrderInfo = () => {
  return (
    <OrderInfoBlock>
      <div className="intro_box">
        <div className="intro_title">
          <div className="mark">
            <Image src={Mark} alt="mark" />
          </div>
          <span className="txt">주문정보</span>
        </div>
        <div className="description">
          지정가 주문일 경우 직접 가격을 입력하여 주문할 수 있어요 (현재 가격대비 퍼센트로 주문해요)
        </div>
      </div>
    </OrderInfoBlock>
  );
};

const OrderInfoBlock = styled.div`
  width: 100%;
`;

export default OrderInfo;
