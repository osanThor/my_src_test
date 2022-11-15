import colors from '@/src/assets/Colors';
import { Profile1, ResetIcon } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const MyExchangeArea = () => {
  return (
    <MyExchaingeAreaBlock className="my_exchainge_area">
      <div className="all_position_area">
        <div className="dashboard_top">
          <div className="dashboard_title">총 포지션 현황</div>
        </div>
        <div className="position_con exchange">
          <div className="exchange_area">
            <div className="exchange_logo">
              <Image src={Profile1[1]} alt="exchange logo" layout="fill" />
            </div>
            <div className="exchange_info">
              <div className="exchange_title">Bybit</div>
              <div className="replace_exchange_btn">
                <Image src={ResetIcon[1]} alt="change exchange button" />
              </div>
            </div>
          </div>
          <div className="position_info">
            <div className="all_position_info">
              <div>
                <span className="dis_p">총 포지션</span> 금액비율
              </div>
              <span className="bold">16,324.51 USD</span>
            </div>
            <div className="all_position_gainAndLoss">
              <div>
                <span className="dis_p">총 포지션</span> 평가손익
              </div>
              <span className="bold red">-2,95 USD (-0.02%)</span>
            </div>
          </div>
        </div>
      </div>
      <div className="all_gainAndLoss_area">
        <div className="dashboard_top">
          <div className="dashboard_title">총 누적 평가손익</div>
          <div className="gainAndLoss_info">
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
  margin-bottom: 31px;

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
    }
    .gainAndLoss_info {
      font-size: 20px;
      font-family: 'GmarketSansBold';
      span {
        font-family: 'GmarketSansBold';
        color: ${colors.gray[5]};
      }
    }
  }
  .position_con {
    background-color: ${colors.gray[1]};
    border-radius: 14px;

    &.exchange {
      padding: 44px 40px;
      display: flex;
      justify-content: space-between;
      .exchange_area {
        margin-right: 1rem;
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
          }
          .replace_exchange_btn {
            cursor: pointer;
            position: relative;
          }
        }
      }
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
          &:first-child {
            margin-bottom: 8px;
          }
          span.bold {
            font-family: 'GmarketSansBold';
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
    .all_position_area {
      max-height: none;
    }
    .all_gainAndLoss_area {
    }
    .position_con {
      &.exchange {
        padding: 2rem;
        flex-direction: column;
        .exchange_area {
          margin-bottom: 1rem;
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
    flex-direction: column;
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
