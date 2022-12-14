import colors from '@/src/assets/Colors';
import { Profile1, ResetIcon } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const MyExchangeArea = ({ handleOpenSelectWin }: { handleOpenSelectWin: () => void }) => {
  return (
    <MyExchaingeAreaBlock className="my_exchainge_area">
      <div className="exchange_area">
        <div className="exchange_inner_area">
          <div className="exchange_logo">
            <Image src={Profile1[1]} alt="exchange logo" layout="fill" />
          </div>
          <div className="exchange_info">
            <div className="exchange_title">Bybit</div>
            <div className="replace_exchange_btn" onClick={handleOpenSelectWin}>
              <Image src={ResetIcon[1]} alt="change exchange button" />
            </div>
          </div>
        </div>
        <div className="exchange_another_area" id="point1">
          <div className="switch_box">
            <label className="switch">
              <input className="switchBtn" type="checkbox" name="moreInfo" />
              <span className="slider round"></span>
              <span className="txt">선물 보기</span>
            </label>
          </div>
          <div className="description_box">
            API를 등록한 거래소만 선택할 수 있어요
            <span>해당 거래소의 현물의 경우 퀀트로에서 API를 등록한 시점부터 적용돼요</span>
          </div>
        </div>
      </div>
      <div className="all_position_area">
        <div className="dashboard_top">
          <div className="dashboard_title">
            <span className="title">현물</span>총 포지션 현황
          </div>
        </div>
        <div className="position_con exchange">
          <div className="position_info">
            <div className="all_position_info">
              <div>투자금액</div>
              <span className="bold">16,324.51 USD (-0.02%)</span>
            </div>
            <div className="all_position_gainAndLoss">
              <div>평가손익</div>
              <span className="bold red">-2,95 USD</span>
            </div>
            <div className="all_position_gainAndLoss" id="point2">
              <div>보유자산</div>
              <span className="bold">30.0000 USD</span>
            </div>
          </div>
        </div>
      </div>
      <div className="all_gainAndLoss_area">
        <div className="dashboard_top">
          <div className="dashboard_title">
            <span className="title">현물</span>총 누적 평가손익
          </div>
          <div className="gainAndLoss_info" id="point3">
            287. 4980 <span>USDT</span>
          </div>
        </div>
        <div className="position_con graph">
          <div>그래프</div>
        </div>
      </div>
    </MyExchaingeAreaBlock>
  );
};

const MyExchaingeAreaBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;

  .all_position_area {
    width: 50%;
    max-width: 736px;
    margin-right: 20px;
  }
  .all_gainAndLoss_area {
    width: 50%;
    max-width: 748px;
    display: flex;
    flex-direction: column;
  }
  .dashboard_top {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    .dashboard_title {
      font-size: 20px;
      font-family: 'GmarketSansBold';
      font-weight: 800;
      span {
        font-family: 'GmarketSansBold';
        font-weight: 800;
        margin-right: 7px;
        color: ${colors.gray[5]};
      }
    }
    .gainAndLoss_info {
      font-size: 20px;
      font-weight: 800;
      font-family: 'GmarketSansBold';
      span {
        font-family: 'GmarketSansBold';
        font-weight: 800;
        color: ${colors.gray[5]};
      }
    }
  }
  .exchange_area {
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 40px;
    .exchange_inner_area {
      display: flex;
      .exchange_logo {
        width: 92px;
        height: 92px;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
        margin-right: 1rem;
      }
      .exchange_info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .exchange_title {
          min-width: 112px;
          font-size: 24px;
          font-family: 'GmarketSansBold';
          font-weight: 800;
        }
        .replace_exchange_btn {
          cursor: pointer;
          position: relative;
        }
      }
    }
    .switch_box {
      padding-left: 100px;
      margin-bottom: 20px;
      /* on off 스위치 */
      /* The switch - the box around the slider */
      .switch {
        position: relative;
        display: inline-block;
        width: 100px;
        height: 24px;
        vertical-align: middle;

        /* Hide default HTML checkbox */
        input {
          display: none;
        }
        span.txt {
          position: absolute;
          right: 5px;
          top: 3px;
          font-size: 14px;
        }
        /* The slider */
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${colors.gray[1]};
          border-radius: 20px;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }
        .slider:before {
          position: absolute;
          content: '';
          height: 18px;
          width: 18px;
          left: 2px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          background-color: ${colors.gray[3]};
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }
        input.switchBtn:checked + .slider:before {
          -webkit-transform: translate(75px, -50%);
          -ms-transform: translate(75px, -50%);
          transform: translate(75px, -50%);
          background-color: ${colors.blue[2]};
        }
      }
    }
    .description_box {
      width: 100%;
      position: relative;
      color: ${colors.gray[4]};
      font-size: 14px;
      white-space: nowrap;
      transform: translateY(5px);
      span {
        position: absolute;
        width: 100%;
        left: 0;
        top: 130%;
        color: ${colors.red[1]};
      }
    }
  }
  .position_con {
    background-color: ${colors.gray[1]};
    border-radius: 14px;

    &.exchange {
      padding: 2rem;
      display: flex;
      justify-content: space-between;

      .position_info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & > div {
          width: 100%;
          height: 44px;
          background-color: white;
          padding: 8px 1rem;
          border-radius: 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: ${colors.gray[3]};
          margin-bottom: 8px;
          &:last-child {
            margin-bottom: 0;
          }
          span.bold {
            font-family: 'GmarketSansBold';
            font-weight: 800;
            font-size: 20px;
            text-align: right;
            color: ${colors.dark[1]};

            &.red {
              color: ${colors.red[2]};
            }
          }
        }
      }
    }

    &.graph {
      padding: 18px 32px 20px;
      flex: 1;
    }
  }
  ${media.pc} {
    flex-direction: column;

    margin-bottom: 40px;
    .dis_p {
      display: none;
    }
    .dashboard_top {
      margin-bottom: 8px;
      flex-wrap: wrap;
      .dashboard_title {
        font-size: 18px;
      }
      .gainAndLoss_info {
        font-size: 18px;
      }
    }
    .exchange_area {
      margin-right: 0;
      margin-bottom: 50px;
      padding-top: 0;
      .exchange_inner_area {
        .exchange_logo {
          width: 56px;
          height: 56px;
        }
        .exchange_info {
          .exchange_title {
            min-width: auto;
          }
          .replace_exchange_btn {
            cursor: pointer;
            position: relative;
          }
        }
      }
      .exchange_inner_area {
        margin-bottom: 1rem;
      }
      .switch_box {
        padding-left: 0;
        margin-bottom: 1rem;
      }
      .description_box {
        white-space: inherit;
        span {
          font-size: 12px;
          top: 110%;
        }
      }
    }
    .all_position_area {
      width: 100%;
      max-width: none;
      max-height: none;
      margin-bottom: 40px;
    }
    .all_gainAndLoss_area {
      width: 100%;
      max-width: none;
      max-height: none;
    }
    .position_con {
      &.exchange {
        padding: 2rem;
        flex-direction: column;

        .position_info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          & > div {
            width: 100%;
            height: auto;
            background-color: white;
            padding: 8px 1rem;
            border-radius: 22px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: ${colors.gray[3]};
            &:first-child {
              margin-bottom: 8px;
            }
            & > div {
              min-width: 63px;
            }
            span.bold {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
  ${media.tablet} {
    margin-bottom: 40px;
    .dashboard_top {
      flex-direction: column;
      flex-wrap: wrap;
      .dashboard_title {
        font-size: 16px;
      }
      .gainAndLoss_info {
        font-size: 16px;
      }
    }
    .all_position_area {
      width: 100%;
      max-width: none;
      max-height: none;
      margin-right: 0;
      margin-bottom: 40px;
    }
    .all_gainAndLoss_area {
      width: 100%;
      max-width: none;
      max-height: none;
    }
    .position_con {
      &.exchange {
        padding: 20px;
        flex-direction: column;
      }
    }
  }
`;

export default MyExchangeArea;
