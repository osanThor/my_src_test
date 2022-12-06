import colors from '@/src/assets/Colors';
import { MainBanner, ArrowRightBlue } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const IndexLayout = () => {
  const {
    loadGetCertifiedDone,
    loadGetRankDone,
    loadGetUserStrategyDone,
    loadGetDiscussionDone,
    loadGetQuantroStrategyDone,
    loadBoardsLoading,
    CertifiedDone,
    RankDone,
    UserStrategyDone,
    DiscussionDone,
    QuantroStrategyDone,
  } = useSelector(({ index }: RootState) => ({
    loadGetCertifiedDone: index.loadGetCertifiedDone,
    loadGetRankDone: index.loadGetRankDone,
    loadGetUserStrategyDone: index.loadGetUserStrategyDone,
    loadGetDiscussionDone: index.loadGetDiscussionDone,
    loadGetQuantroStrategyDone: index.loadGetQuantroStrategyDone,
    loadBoardsLoading: index.loadBoardsLoading,
    CertifiedDone: index.CertifiedDone,
    RankDone: index.RankDone,
    UserStrategyDone: index.UserStrategyDone,
    DiscussionDone: index.DiscussionDone,
    QuantroStrategyDone: index.QuantroStrategyDone,
  }));
  return (
    <IndexLayoutBlock>
      <div className="main_banner">
        <Image src={MainBanner} alt="main_banner" />
        <div className="banner_txt">안전하고 손쉬운 투자의 기준, 퀀트로</div>
      </div>
      <div className="main_con">
        <div className="main_top">
          <div className="strategy">
            <div className="main_top_con">
              <div className="main_tit">
                퀀트로 인증전략 <span className="dis_p">퀀트로에서 인증한 전략을 확인해보세요. </span>
              </div>

              <Link href="/strategy?category=certified">
                <a>
                  더보기 <Image src={ArrowRightBlue} alt="arrow" />
                </a>
              </Link>
              <span className="description dis_m">사용자들의 전략을 확인해보세요</span>
            </div>
          </div>
          <div className="lank">
            <div className="main_top_con">
              <div className="main_tit">랭킹</div>

              <Link href="/community?category=rank">
                <a>
                  더보기 <Image src={ArrowRightBlue} alt="arrow" />
                </a>
              </Link>
              <span className="description dis_m">퀀트로에서 랭크를 확인해보세요.</span>
            </div>
          </div>
        </div>
        <div className="main_bottom">
          <div>
            <div className="main_top_con">
              <div className="main_tit">사용자 전략</div>

              <Link href="/strategy?category=user">
                <a>
                  더보기 <Image src={ArrowRightBlue} alt="arrow" />
                </a>
              </Link>
              <span className="description">사용자들의 전략을 확인해보세요</span>
            </div>
            <div className="main_bottom_con">
              {loadGetUserStrategyDone.boards.map((board) => (
                <div className="item" key={board.id}>
                  <div className="title">
                    {board.title}
                    <span className="count">{board._count.comments}</span>
                  </div>
                  <div className="item_bot">
                    <span className="nickname">{board.user.nickname}</span>
                    <Moment format="YYYY.MM.DD">{board.createdAt}</Moment>
                    <div className="hits">조회 {board.hits}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="main_top_con">
              <div className="main_tit">전략토론</div>

              <Link href="/community?category=discussion">
                <a>
                  더보기 <Image src={ArrowRightBlue} alt="arrow" />
                </a>
              </Link>
              <span className="description">커뮤니티에서 자유롭게 토론을 나눠보세요</span>
            </div>
            <div className="main_bottom_con">
              {loadGetDiscussionDone.boards.slice(0, 3).map((board) => (
                <div className="item" key={board.id}>
                  <div className="title">
                    {board.title}
                    <span className="count">{board._count.comments}</span>
                  </div>
                  <div className="item_bot">
                    <span className="nickname">{board.user.nickname}</span>
                    <Moment format="YYYY.MM.DD">{board.createdAt}</Moment>
                    <div className="hits">조회 {board.hits}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="main_top_con">
              <div className="main_tit">공개 전략 / 지표</div>

              <Link href="/strategy?category=quantro_strategy">
                <a>
                  더보기 <Image src={ArrowRightBlue} alt="arrow" />
                </a>
              </Link>
              <span className="description">퀀트로에서 제공하는 전략과 지표를 확인해보세요.</span>
            </div>
            <div className="main_bottom_con">
              {loadGetQuantroStrategyDone.boards.map((board) => (
                <div className="item" key={board.id}>
                  <div className="title">
                    {board.title}
                    <span className="count">{board._count.comments}</span>
                  </div>
                  <div className="item_bot">
                    <span className="nickname">{board.user.nickname}</span>
                    <Moment format="YYYY.MM.DD">{board.createdAt}</Moment>
                    <div className="hits">조회 {board.hits}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </IndexLayoutBlock>
  );
};

const IndexLayoutBlock = styled.div`
  width: 100%;
  height: 100%;

  .dis_p {
    display: inline-block;
  }
  .dis_m {
    display: none;
  }

  .main_banner {
    width: 100%;
    position: relative;
    margin-bottom: 63px;
    .banner_txt {
      word-break: keep-all;
      position: absolute;
      font-weight: 800;
      font-size: 40px;
      color: white;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      font-family: 'GmarketSansBold';
    }
  }
  .main_con {
    padding: 0 48px 160px;
    & > div {
      max-width: 1504px;
    }
  }

  .main_top_con {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    .main_tit {
      font-size: 18px;
      color: ${colors.gray[5]};

      span {
        font-size: 14px;
        color: ${colors.blue[2]};
        margin-left: 1rem;
      }
    }
    a {
      font-size: 14px;
      color: ${colors.blue[2]};
      display: flex;
      align-items: center;
      transition: all 0.2s;

      span {
        transform: translateY(-2px);
        margin-left: 6.19px !important;
      }

      &:hover {
        opacity: 0.7;
      }
    }
    span.description {
      width: 100%;
      font-size: 14px;
      color: ${colors.blue[2]};
      margin-top: 0.3rem;
    }
  }

  .main_bottom_con {
    display: flex;
    flex-direction: column;
    margin-bottom: 29px;
    .item {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 7px 0;
      border-bottom: 1px solid ${colors.gray[2]};
      .title {
        width: 100%;
        font-size: 14px;
        text-overflow: ellipsis;
        span.count {
          color: ${colors.blue[2]};
          margin-left: 8px;
        }
      }
      .item_bot {
        width: 100%;
        font-size: 14px;
        display: flex;
        color: ${colors.gray[4]};
        span.nickname {
          color: ${colors.gray[5]};
          margin-right: 8px;
        }
        time {
          margin-right: 8px;
        }
      }
    }
  }

  .main_top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;

    .strategy {
      width: 55%;
      max-width: 811px;
    }
    .lank {
      width: 45%;
      max-width: 645px;
    }
  }
  .main_bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;

    & > div {
      width: 33.333%;
      max-width: 470px;
    }
  }

  ${media.tablet} {
    .dis_p {
      display: none;
    }
    .dis_m {
      display: block;
    }
    .main_banner {
      width: 100%;
      margin-bottom: 20px;
      .banner_txt {
        font-size: 20px;
      }
    }

    .main_con {
      padding: 0 1rem 200px;
      .main_top {
        flex-direction: column;
        margin-bottom: 0;
        .strategy {
          width: 100%;
          max-width: none;
        }
        .lank {
          width: 100%;
          max-width: none;
        }
      }
      .main_bottom {
        flex-direction: column;

        & > div {
          width: 100%;
          max-width: none;
        }
      }
    }
  }
`;

export default IndexLayout;
