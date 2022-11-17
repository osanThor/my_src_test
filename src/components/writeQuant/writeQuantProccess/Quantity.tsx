import colors from '@/src/assets/Colors';
import { Mark, Notice } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';
import CustomSelect from '../item/CustomSelect';

const Quantity = () => {
  return (
    <QuantityBlock>
      <div className="intro_box">
        <div className="intro_title">
          <div className="mark">
            <Image src={Mark} alt="mark" />
          </div>
          <span className="txt">수량정보</span>
        </div>
        <div className="description">주문수량을 입력하실땐 USDT와 코인갯수로 주문해요</div>
      </div>
      <div className="quantity_form">
        <div className="first_con">
          <div className="write_quant_item">
            <div className="radio_title">
              <label>
                <input type="radio" name="quantity_option" defaultChecked /> 주문수량
              </label>
            </div>
            <CustomSelect />
            <StyledInput autoComplete="order_price" placeholder="개수를 입력해요" />
            <div className="info gray">
              <span>BTC 코인 갯수 입력 : 0.5를 입력하면 0.5개의 BTC 구입</span>
              <span>USDT 코인 갯수 입력 : 500을 입력하면 500USDT의 값어치에 맞는 BTC 구입</span>
            </div>
          </div>
        </div>
        <div className="first_con">
          <div className="write_quant_item">
            <div className="radio_title">
              <label>
                <input type="radio" name="quantity_option" />
                기준자산
              </label>
            </div>
            <CustomSelect />
            <StyledInput autoComplete="order_price" placeholder="잔액대비 n%를 입력해요" />
            <div className="info">
              <div className="notice">
                <Image src={Notice[0]} alt="notice" />
              </div>
              주문방법에서 청산선택시 주문수량을 입력하지 않을 경우 100% 청산돼요
            </div>
          </div>
        </div>
      </div>
      <div className="write_quant_bottom">
        <div className="btns">
          <StyledButton>이전</StyledButton>
          <StyledButton lightBlue>다음</StyledButton>
        </div>
      </div>
    </QuantityBlock>
  );
};

const QuantityBlock = styled.div`
  width: 100%;
  .quantity_form {
    width: 100%;
    display: flex;
    margin-bottom: 100px;
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
        .radio_title {
          text-align: center;
          white-space: nowrap;
          border-radius: 8px;
          margin-right: 24px;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          label {
            display: flex;
            align-items: center;
            cursor: pointer;

            input {
              width: 20px;
              height: 20px;
              margin-right: 6.5px;
            }
          }
        }
        .info {
          width: 100%;
          display: flex;
          align-items: center;
          position: absolute;
          bottom: 0;
          left: 0;
          font-size: 14px;
          word-break: keep-all;
          color: ${colors.gray[4]};
          transform: translateY(110%);
          .notice {
            width: 18px;
            height: 18px;
            margin-right: 8px;
          }
          &.gray {
            flex-wrap: wrap;
            span {
              color: ${colors.gray[3]};
            }
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
    .quantity_form {
      flex-direction: column;
      margin-bottom: 40px;
      & > div {
        width: 100%;
        max-width: none;
        &:first-child {
          margin-right: 0;
          margin-bottom: 24px;
        }
        .write_quant_item {
          margin-bottom: 24px;
          .radio_title {
          }
          .info {
            display: none;
          }
        }
      }
    }
  }
  ${media.tablet} {
    .quantity_form {
      & > div {
        .write_quant_item {
          .radio_title {
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
    .quantity_form {
      margin-bottom: 60px;
      & > div {
        .write_quant_item {
          flex-direction: column;
          align-items: flex-start;
          .radio_title {
            padding: 0;
            min-width: auto;
            text-align: center;
            white-space: nowrap;
            border-radius: 8px;
            background-color: inherit;
            margin-bottom: 8px;
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
  border-radius: 8px;
  font-size: 1rem;
  color: ${colors.blue[2]};
  &::placeholder {
    font-size: 1rem;
    color: ${colors.blue[1]};
  }
  &:disabled {
    background-color: ${colors.gray[0]};
    &::placeholder {
      color: ${colors.gray[2]};
    }
  }
  &:focus {
    outline: none;
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
`;
export default Quantity;
