import colors from '@/src/assets/Colors';
import { ArrowRight } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { localActions } from '@/src/store/reducers';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const WriteQuantMenu = () => {
  const dispatch = useDispatch();
  const { basic, order, quantity, option } = useSelector(({ local }: RootState) => ({
    basic: local.basic,
    order: local.order,
    quantity: local.quantity,
    option: local.option,
  }));
  return (
    <WriteQuantMenuBlock>
      <div className={basic ? 'button on' : 'button'} onClick={() => dispatch(localActions.gotoBasic())}>
        <span>기본정보</span>
      </div>
      <div className="arrow">
        <Image src={ArrowRight} alt="arrow" />
      </div>
      <div className={order ? 'button on' : 'button'} onClick={() => dispatch(localActions.gotoOrder())}>
        <span>주문정보</span>
      </div>
      <div className="arrow">
        <Image src={ArrowRight} alt="arrow" />
      </div>
      <div className={quantity ? 'button on' : 'button'} onClick={() => dispatch(localActions.gotoQuantity())}>
        <span>수량정보</span>
      </div>
      <div className="arrow">
        <Image src={ArrowRight} alt="arrow" />
      </div>
      <div className={option ? 'button on' : 'button'} onClick={() => dispatch(localActions.gotoOption())}>
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
