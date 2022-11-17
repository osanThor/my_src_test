import colors from '@/src/assets/Colors';
import { MainBanner, ArrowRightBlue } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const IndexLayout = () => {
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

              <Link href="/">
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

              <Link href="/">
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

              <Link href="/">
                <a>
                  더보기 <Image src={ArrowRightBlue} alt="arrow" />
                </a>
              </Link>
              <span className="description">사용자들의 전략을 확인해보세요</span>
            </div>
          </div>
          <div>
            <div className="main_top_con">
              <div className="main_tit">전략토론</div>

              <Link href="/">
                <a>
                  더보기 <Image src={ArrowRightBlue} alt="arrow" />
                </a>
              </Link>
              <span className="description">커뮤니티에서 자유롭게 토론을 나눠보세요</span>
            </div>
          </div>
          <div>
            <div className="main_top_con">
              <div className="main_tit">공개 전략 / 지표</div>

              <Link href="/">
                <a>
                  더보기 <Image src={ArrowRightBlue} alt="arrow" />
                </a>
              </Link>
              <span className="description">퀀트로에서 제공하는 전략과 지표를 확인해보세요.</span>
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
