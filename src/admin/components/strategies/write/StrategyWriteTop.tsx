import colors from '@/src/assets/Colors';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const StrategyWriteTop = () => {
  const router = useRouter();
  return (
    <StrategyWriteTopBlock>
      <div className="title">공개 전략/지표 등록</div>
      <div className="boardTop">
        <div className="admin_tab">
          <div
            className={router.query.category === 'PUBLIC' ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/strategies/write?category=PUBLIC')}
          >
            공개전략
          </div>
          <div
            className={router.query.category === 'INDICATOR' ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/strategies/write?category=INDICATOR')}
          >
            공개지표
          </div>
        </div>
      </div>
    </StrategyWriteTopBlock>
  );
};
const StrategyWriteTopBlock = styled.div`
  width: 100%;
  margin-bottom: 20px;
  .boardTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .admin_tab {
      display: flex;
      align-items: center;
      .menu {
        padding: 4px 1rem;
        background-color: ${colors.blue[0]};
        border-radius: 24px;
        color: ${colors.blue[2]};
        cursor: pointer;
        margin-right: 1rem;
        transition: all 0.2s;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          background-color: ${colors.blue[2]};
          color: white;
        }
        &.on {
          background-color: ${colors.blue[2]};
          color: white;
        }
      }
    }
  }
`;

export default StrategyWriteTop;
