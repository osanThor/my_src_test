import colors from '@/src/assets/Colors';
import { ArrowRight } from '@/src/assets/Images';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const WriteQuantMenu = () => {
  return (
    <WriteQuantMenuBlock>
      <div className="button on">
        <span>기본정보</span>
      </div>
      <div className="arrow">
        <Image src={ArrowRight} alt="arrow" />
      </div>
      <div className="button">
        <span>주문정보</span>
      </div>
      <div className="arrow">
        <Image src={ArrowRight} alt="arrow" />
      </div>
      <div className="button">
        <span>수량정보</span>
      </div>
      <div className="arrow">
        <Image src={ArrowRight} alt="arrow" />
      </div>
      <div className="button">
        <span>옵션선택</span>
      </div>
    </WriteQuantMenuBlock>
  );
};

const WriteQuantMenuBlock = styled.div`
  width: 100%;
  height: 56px;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.gray[1]};
  background-color: ${({ theme }) => theme.bgColor};
  overflow-x: auto;
  white-space: nowrap;

  .button {
    flex: 1;
    text-align: center;
    padding: 8px;
    border-radius: 20px;
    background-color: ${colors.gray[1]};
    color: ${colors.gray[5]};
    span {
      transform: translateY(2px);
    }

    &.on {
      background-color: ${colors.blue[2]};
      color: white;
    }
  }
  .arrow {
    transform: translateY(2px);
    min-width: 9px;
    margin: 0 6.5px;
    position: relative;
  }
`;

export default WriteQuantMenu;
