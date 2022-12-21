import colors from '@/src/assets/Colors';
import { Profile1, Rank } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Loading from '../../common/Loading';
import CustomSelect from './item/CustomSelect';

const RankLayout = () => {
  const router = useRouter();
  const { getRankingResult, loadBoardsLoading } = useSelector(({ boards }: RootState) => ({
    getRankingResult: boards.getRankingResult,
    loadBoardsLoading: boards.loadBoardsLoading,
  }));

  const [period, setPeriod] = useState('ALL');
  return (
    <>
      <RankLayoutBlock>
        <div className="title">
          <h2>랭킹 Area</h2>
          <CustomSelect place={period} setSearchName={setPeriod} />
        </div>
        <div className="rankArea">
          <div className="left">
            <div className="tit">퀀트로 인증전략 인기순위</div>
            <div className="topThree">
              {getRankingResult?.popularityStrategies?.slice(0, 3).map((strategy) => (
                <div className="rankItem" key={strategy?.board?.id}>
                  <div
                    className="user"
                    onClick={() =>
                      router.push(`/strategy/strategist?user=${strategy?.board?.user?.nickname}&category=discussion`)
                    }
                  >
                    <div className="photo">
                      <Image
                        src={strategy?.board?.user?.photoUrl ? strategy?.board?.user?.photoUrl : Profile1[1]}
                        alt="profile"
                        layout="fill"
                      />
                    </div>
                    <div className="nickname">{strategy?.board?.user?.nickname}</div>
                  </div>
                  <div className="startegy_title" onClick={() => router.push(`/board/${strategy?.board?.id}`)}>
                    {strategy?.board?.title}
                  </div>
                  <div className="count">
                    <span>{strategy?.board?._count?.likes}</span> / <span>{strategy?.board?._count?.collectors}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right">
            <div className="list">
              {getRankingResult?.popularityStrategies?.map((li, idx) => (
                <div className="listItem" key={li?.board?.id}>
                  <div className="num">{idx + 1}</div>
                  <div className="tit" onClick={() => router.push(`/board/${li?.board?.id}`)}>
                    {li?.board?.title}
                  </div>
                  <div
                    className="user"
                    onClick={() =>
                      router.push(`/strategy/strategist?user=${li?.board?.user?.nickname}&category=discussion`)
                    }
                  >
                    <div className="photo">
                      <Image src={li?.board?.user?.photoUrl} alt="profile" layout="fill" />
                    </div>
                    <div className="nickname">{li?.board?.user?.nickname}</div>
                  </div>
                  <div className="count">
                    <span>좋아요 {li?.board?._count?.likes}</span>
                    <span>컬렉션 {li?.board?._count?.collectors}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rankArea">
          <div className="left">
            <div className="tit">퀀트로 인증전략 수익률순위</div>
            <div className="topThree">
              {getRankingResult?.profitPctStrategies?.slice(0, 3).map((strategy) => (
                <div className="rankItem" key={strategy?.board?.id}>
                  <div className="user">
                    <div className="photo">
                      <Image
                        src={strategy?.board?.user?.photoUrl ? strategy?.board?.user?.photoUrl : Profile1[1]}
                        alt="profile"
                        layout="fill"
                      />
                    </div>
                    <div className="nickname">{strategy?.board?.user?.nickname}</div>
                  </div>
                  <div className="startegy_title">{strategy?.board?.title}</div>
                  <div className="count">
                    <span>{strategy?.profitPct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right">
            <div className="list">
              {getRankingResult?.profitPctStrategies?.map((li, idx) => (
                <div className="listItem" key={li?.board?.id}>
                  <div className="num">{idx + 1}</div>
                  <div className="tit">{li?.board?.title}</div>
                  <div className="user">
                    <div className="photo">
                      <Image src={li?.board?.user?.photoUrl} alt="profile" layout="fill" />
                    </div>
                    <div className="nickname">{li?.board?.user?.nickname}</div>
                  </div>
                  <div className="count">
                    <span>수익률: {li?.profitPct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rankArea">
          <div className="left">
            <div className="tit">트레이더 수익률 순위</div>
            <div className="topThree">
              {getRankingResult?.profitPctTraders?.slice(0, 3).map((td, idx) => (
                <div className="rankItem" key={idx}>
                  <div className="user">
                    <div className="photo">
                      <Image
                        src={
                          td?.user?.photoUrl && td?.user?.photoUrl != 'quantro.net' ? td?.user?.photoUrl : Profile1[1]
                        }
                        alt="profile"
                        layout="fill"
                      />
                    </div>
                    <div className="nickname">{td?.user?.nickname}</div>
                  </div>
                  <div className="count">
                    <span>{td?.totalProfit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right">
            <div className="list">
              {getRankingResult?.profitPctTraders?.map((li, idx) => (
                <div className="listItem" key={idx}>
                  <div className="num">{idx + 1}</div>
                  <div className="tit">{li?.user?.nickname}</div>
                  <div className="user">
                    <div className="photo">
                      <Image
                        src={
                          li?.user?.photoUrl && li?.user?.photoUrl != 'quantro.net' ? li?.user?.photoUrl : Profile1[1]
                        }
                        alt="profile"
                        layout="fill"
                      />
                    </div>
                    <div className="nickname">{li?.user?.nickname}</div>
                  </div>
                  <div className="count">
                    <span>수익률: {li?.totalProfit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rankArea">
          <div className="left">
            <div className="tit">트레이더 수익금 순위</div>
            <div className="topThree">
              {getRankingResult?.profitTraders?.slice(0, 3).map((td, idx) => (
                <div className="rankItem" key={idx}>
                  <div className="user">
                    <div className="photo">
                      <Image
                        src={
                          td?.user?.photoUrl && td?.user?.photoUrl != 'quantro.net' ? td?.user?.photoUrl : Profile1[1]
                        }
                        alt="profile"
                        layout="fill"
                      />
                    </div>
                    <div className="nickname">{td?.user?.nickname}</div>
                  </div>
                  <div className="count">
                    <span>{td?.profit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right">
            <div className="list">
              {getRankingResult?.profitTraders?.map((li, idx) => (
                <div className="listItem" key={idx}>
                  <div className="num">{idx + 1}</div>
                  <div className="tit">{li?.user?.nickname}</div>
                  <div className="user">
                    <div className="photo">
                      <Image
                        src={
                          li?.user?.photoUrl && li?.user?.photoUrl != 'quantro.net' ? li?.user?.photoUrl : Profile1[1]
                        }
                        alt="profile"
                        layout="fill"
                      />
                    </div>
                    <div className="nickname">{li?.user?.nickname}</div>
                  </div>
                  <div className="count">
                    <span>수익률: {li?.profit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RankLayoutBlock>
    </>
  );
};

const RankLayoutBlock = styled.div`
  width: 100%;
  min-height: 400px;
  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h2 {
      font-size: 1.125rem;
    }
  }
  & > div + div {
    margin-bottom: 48px;
  }
  .rankArea {
    width: 100%;
    display: flex;
    .left {
      width: 40%;
      margin-right: 20px;
      .tit {
        margin-bottom: 20px;
      }
      .topThree {
        display: flex;
        justify-content: center;
        position: relative;
        min-height: 200px;
        .rankItem {
          width: 120px;
          max-width: 33%;
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
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            .user {
              .photo {
                max-width: 100px;
                height: 100px;
                box-shadow: 0 0 10px ${colors.blue[2]};
              }
            }
            &::before {
              content: '';
              width: 60px;
              height: 60px;
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
            top: 50%;
            left: 10%;
            transform: translateY(-50%);
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
            top: 50%;
            right: 10%;
            transform: translateY(-50%);
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
    }
    .right {
      width: 60%;
      .list {
        width: 100%;
        height: 100%;
        max-height: 244px;
        overflow-y: auto;
        background-color: ${colors.gray[0]};
        overflow: -moz-scrollbars-none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera*/
        }
        .listItem {
          width: 100%;
          min-height: 48px;
          display: flex;
          align-items: center;
          padding: 7px;
          & > div {
            height: 20px;
          }
          .num {
            width: 5%;
            text-align: center;
            font-family: 'GmarketSansBold';
            margin-right: 1rem;
          }
          .tit {
            cursor: pointer;
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .user {
            cursor: pointer;
            width: 20%;
            display: flex;
            align-items: center;
            .photo {
              width: 20px;
              min-width: 20px;
              position: relative;
              height: 20px;
              border-radius: 50%;
              overflow: hidden;
              margin-right: 0.5rem;
            }
            .nickname {
              font-size: 14px;
              white-space: nowrap;
              color: ${colors.gray[5]};
            }
          }
          .count {
            height: 20px;
            width: 20%;
            display: flex;
            align-content: center;
            justify-content: center;
            flex-wrap: wrap;
            span + span {
              margin-left: 7px;
            }
            span {
              height: 20px;
              color: ${colors.blue[2]};
              font-size: 14px;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
  ${media.tablet} {
    .rankArea {
      flex-direction: column;
      .left {
        width: 100%;
      }
      .right {
        width: 100%;
      }
    }
  }
  ${media.mobile} {
    .rankArea {
      flex-direction: column;
      .left {
        width: 100%;
        .topThree {
          display: flex;
          justify-content: center;
          position: relative;
          min-height: 200px;
          .rankItem {
            &:nth-child(2) {
              left: 0;
            }
            &:nth-child(3) {
              right: 0;
            }
          }
        }
      }
      .right {
        width: 100%;
        .list {
          .listItem {
            .user {
              width: auto;
              margin-right: 7px;
            }
            .count {
              width: auto;
              span + span {
                margin: 0;
              }
            }
          }
        }
      }
    }
  }
`;

export default RankLayout;
