import colors from '@/src/assets/Colors';
import { CheckRadio, Mark, Notice } from '@/src/assets/Images';
import { equityType, qtyType } from '@/src/assets/Options';
import { localActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../../common/Button';
import CustomSelect from '../item/CustomSelect';

const Quantity = () => {
  const dispatch = useDispatch();

  // input disabled
  const [isOrder, setIsOrder] = useState(true);
  const [isStandard, setIsStandard] = useState(false);
  const handleCheckRadio = (e: any) => {
    const _this = e.target;
    if (_this.value === 'order') {
      setIsOrder(true);
      setIsStandard(false);
    } else {
      setIsOrder(false);
      setIsStandard(true);
    }
  };

  // caption event
  const [orderCaption, setOrderCaption] = useState(false);
  const [standardCaption, setStandardCaption] = useState(false);

  const orderRef = useRef<HTMLDivElement>(null);
  const standardRef = useRef<HTMLDivElement>(null);
  const handleClickOutSide = (e: any) => {
    if (orderCaption && !orderRef.current.contains(e.target)) {
      setOrderCaption(false);
    }
    if (standardCaption && !standardRef.current.contains(e.target)) {
      setStandardCaption(false);
    }
  };
  useEffect(() => {
    if (orderCaption || standardCaption) document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });

  return (
    <QuantityBlock>
      <div>
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
                  <input
                    type="radio"
                    onChange={handleCheckRadio}
                    name="quantity_option"
                    value="order"
                    checked={isOrder}
                  />
                  <span className="radio"></span>
                  주문수량
                </label>
                <div ref={orderRef} className="mo_info_box" onClick={() => setOrderCaption(!orderCaption)}>
                  <div className="notice">
                    <Image src={Notice[0]} alt="notice" />
                  </div>
                  도움말
                  {orderCaption && (
                    <div className="mo_caption">
                      <div className="cap_title">주문수량</div>
                      <span>BTC 코인 갯수 입력 : 0.5를 입력하면 0.5개의 BTC 구입</span>
                      <span>USDT 코인 갯수 입력 : 500을 입력하면 500USDT의 값어치에 맞는 BTC 구입</span>
                    </div>
                  )}
                </div>
              </div>
              <CustomSelect place="주문수량을 선택해요" options={qtyType} disable={!isOrder} />
              <StyledInput autoComplete="order_price" placeholder="개수를 입력해요" disabled={!isOrder} />
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
                  <input
                    type="radio"
                    onChange={handleCheckRadio}
                    name="quantity_option"
                    value="standard"
                    checked={isStandard}
                  />
                  <span className="radio"></span>
                  기준자산
                </label>
                <div ref={standardRef} className="mo_info_box" onClick={() => setStandardCaption(!standardCaption)}>
                  <div className="notice">
                    <Image src={Notice[0]} alt="notice" />
                  </div>
                  도움말
                  {standardCaption && (
                    <div className="mo_caption">
                      <div className="cap_title">기준자산</div>
                      <div className="mo_info">
                        <div className="notice">
                          <Image src={Notice[0]} alt="notice" />
                        </div>
                        주문방법에서 청산선택시 주문수량을 입력하지 않을 경우 100% 청산돼요
                      </div>
                      <span>잔액대비 입력 : 현재 보유중인 포지션(코인)을 제외한 남은 잔액</span>
                      <span>총 자산대비 입력 : 현재 보유중인 포지션(코인)을 포함한 남은 잔액</span>
                    </div>
                  )}
                </div>
              </div>
              <CustomSelect place="기준자산을 선택해요" options={equityType} disable={!isStandard} />
              <StyledInput autoComplete="order_price" placeholder="잔액대비 n%를 입력해요" disabled={!isStandard} />
              <div className="info">
                <div className="notice">
                  <Image src={Notice[0]} alt="notice" />
                </div>
                주문방법에서 청산선택시 주문수량을 입력하지 않을 경우 100% 청산돼요
                <div className="info gray">
                  <span>잔액대비 입력 : 현재 보유중인 포지션(코인)을 제외한 남은 잔액</span>
                  <span>총 자산대비 입력 : 현재 보유중인 포지션(코인)을 포함한 남은 잔액</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="write_quant_bottom">
        <div className="btns">
          <div className="message_btns">
            <StyledButton blue>메세지 저장</StyledButton>
            <StyledButton blue>메세지 작성</StyledButton>
          </div>
          <div className="bottom_btns">
            <StyledButton onClick={() => dispatch(localActions.gotoOrder())}>이전</StyledButton>
            <StyledButton lightBlue onClick={() => dispatch(localActions.gotoOption())}>
              다음
            </StyledButton>
          </div>
        </div>
      </div>
    </QuantityBlock>
  );
};

const QuantityBlock = styled.div`
  width: 100%;
  min-height: 583px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .mo_info_box {
    display: none;
  }
  .quantity_form {
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
        .radio_title {
          min-width: 93px;
          text-align: center;
          white-space: nowrap;
          border-radius: 8px;
          margin-right: 24px;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          label {
            display: flex;
            align-items: center;
            cursor: pointer;

            input {
              display: none;
            }
            span.radio {
              width: 24px;
              height: 24px;
              margin-right: 4px;
              background: url(${CheckRadio[0].src}) no-repeat 50% / cover;
              transition: all 0.2s;
              transform: translateY(-2px);
            }

            input:checked + span.radio {
              background: url(${CheckRadio[1].src}) no-repeat 50% / cover;
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
          transform: translateY(130%);
          padding-left: 117px;
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
          & > .info {
            align-items: flex-start;
            flex-direction: column;
            transform: translateY(100%);
          }
        }
      }
    }
  }
  .write_quant_bottom {
    display: flex;
    .btns {
      display: flex;
      flex-direction: column;
      .message_btns {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
        button {
          width: 100%;
          margin-right: 0;

          &:first-child {
            margin-bottom: 16px;
          }
        }
      }
    }
    button:first-child {
      margin-right: 1rem;
    }
  }
  ${media.pc} {
    min-height: auto;
    .quantity_form {
      flex-wrap: wrap;
      & > div {
        width: 100%;
        max-width: none;
        &:first-child {
          margin-right: 8px;
          margin-bottom: 24px;
        }
        .write_quant_item {
          margin-bottom: 24px;
          .radio_title {
            justify-content: space-between;
            flex-direction: column;
            min-width: auto;
            flex-wrap: wrap;
            width: auto;
            .mo_info_box {
              cursor: pointer;
              position: relative;
              word-break: keep-all;
              display: flex;
              align-items: center;
              font-size: 14px;
              color: ${colors.gray[3]};
              .notice {
                width: 18px;
                height: 18px;
                margin-right: 8px;
              }
              .mo_caption {
                width: calc(100vw - 2rem);
                max-width: 240px;
                position: absolute;
                background-color: white;
                display: flex;
                flex-direction: column;
                z-index: 991;
                box-shadow: ${({ theme }) => theme.boxShadow};
                border-radius: 8px;
                padding: 12px;
                align-items: flex-start;
                top: 100%;
                right: 0;
                .cap_title {
                  width: 100%;
                  font-size: 16px;
                  margin-bottom: 4px;
                  color: ${colors.gray[5]};
                }
                .mo_info {
                  width: 100%;
                  display: flex;
                  white-space: normal;
                  text-align: left;
                  margin-bottom: 4px;
                  .notice {
                    min-width: 18px;
                  }
                }

                span {
                  text-align: left;
                  white-space: normal;
                }
              }
            }
          }
          .info {
            display: none;
          }
        }
      }
    }
  }
  ${media.custom(1310)} {
    .quantity_form {
      & > div {
        &:first-child {
          margin-right: 0;
        }
      }
    }
  }
  ${media.tablet} {
    .quantity_form {
      flex-direction: column;
      margin-bottom: 40px;
      & > div {
        &:first-child {
          margin-right: 0;
        }
        .write_quant_item {
          flex-direction: column;
          align-items: flex-start;
          .radio_title {
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
            padding: 0;
            margin-right: 0;
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
    .write_quant_bottom {
      width: 100%;
      flex-direction: column;
      .btns {
        .message_btns {
          margin-bottom: 20px;
          button {
            width: 100%;
            margin-right: 0;

            &:first-child {
              margin-bottom: 20px;
            }
          }
        }
        button:first-child {
          margin-right: 0;
          margin-bottom: 20px;
        }
        .bottom_btns {
          button:first-child {
            display: none;
          }
        }
      }
    }
  }
  ${media.mobile} {
    .quantity_form {
      margin-bottom: 60px;
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
  min-width: 160px;
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
    max-width: none;
    min-height: 56px;
    margin-top: 8px;
    margin-left: 0;
  }
`;

export default Quantity;
