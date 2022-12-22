import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StrategyCon = () => {
  const { getBoardDone, loadBoardsDone, loadBoardsError } = useSelector(({ boards }: RootState) => ({
    getBoardDone: boards.getBoardDone,
    loadBoardsDone: boards.loadBoardsDone,
    loadBoardsError: boards.loadBoardsError,
  }));

  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!viewRef.current) return;

    if (getBoardDone?.content) {
      viewRef.current.innerHTML = getBoardDone?.content;
    }
  }, [getBoardDone]);
  console.log(getBoardDone);
  return (
    <StrategyConBlock>
      <div className="top">
        <div className="strategy">
          <div className="strategyItem">
            <div className="label">거래소</div>
            <div className="con">{getBoardDone?.strategy?.platform}</div>
          </div>
          <div className="strategyItem">
            <div className="label">대상종목</div>
            <div className="con">{getBoardDone?.strategy?.symbol}</div>
          </div>
          <div className="strategyItem">
            <div className="label">차트주기</div>
            <div className="con">{getBoardDone?.strategy?.chartCycle}</div>
          </div>
          <div className="strategyItem">
            <div className="label">누적 수익률</div>
            <div className={getBoardDone?.strategy?.profitPct < 0 ? 'con blue' : 'con red'}>
              {getBoardDone?.strategy?.profitPct}%
            </div>
          </div>
        </div>
        <div className="description">
          <div className="title">{getBoardDone?.title}</div>
          <div className="contents" ref={viewRef}></div>
        </div>
      </div>
    </StrategyConBlock>
  );
};

const StrategyConBlock = styled.div`
  width: 100%;
  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    align-items: flex-start;
    .strategy {
      width: 100%;
      max-width: 460px;
      margin-right: 20px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(114px, 1fr));
      grid-column-gap: 20px;
      -webkit-column-gap: 20px;
      column-gap: 20px;
      grid-row-gap: 20px;
      row-gap: 20px;
      padding: 40px;
      border-radius: 14px;
      background-color: ${colors.gray[0]};
      .strategyItem {
        .label {
          font-size: 14px;
          color: ${colors.gray[5]};
          margin-bottom: 8px;
        }
        .con {
          padding: 8px 1rem;
          background-color: white;
          border-radius: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &.red {
            color: ${colors.red[2]};
          }
          &.blue {
            color: ${colors.blue[2]};
          }
        }
      }
    }
    .description {
      flex: 1;
      background-color: ${colors.gray[0]};
      padding: 30px;
      min-height: 238px;
      border-radius: 14px;
      .title {
        color: ${colors.blue[2]};
        margin-bottom: 4px;
        word-break: keep-all;
      }
    }
  }

  ${media.tablet} {
    .top {
      flex-direction: column;
      .strategy {
        max-width: none;
        margin-right: 0;
        margin-bottom: 20px;
        padding: 20px;
      }
      .description {
        width: 100%;
        padding: 20px;
      }
    }
  }
`;

export default StrategyCon;
