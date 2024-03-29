import colors from '@/src/assets/Colors';
import { Mark, Notice } from '@/src/assets/Images';
import { orderType, priceType, side } from '@/src/assets/Options';
import { localActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../../common/Button';
import CustomSelect from '../item/CustomSelect';

const OrderInfo = () => {
  const dispatch = useDispatch();
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
      <div className="order_form">
        <div className="first_con">
          <div className="write_quant_item">
            <div className="bg_title">주문유형</div>
            <CustomSelect place="주문유형을 선택해요" options={orderType} disable={false} />
          </div>
          <div className="write_quant_item">
            <div className="bg_title">주문방법</div>
            <CustomSelect place="기본계정" options={side} disable={false} />
          </div>
          <div className="write_quant_item">
            <div className="bg_title">주문가격</div>
            <CustomSelect place="주문가격을 선택해요" options={priceType} disable={false} />
            <StyledInput autoComplete="order_price" placeholder="주문가격을 입력해요" disabled />
          </div>
        </div>
        <div className="first_con">
          <div className="write_quant_item">
            <div className="bg_title">주문가격대비 퍼센트</div>
            <CustomInput autoComplete="price_percent" placeholder="퍼센트를 직접 입력하세요" />
            <div className="info">
              <div className="notice">
                <Image src={Notice[0]} alt="notice" />
              </div>
              현재 주문가격보다 싸게 매수할 경우 -n%를 입력해요
            </div>
          </div>
        </div>
      </div>
      <div className="write_quant_bottom">
        <div className="btns">
          <StyledButton onClick={() => dispatch(localActions.gotoBasic())}>이전</StyledButton>
          <StyledButton lightBlue onClick={() => dispatch(localActions.gotoQuantity())}>
            다음
          </StyledButton>
        </div>
      </div>
    </OrderInfoBlock>
  );
};

const OrderInfoBlock = styled.div`
  width: 100%;
  min-height: 583px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .order_form {
    width: 100%;
    display: flex;
    margin-bottom: 145px;
    & > div {
      width: 50%;
      max-width: 732px;
      flex: 1;
      &:first-child {
        margin-right: 40px;
      }

      .write_quant_item {
        width: 100%;
        display: flex;
        margin-bottom: 64px;
        position: relative;
        &:last-child {
          margin-bottom: 0;
        }
        .bg_title {
          min-width: 124px;
          padding: 1rem;
          text-align: center;
          white-space: nowrap;
          border-radius: 8px;
          background-color: ${colors.gray[1]};
          margin-right: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        .info {
          width: 100%;
          display: flex;
          align-items: center;
          padding-left: 194px;
          position: absolute;
          bottom: 0;
          font-size: 14px;
          left: 0;
          word-break: keep-all;
          color: ${colors.gray[4]};
          transform: translateY(130%);
          .notice {
            width: 18px;
            height: 18px;
            margin-right: 8px;
          }
        }
      }
    }
  }
  .write_quant_bottom {
    display: flex;
    button:first-child {
      margin-right: 1rem;
    }
  }

  ${media.pc} {
    min-height: auto;
    .order_form {
      & > div {
        width: 100%;
        max-width: none;
        &:first-child {
          margin-right: 8px;
          margin-bottom: 24px;
        }
        .write_quant_item {
          margin-bottom: 24px;
          .bg_title {
            min-width: 174px;
          }
        }
      }
    }
  }
  ${media.tablet} {
    .order_form {
      flex-direction: column;
      margin-bottom: 40px;
      & > div {
        .write_quant_item {
          .bg_title {
          }
        }
      }
    }
    .write_quant_bottom {
      width: 100%;
      flex-direction: column;
      button:first-child {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
  }
  ${media.mobile} {
    .order_form {
      margin-bottom: 60px;
      & > div {
        .write_quant_item {
          flex-direction: column;
          align-items: flex-start;
          .bg_title {
            padding: 0;
            min-width: auto;
            text-align: center;
            white-space: nowrap;
            border-radius: 8px;
            background-color: inherit;
            margin-bottom: 8px;
          }
          .info {
            padding-left: 0;
          }
        }
      }
    }
  }
`;

const StyledButton = styled(Button)`
  width: 152px;
  min-height: auto;
  height: 50px;
  border-radius: 8px;
  ${media.tablet} {
    width: 100%;
    height: 56px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  max-width: 194px;
  flex: 1;
  margin-left: 1rem;
  border: none;
  padding: 1rem 24px;
  background-color: ${colors.blue[0]};
  transition: all 0.2s;
  border-radius: 8px;
  font-size: 1rem;
  color: ${colors.blue[2]};
  &::placeholder {
    font-size: 1rem;
    color: ${colors.blue[1]};
  }
  &:disabled {
    background-color: ${colors.gray[1]};
    &::placeholder {
      color: ${colors.gray[3]};
    }
  }
  &:focus {
    outline: none;
  }
  ${media.tablet} {
    padding: 0 8px;
  }

  ${media.mobile} {
    max-width: none;
    min-height: 56px;
    margin-top: 8px;
    margin-left: 0;
  }
`;

const CustomInput = styled.input`
  width: 100%;
  min-height: 56px;
  flex: 1;
  border: none;
  padding: 1rem 24px;
  background-color: ${colors.blue[0]};
  transition: all 0.2s;
  border-radius: 8px;
  font-size: 1rem;
  color: ${colors.blue[2]};
  &::placeholder {
    font-size: 1rem;
    color: ${colors.blue[1]};
  }
  &:focus {
    outline: none;
  }
  ${media.tablet} {
    padding: 0 8px;
  }
`;

export default OrderInfo;
