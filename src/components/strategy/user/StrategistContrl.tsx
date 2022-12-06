import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StrategistContrl = () => {
  const router = useRouter();
  const { getUserInfo } = useSelector(({ boards }: RootState) => ({
    getUserInfo: boards.getUserInfo,
  }));
  const { communityDiscussion, strategyUserStrategy } = useSelector(({ local }: RootState) => ({
    communityDiscussion: local.communityDiscussion,
    strategyUserStrategy: local.strategyUserStrategy,
  }));
  return (
    <StrategistContrlBlock>
      <div
        className={communityDiscussion ? 'button on' : 'button'}
        onClick={() => router.push(`strategist?user=${getUserInfo.nickname}&category=discussion`)}
      >
        전략토론
      </div>
      <div
        className={strategyUserStrategy ? 'button on' : 'button'}
        onClick={() => router.push(`strategist?user=${getUserInfo.nickname}&category=user`)}
      >
        전략가
      </div>
    </StrategistContrlBlock>
  );
};

const StrategistContrlBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
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
  ${media.mobile} {
    .button {
      width: 50%;
      text-align: center;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default StrategistContrl;
