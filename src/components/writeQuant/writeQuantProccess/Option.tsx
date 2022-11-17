import colors from '@/src/assets/Colors';
import { Mark, SmailBlue } from '@/src/assets/Images';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Option = () => {
  return (
    <OptionBlock>
      <div className="intro_box">
        <div className="intro_title">
          <div className="mark">
            <Image src={Mark} alt="mark" />
          </div>
          <span className="txt">수량정보</span>
        </div>
        <div className="description">주문수량을 입력하실땐 USDT와 코인갯수로 주문해요</div>
      </div>
      <div className="intro_box">
        <div className="intro_title">
          <div className="mark">
            <Image src={SmailBlue} alt="mark" />
          </div>
          <span className="txt">옵션선택</span>
        </div>
        <div className="select_option"></div>
      </div>
    </OptionBlock>
  );
};

const OptionBlock = styled.div`
  width: 100%;
  .intro_box {
    &:first-child {
      margin-bottom: 20px;
    }
    &:last-child {
      background-color: ${colors.blue[0]};
      .intro_title {
        color: ${colors.blue[2]};
      }
    }
  }
`;

export default Option;
