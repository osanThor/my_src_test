import colors from '@/src/assets/Colors';
import { ArrowRight } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { localActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const WriteQuantBottom = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { basic, order, quantity, option } = useSelector(({ local }: RootState) => ({
    basic: local.basic,
    order: local.order,
    quantity: local.quantity,
    option: local.option,
  }));
  return (
    <WriteQuantBottomBlock>
      <div className="write_quant_botTop">
        <div className="title">주문작성</div>
        <div className="write_quant_menu">
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
        </div>
      </div>
      {children}
    </WriteQuantBottomBlock>
  );
};

const WriteQuantBottomBlock = styled.div`
  width: 100%;

  .write_quant_botTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .title {
      font-size: 20px;
      font-weight: 800;
    }
    .write_quant_menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .button {
        white-space: nowrap;
        cursor: pointer;
        flex: 1;
        text-align: center;
        padding: 8px 20px;
        border-radius: 20px;
        background-color: ${colors.gray[1]};
        color: ${colors.gray[5]};
        transition: all 0.2s;
        span {
          /* transform: translateY(2px); */
        }
        &:hover {
          background-color: ${colors.gray[2]};
        }

        &.on {
          background-color: ${colors.blue[2]};
          color: white;
          &:hover {
            background-color: ${colors.blue[1]};
          }
        }
      }
      .arrow {
        min-width: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 8px;
        position: relative;
      }
    }
  }

  .intro_box {
    width: 100%;
    background-color: ${colors.gray[1]};
    border-radius: 8px;
    height: 52px;
    display: flex;
    padding: 0 24px;
    align-items: center;
    margin-bottom: 40px;
    .intro_title {
      display: flex;
      align-items: center;
      margin-right: 1rem;
      .mark {
        width: 18px;
        height: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-right: 8px;
      }
    }
    .description {
      color: ${colors.gray[4]};
    }
  }
  .write_quant_bottom {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  //responsive
  ${media.pc} {
    .write_quant_botTop {
      flex-wrap: wrap;
      .write_quant_menu {
        overflow-y: auto;
      }
    }
    .intro_box {
      height: auto;
      min-height: auto;
      padding: 14px 24px;
      flex-wrap: wrap;
    }
  }

  ${media.tablet} {
    .write_quant_botTop {
      display: none;
    }
    .intro_box {
      padding: 12px;
      height: auto;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 20px;
    }
  }
`;

export default WriteQuantBottom;
