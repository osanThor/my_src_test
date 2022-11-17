import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

const Balance = () => {
  return (
    <BalanceLayout id="balance">
      <span className="tit dis_m">현재 계좌 잔고</span>
      <BalanceBlock>
        <span className="tit dis_p">현재 계좌 잔고</span>
        <div className="balance_price">
          0.00075383 KRW <span className="btc dis_p">BTC = 48.619.04</span>
        </div>
      </BalanceBlock>
      <span className="btc dis_m">BTC = 48.619.04</span>
    </BalanceLayout>
  );
};
const BalanceLayout = styled.div`
  margin-bottom: 31px;
  .dis_m {
    display: none;
  }
  ${media.tablet} {
    margin-bottom: 40px;
    .dis_m {
      display: inline-block;
    }
    .dis_p {
      display: none;
    }
    .tit {
      font-weight: 800;
      /* font-family: GmarketSansBold; */
      font-size: 16px;
      color: ${colors.blue[2]};
      margin-bottom: 8px;
    }
    span.btc {
      width: 100%;
      text-align: right;
      color: ${colors.blue[1]};
      margin-top: 8px;
    }
  }
`;
const BalanceBlock = styled.div`
  width: 100%;
  background-color: ${colors.blue[2]};
  padding: 1rem 40px;
  border-radius: 14px;
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  span.tit {
    font-size: 24px;
    /* transform: translateY(2px); */
  }
  .balance_price {
    font-weight: 800;
    /* font-family: GmarketSansBold; */
    font-size: 26px;
    letter-spacing: 2px;
    span.btc {
      margin-left: 40px;
      font-family: 'GmarketSansmedium';
      font-size: 18px;
      color: ${colors.blue[1]};
      letter-spacing: 0;
    }
  }
  ${media.pc} {
    display: flex;
    flex-wrap: wrap;
    .balance_price {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  ${media.tablet} {
    padding: 16px;
    .balance_price {
      justify-content: flex-end;
      font-size: 20px;
    }
  }
`;

export default Balance;
