import colors from '@/src/assets/Colors';
import { Rank } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { indexActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PctStrategy from './ranking/PctStrategy';
import PctTrader from './ranking/PctTrader';
import PopStrategy from './ranking/PopStrategy';
import ProTrader from './ranking/ProTrader';

const IndexRanking = () => {
  const dispatch = useDispatch();
  const { rankIsPopStr, rankIsProStr, rankIsPctTra, rankIsProTra } = useSelector(({ index }: RootState) => ({
    rankIsPopStr: index.rankIsPopStr,
    rankIsProStr: index.rankIsProStr,
    rankIsPctTra: index.rankIsPctTra,
    rankIsProTra: index.rankIsProTra,
  }));

  useEffect(() => {
    dispatch(indexActions.isRankPopStra());
  }, []);
  return (
    <IndexRankingBlock>
      <div className="tabs">
        <div className={rankIsPopStr ? 'tab on' : 'tab'} onClick={() => dispatch(indexActions.isRankPopStra())}>
          인증전략 인기순위
        </div>
        <div className={rankIsProStr ? 'tab on' : 'tab'} onClick={() => dispatch(indexActions.isRankProStra())}>
          인증전략 수익률
        </div>
        <div className={rankIsPctTra ? 'tab on' : 'tab'} onClick={() => dispatch(indexActions.isRankPctTra())}>
          트레이더 수익률
        </div>
        <div className={rankIsProTra ? 'tab on' : 'tab'} onClick={() => dispatch(indexActions.isRankProTra())}>
          트레이더 수익금
        </div>
      </div>
      {rankIsPopStr && <PopStrategy />}
      {rankIsProStr && <PctStrategy />}
      {rankIsPctTra && <PctTrader />}
      {rankIsProTra && <ProTrader />}
    </IndexRankingBlock>
  );
};

const IndexRankingBlock = styled.div`
  flex: 1;
  width: 100%;
  padding: 24px 14px;
  background-color: ${colors.gray[0]};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  .tabs {
    width: 100%;
    display: flex;
    overflow-x: auto;
    font-size: 12px;
    margin-bottom: 20px;
    .tab {
      cursor: pointer;
      padding: 4px 20px;
      background-color: ${colors.gray[2]};
      color: ${colors.gray[5]};
      border-radius: 20px;
      transition: all 0.2s;
      white-space: nowrap;
      &.on {
        background-color: ${colors.blue[2]};
        color: white;
      }
      &:hover {
        background-color: ${colors.blue[2]};
        color: white;
      }
    }
    & > div + div {
      margin-left: 0.5rem;
    }
  }
  .ri {
    width: 100%;
    flex: 1;
    position: relative;
    .rankItem {
      width: 120px;
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      .user {
        cursor: pointer;
        width: 100%;
        margin-bottom: 7px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .photo {
          transition: all 0.2s;
          position: relative;
          width: 100%;
          max-width: 84px;
          height: 84px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 4px;
        }
        .nickname {
          font-size: 12px;
          color: ${colors.gray[5]};
          text-align: center;
        }
      }
      .startegy_title {
        cursor: pointer;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
      .count {
        width: 100%;
        font-size: 12px;
        color: ${colors.blue[2]};
        text-align: center;
      }
      &:nth-child(1) {
        width: 202px;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 8;
        .user {
          .photo {
            max-width: 202px;
            height: 202px;
            box-shadow: 0 0 10px ${colors.blue[2]};
          }
        }
        &::before {
          content: '';
          width: 86px;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          z-index: 7;
          top: 0;
          right: 0;
          background: url(${Rank[0].src}) no-repeat 50% / cover;
          transform: translateY(-50%);
        }
      }
      &:nth-child(2) {
        width: 178px;
        left: 10%;
        bottom: 0;
        .user {
          .photo {
            max-width: 178px;
            height: 178px;
          }
        }
        &::before {
          content: '';
          width: 35px;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          z-index: 7;
          top: 0;
          left: 5px;
          background: url(${Rank[1].src}) no-repeat 50% / cover;
        }
      }
      &:nth-child(3) {
        width: 166px;
        bottom: 0;
        right: 10%;
        .user {
          .photo {
            max-width: 166px;
            height: 166px;
          }
        }
        &::before {
          content: '';
          width: 35px;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          z-index: 7;
          top: 0;
          left: 5px;
          background: url(${Rank[2].src}) no-repeat 50% / cover;
        }
      }
    }
  }
  ${media.pc} {
    .ri {
      .rankItem {
        .user {
          .photo {
          }
          .nickname {
          }
        }
        .startegy_title {
        }
        .count {
        }
        &:nth-child(1) {
          width: 160px;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 8;
          .user {
            .photo {
              max-width: 160px;
              height: 160px;
              box-shadow: 0 0 10px ${colors.blue[2]};
            }
          }
          &::before {
          }
        }
        &:nth-child(2) {
          width: 140px;
          left: 0;
          .user {
            .photo {
              max-width: 140px;
              height: 140px;
            }
          }
          &::before {
          }
        }
        &:nth-child(3) {
          width: 120px;
          right: 0;
          .user {
            .photo {
              max-width: 120px;
              height: 120px;
            }
          }
          &::before {
          }
        }
      }
    }
  }
  ${media.tablet} {
    padding: 1rem;
    min-height: 320px;
    .ri {
      .rankItem {
        .user {
          .photo {
          }
          .nickname {
          }
        }
        .startegy_title {
        }
        .count {
        }
        &:nth-child(1) {
          width: 160px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 8;
          .user {
            .photo {
              max-width: 160px;
              height: 160px;
              box-shadow: 0 0 10px ${colors.blue[2]};
            }
          }
          &::before {
          }
        }
        &:nth-child(2) {
          width: 140px;
          left: 20%;
          .user {
            .photo {
              max-width: 140px;
              height: 140px;
            }
          }
          &::before {
          }
        }
        &:nth-child(3) {
          width: 120px;
          right: 23%;
          .user {
            .photo {
              max-width: 120px;
              height: 120px;
            }
          }
          &::before {
          }
        }
      }
    }
  }
  ${media.mobile} {
    padding: 1rem;
    min-height: 290px;
    .ri {
      .rankItem {
        .user {
          .photo {
          }
          .nickname {
          }
        }
        .startegy_title {
        }
        .count {
        }
        &:nth-child(1) {
          width: 130px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 8;
          .user {
            .photo {
              max-width: 130px;
              height: 130px;
              box-shadow: 0 0 10px ${colors.blue[2]};
            }
          }
          &::before {
          }
        }
        &:nth-child(2) {
          width: 110px;
          left: 10%;
          .user {
            .photo {
              max-width: 110px;
              height: 110px;
            }
          }
          &::before {
          }
        }
        &:nth-child(3) {
          width: 100px;
          right: 10%;
          .user {
            .photo {
              max-width: 100px;
              height: 100px;
            }
          }
          &::before {
          }
        }
      }
    }
  }
  ${media.custom(445)} {
    padding: 1rem;
    min-height: 290px;
    .ri {
      .rankItem {
        .user {
          .photo {
          }
          .nickname {
          }
        }
        .startegy_title {
        }
        .count {
        }
        &:nth-child(1) {
          width: 110px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 8;
          .user {
            .photo {
              max-width: 110px;
              height: 110px;
              box-shadow: 0 0 10px ${colors.blue[2]};
            }
          }
          &::before {
            width: 40px;
            height: 30px;
          }
        }
        &:nth-child(2) {
          width: 90px;
          left: 0%;
          .user {
            .photo {
              max-width: 90px;
              height: 90px;
            }
          }
          &::before {
            left: 0;
            transform: translate(-10%, -10%);
          }
        }
        &:nth-child(3) {
          width: 80px;
          right: 0;
          .user {
            .photo {
              max-width: 80px;
              height: 80px;
            }
          }
          &::before {
            width: 30px;
            height: 30px;
            left: 0;
            transform: translate(-10%, -10%);
          }
        }
      }
    }
  }
`;

export default IndexRanking;
