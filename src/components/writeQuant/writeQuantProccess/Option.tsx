import colors from '@/src/assets/Colors';
import { CheckCircle, Mark, Notice, NumberButton, SmailBlue } from '@/src/assets/Images';
import { conditionType } from '@/src/assets/Options';
import { localActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../../common/Button';
import CustomSelect from '../item/CustomSelect';

const Option = () => {
  const dispatch = useDispatch();
  const [leverageCaption, setLeverageCaption] = useState(false);
  const [conditionCaption, setConditionCaption] = useState(false);
  const [breakCaption, setBreakCaption] = useState(false);
  const [goalCaption, setGoalCaption] = useState(false);

  const leverageRef = useRef<HTMLDivElement>(null);
  const conditionRef = useRef<HTMLDivElement>(null);
  const breakRef = useRef<HTMLDivElement>(null);
  const goalRef = useRef<HTMLDivElement>(null);
  const handleClickOutSide = (e: any) => {
    if (leverageCaption && !leverageRef.current.contains(e.target)) {
      setLeverageCaption(false);
    }
    if (conditionCaption && !conditionRef.current.contains(e.target)) {
      setConditionCaption(false);
    }
    if (breakCaption && !breakRef.current.contains(e.target)) {
      setBreakCaption(false);
    }
    if (goalCaption && !goalRef.current.contains(e.target)) {
      setGoalCaption(false);
    }
  };
  useEffect(() => {
    if (leverageCaption || conditionCaption || breakCaption) document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });
  return (
    <OptionBlock>
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
        <div className="intro_box">
          <div className="intro_title">
            <div className="mark">
              <Image src={SmailBlue} alt="mark" />
            </div>
            <span className="txt">옵션선택</span>
          </div>
          <div className="select_option">
            <label>
              <input type="checkbox" />
              <span className="styled_checkbox" />
              미체결 주문 취소
            </label>
            <label>
              <input type="checkbox" />
              <span className="styled_checkbox" />
              포지션 청산
            </label>
          </div>
        </div>
        <div className="quantity_form">
          <div className="first_con">
            <div className="write_quant_item">
              <div className="radio_title">
                <label>
                  <input type="radio" name="leverage" /> 레버리지
                </label>
                <div ref={leverageRef} className="mo_info_box" onClick={() => setLeverageCaption(!leverageCaption)}>
                  <div className="notice">
                    <Image src={Notice[0]} alt="notice" />
                  </div>
                  도움말
                  {leverageCaption && (
                    <div className="mo_caption">
                      <div className="cap_title">레버리지</div>
                      <div className="mo_info">
                        <div className="notice">
                          <Image src={Notice[0]} alt="notice" />
                        </div>
                        격리, 교차 중 선택해주세요 (1~100까지 0.1 단위로 설정가능)
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="leverage_con">
                <div className="select_leverage">
                  <label>
                    <input type="radio" name="leverageType" />
                    <span>격리</span>
                  </label>
                  <label>
                    <input type="radio" name="leverageType" />
                    <span>교차</span>
                  </label>
                </div>
                <div className="leverage_input_box">
                  <div className="button plus">
                    <Image src={NumberButton[1]} alt="minusButton" />
                  </div>
                  <input type="number" step="0.1" />
                  <div className="button minus">
                    <Image src={NumberButton[0]} alt="minusButton" />
                  </div>
                </div>
              </div>
              <div className="info">
                <div className="notice">
                  <Image src={Notice[0]} alt="notice" />
                </div>
                격리, 교차 중 선택해주세요 (1~100까지 0.1 단위로 설정가능)
              </div>
            </div>
            <div className="write_quant_item">
              <div className="radio_title">
                <label>
                  <input type="radio" name="quantity_option" /> 조건부주문
                </label>
                <div ref={conditionRef} className="mo_info_box" onClick={() => setConditionCaption(!conditionCaption)}>
                  <div className="notice">
                    <Image src={Notice[0]} alt="notice" />
                  </div>
                  도움말
                  {conditionCaption && (
                    <div className="mo_caption">
                      <div className="cap_title">조건부주문</div>
                      <div className="mo_info">
                        <div className="notice">
                          <Image src={Notice[0]} alt="notice" />
                        </div>
                        트레일링 스탑기능이 있어요 (현재가격을 추적해 손절가의 거리를 지속적으로 유지)
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <CustomSelect place="주문가격을 선택해요" options={conditionType} disable={false} />
              <StyledInput autoComplete="order_price" placeholder="개수를 입력해요" />
            </div>
            <div className="write_quant_item">
              <div className="radio_title">
                <label>
                  <input type="radio" name="quantity_option" /> 추적손절매
                </label>
                {/* <div ref={orderRef} className="mo_info_box" onClick={() => setOrderCaption(!orderCaption)}>
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
                </div> */}
              </div>
              <CustomInput autoComplete="order_price" placeholder="퍼센트를 직접 입력해요" />
            </div>
          </div>
          <div className="first_con">
            <div className="write_quant_item">
              <div className="radio_title">
                <label>
                  <input type="radio" name="quantity_option" /> 손절가격
                </label>
                <div ref={breakRef} className="mo_info_box" onClick={() => setBreakCaption(!breakCaption)}>
                  <div className="notice">
                    <Image src={Notice[0]} alt="notice" />
                  </div>
                  도움말
                  {breakCaption && (
                    <div className="mo_caption">
                      <div className="cap_title">손절가격</div>
                      <span>진입가격 대비 손절가격 +-%를 지정해요</span>
                    </div>
                  )}
                </div>
              </div>
              <CustomInput autoComplete="order_price" placeholder="손절가(%)를 입력해주세요" />
              <div className="info gray">
                <span>진입가격 대비 손절가격 +-%를 지정해요</span>
              </div>
            </div>
            <div className="write_quant_item">
              <div className="radio_title">
                <label>
                  <input type="radio" name="quantity_option" /> 목표가격
                </label>
                <div ref={goalRef} className="mo_info_box" onClick={() => setGoalCaption(!goalCaption)}>
                  <div className="notice">
                    <Image src={Notice[0]} alt="notice" />
                  </div>
                  도움말
                  {goalCaption && (
                    <div className="mo_caption">
                      <div className="cap_title">목표가격</div>
                      <span>진입가격 대비 목표가격 +-%를 지정해요</span>
                    </div>
                  )}
                </div>
              </div>
              <CustomInput autoComplete="order_price" placeholder="목표가(%)를 입력해주세요" />
              <div className="info gray">
                <span>진입가격 대비 목표가격 +-%를 지정해요</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="write_quant_bottom">
        <div className="btns">
          <div className="message_btns">
            <StyledButton blue>메세지 저장</StyledButton>
          </div>
          <div className="bottom_btns">
            <StyledButton onClick={() => dispatch(localActions.gotoQuantity())}>이전</StyledButton>
            <StyledButton blue>옵션 추가 완료</StyledButton>
          </div>
        </div>
      </div>
    </OptionBlock>
  );
};

const OptionBlock = styled.div`
  width: 100%;
  min-height: 583px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .intro_box {
    &:first-child {
      margin-bottom: 20px;
    }
    &:nth-child(2) {
      background-color: ${colors.blue[0]};
      .intro_title {
        color: ${colors.blue[2]};
      }
      .select_option {
        display: flex;
        align-items: center;
        color: ${colors.blue[1]};
        label {
          display: flex;
          align-items: center;
          margin-right: 24px;
          cursor: pointer;
          input {
            display: none;
          }
          span.styled_checkbox {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 4px;
            background: url(${CheckCircle[0].src}) no-repeat 50% / cover;
          }
          input:checked + span.styled_checkbox {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 4px;
            background: url(${CheckCircle[1].src}) no-repeat 50% / cover;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }

  .mo_info_box {
    display: none;
  }
  .quantity_form {
    width: 100%;
    display: flex;
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
          min-width: 104px;
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
          transform: translateY(130%);
          padding-left: 128px;
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
          }
        }
        .leverage_con {
          width: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          & > div {
            width: 100%;
            flex: 1;
            display: flex;
            &.select_leverage {
              justify-content: space-between;
              margin-right: 1rem;
              label {
                width: 50%;
                flex: 1;
                height: 48px;
                span {
                  width: 100%;
                  display: block;
                  cursor: pointer;
                  line-height: 46px;
                  text-align: center;
                  border-radius: 28px;
                  border: 1px solid ${colors.gray[3]};
                  color: ${colors.gray[5]};
                  transition: all 0.2s;
                  &:hover {
                    background-color: ${colors.gray[1]};
                  }
                }
                input {
                  display: none;
                }
                input:checked + span {
                  background-color: ${colors.blue[2]};
                  border-color: ${colors.blue[2]};
                  color: white;
                  &:hover {
                    background-color: ${colors.blue[1]};
                    border-color: ${colors.blue[1]};
                  }
                }
                &:first-child {
                  margin-right: 1rem;
                }
              }
            }
            &.leverage_input_box {
              max-width: 236px;
              height: 56px;
              align-items: center;
              justify-content: space-between;
              border: 1px solid ${colors.gray[2]};
              padding: 12px 16px;
              border-radius: 8px;

              input {
                width: 100%;
                flex: 1;
                border: none;
                text-align: center;
                font-size: 1rem;
                color: ${colors.gray[5]};
                &:focus {
                  outline: none;
                }
              }
              input::-webkit-inner-spin-button {
                appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
              }
              .button {
                min-width: 32px;
                height: 32px;
                cursor: pointer;
                transition: all 0.2s;
                &:hover {
                  opacity: 0.7;
                }
              }
            }
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
      button {
        padding: 0;
      }
      .message_btns {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
        button {
          width: 100%;
          margin-right: 0;
        }
      }
    }
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
            min-width: 176px;
            justify-content: space-between;
            .mo_info_box {
              cursor: pointer;
              position: relative;
              word-break: keep-all;
              display: flex;
              align-items: center;
              margin-left: 1rem;
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
  ${media.tablet} {
    .quantity_form {
      & > div {
        .write_quant_item {
          flex-direction: column;
          align-items: flex-start;
          .radio_title {
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
          }
        }
        button:first-child {
          margin-right: 0;
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
const CustomInput = styled.input`
  width: 100%;
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
export default Option;
