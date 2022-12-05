import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StrategyMenu = () => {
  const router = useRouter();
  const { strategyCertifiedStrategy, strategyUserStrategy, strategyQuantroStrategy, strategyQuantroIndicator } =
    useSelector(({ local }: RootState) => ({
      strategyCertifiedStrategy: local.strategyCertifiedStrategy,
      strategyUserStrategy: local.strategyUserStrategy,
      strategyQuantroStrategy: local.strategyQuantroStrategy,
      strategyQuantroIndicator: local.strategyQuantroIndicator,
    }));
  return (
    <StrategyMenuBlock>
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
    </StrategyMenuBlock>
  );
};

const StrategyMenuBlock = styled.div`
  width: 100%;
  height: 56px;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.gray[1]};
  background-color: ${({ theme }) => theme.bgColor};
  overflow-x: auto;
  white-space: nowrap;

  .button {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 8px 16px;
    border-radius: 20px;
    background-color: ${colors.gray[1]};
    color: ${colors.gray[5]};
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }

    &.on {
      background-color: ${colors.blue[2]};
      color: white;
    }
    &.error {
      background-color: ${colors.red[2]};
      color: white;
    }
  }
`;

export default StrategyMenu;
