import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StrategyLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { strategyCertifiedStrategy, strategyUserStrategy, strategyQuantroStrategy, strategyQuantroIndicator } =
    useSelector(({ local }: RootState) => ({
      strategyCertifiedStrategy: local.strategyCertifiedStrategy,
      strategyUserStrategy: local.strategyUserStrategy,
      strategyQuantroStrategy: local.strategyQuantroStrategy,
      strategyQuantroIndicator: local.strategyQuantroIndicator,
    }));
  return (
    <StrategyLayoutBlock className="container">
      <StrategyLayoutSpacer />
      <div className="strategy_top">
        <div className="strategy_tab">
          <div
            className={strategyCertifiedStrategy ? 'button on' : 'button'}
            onClick={() => router.push('/strategy?category=certified')}
          >
            퀀트로 인증전략
          </div>
          <div
            className={strategyUserStrategy ? 'button on' : 'button'}
            onClick={() => router.push('/strategy?category=user')}
          >
            사용자 전략
          </div>
          <div
            className={strategyQuantroStrategy ? 'button on' : 'button'}
            onClick={() => router.push('/strategy?category=quantro_strategy')}
          >
            공개 전략
          </div>
          <div
            className={strategyQuantroIndicator ? 'button on' : 'button'}
            onClick={() => router.push('/strategy?category=quantro_Indicator')}
          >
            공개 지표
          </div>
        </div>
      </div>
      {children}
    </StrategyLayoutBlock>
  );
};

const StrategyLayoutBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .strategy_top {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    .strategy_tab {
      display: flex;
      align-items: center;
      .button {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 20px;
        border-radius: 20px;
        background-color: ${colors.gray[1]};
        color: ${colors.gray[5]};
        margin-right: 1rem;
        transition: all 0.2s;
        &:last-child {
          margin-right: 0;
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
        &.error {
          background-color: ${colors.red[2]};
          color: white;
          &:hover {
            background-color: ${colors.red[1]};
          }
        }
      }
    }
  }
  ${media.tablet} {
    .strategy_top {
      display: none;
    }
  }
`;
const StrategyLayoutSpacer = styled.div`
  ${media.tablet} {
    width: 100%;
    height: 56px;
  }
`;
export default StrategyLayout;
