import colors from '@/src/assets/Colors';
import { Profile1 } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const PositionItem = () => {
  return (
    <PositionItemBlock>
      <div className="positionItem_con">
        <div className="exchange_logo">
          <Image src={Profile1[1]} alt="exchange logo" layout="fill" />
        </div>
        <div className="position_info">
          <div className="position_info_row">
            <span className="dark smFont">USDT</span>
            <span className="value bold bigFont dark">16,325.51</span>
          </div>
          <div className="position_info_row">
            <span>0.00%</span>
            <span className="value bold">O USD</span>
          </div>
          <div className="position_more_info">
            <div className="position_info_row">
              <span>투자금액</span>
              <span className="value dark">16,324.9 USD</span>
            </div>
            <div className="position_info_row">
              <span className="dark">평가자산</span>
              <span className="value dark bold">16,324.9 USD</span>
            </div>
            <div className="position_info_row">
              <span>현재가격</span>
              <span className="value">1 USD</span>
            </div>
            <div className="position_info_row">
              <span>평균진입가</span>
              <span className="value">1 USD</span>
            </div>
          </div>
        </div>
      </div>
      <div className="positionItem_button">
        <StyledButton>포지션 종료</StyledButton>
      </div>
    </PositionItemBlock>
  );
};

const PositionItemBlock = styled.div`
  background-color: ${colors.gray[1]};
  padding: 32px 40px;
  border-radius: 14px;
  .positionItem_con {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .exchange_logo {
      width: 64px;
      height: 64px;
      position: relative;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 32px;
    }
    .position_info {
      flex: 1;
      .position_info_row {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 18px;
        color: ${colors.gray[3]};
        &:last-child {
          margin-bottom: 0;
        }
        &:nth-child(2n) {
          margin-bottom: 24px;
        }
        .smFont {
          font-size: 16px;
        }
        .bigFont {
          font-size: 20px;
        }
        .dark {
          color: ${colors.dark[1]};
        }
        .bold {
          font-family: 'GmarketSansBold';
        }
      }
    }

    .position_more_info {
      height: 0;
      overflow: hidden;
      opacity: 0;
      transition: all 0.2s;
    }
  }
  .positionItem_button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  ${media.tablet} {
    padding: 20px;
  }
  ${media.mobile} {
    .positionItem_con {
      .exchange_logo {
        width: 40px;
        height: 40px;
        margin-right: 8px;
      }
      .position_info {
        flex: 1;
        .position_info_row {
          margin-bottom: 8px;
          font-size: 14px;
          color: ${colors.gray[3]};
          &:last-child {
            margin-bottom: 0;
          }
          &:nth-child(2n) {
            margin-bottom: 16px;
          }
          .smFont {
            font-size: 14px;
          }
          .bigFont {
            font-size: 16px;
          }
        }
      }
    }
  }
`;

const StyledButton = styled(Button)`
  width: 114px;
  height: 36px;
  padding: 0;
  background-color: white;
  border: 1px solid ${colors.gray[5]};
  color: ${colors.dark[1]};
  border-radius: 8px;

  ${media.tablet} {
    min-height: auto;
  }
`;

export default PositionItem;
