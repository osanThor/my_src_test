import colors from '@/src/assets/Colors';
import {
  Daumcafe,
  Facebook,
  Kakaotalk,
  Naverblog,
  Navercafe,
  Profile1,
  Telegram,
  Tistory,
  Twitter,
  Youtube,
} from '@/src/assets/Images';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CertifiedItem = ({
  board,
}: {
  board: {
    id: number;
    title: string;
    hits: number;
    createdAt: string;
    deletedAt: string;
    user: {
      nickname: string;
      styles: Array<{
        name: string;
      }> | null;
      photoUrl: string | null;
    };
    strategy: {
      calcMdd: number;
      calcProfitPct: number;
      calcWinningPct: number;
      communities: Array<{ channel: string | null; url: string | null }> | null;
    };
    _count: {
      comments: number | null;
    };
  };
}) => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [ele, setEle] = useState<HTMLDivElement>();
  let pos = { top: 0, left: 0, x: 0, y: 0 };
  useEffect(() => {
    const ele = scrollRef.current;
    if (!ele) {
      return;
    }
    setEle(ele);
  }, [scrollRef]);

  const mouseDownHandler = function (e: any) {
    if (!ele) {
      return;
    }
    ele.style.userSelect = 'none';
    pos = {
      // The current scroll
      left: ele.scrollLeft,
      top: ele.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };
  const mouseMoveHandler = function (e: any) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
  };
  const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    ele.style.removeProperty('user-select');
  };
  return (
    <CertifiedItemBlock
      className="certified_box"
      onClick={() => router.push(`/board/${board?.id}?state=strategy&category=CERTIFIED_STRATEGY`)}
    >
      <div className="top">
        <div className="user">
          <div className="photo">
            <Image src={board?.user?.photoUrl ? board?.user?.photoUrl : Profile1[1]} alt="profile" layout="fill" />
          </div>
          <div className="nickname">{board.user?.nickname}</div>
        </div>
      </div>
      <div className="mid">
        <div className="strategy_tit">{board?.title}</div>
        <Chart
          series={[
            {
              data: [21, 22, 10],
            },
          ]}
          height={180}
          type="bar"
          options={{
            chart: {
              height: 180,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                columnWidth: '45%',
                distributed: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            xaxis: {
              categories: ['MDD', '수익률', '승률'],
              labels: {
                style: {
                  fontFamily: 'GmarketSans',
                  fontSize: '12px',
                },
              },
            },
          }}
        />
      </div>
      <div className="styles" onMouseDown={mouseDownHandler} ref={scrollRef}>
        {board?.user?.styles.map((st) => {
          if (st.name === 'SCALPING') {
            return (
              <div key={st.name} className="style">
                <span>#스캘핑</span>
              </div>
            );
          } else if (st.name === 'SHORT_HIT') {
            return (
              <div key={st.name} className="style">
                <span>#단타</span>
              </div>
            );
          } else if (st.name === 'SWING') {
            return (
              <div key={st.name} className="style">
                <span>#스윙</span>
              </div>
            );
          } else if (st.name === 'TREND') {
            return (
              <div key={st.name} className="style">
                <span>#추세매매</span>
              </div>
            );
          } else if (st.name === 'R_TREND') {
            return (
              <div key={st.name} className="style">
                <span>#역추세매매</span>
              </div>
            );
          }
        })}
      </div>
      <div className="strate_title">
        {board?.title}
        <span>{board?._count?.comments}</span>
      </div>
      <div className="communities">
        <div className="commu">홍보센터</div>
        <div className="commu_list">
          {board?.strategy?.communities?.map((cm) => (
            <a className="community" key={cm.url} href={cm.url} target="_blank" rel="noreferrer noopener">
              {cm.channel === 'NAVER_BLOG' && <Image src={Naverblog} alt="naver_blog" />}
              {cm.channel === 'NAVER_CAFE' && <Image src={Navercafe} alt="naver_cafe" />}
              {cm.channel === 'DAUM_CAFE' && <Image src={Daumcafe} alt="DAUM_CAFE" />}
              {cm.channel === 'TISTORY' && <Image src={Tistory} alt="TISTORY" />}
              {cm.channel === 'KAKAOTALK' && <Image src={Kakaotalk} alt="KAKAOTALK" />}
              {cm.channel === 'YOUTUBE' && <Image src={Youtube} alt="YOUTUBE" />}
              {cm.channel === 'TELEGRAM' && <Image src={Telegram} alt="TELEGRAM" />}
              {cm.channel === 'TWITTER' && <Image src={Twitter} alt="TWITTER" />}
              {cm.channel === 'FACEBOOK' && <Image src={Facebook} alt="FACEBOOK" />}
            </a>
          ))}
        </div>
      </div>
    </CertifiedItemBlock>
  );
};

const CertifiedItemBlock = styled.div`
  &.certified_box {
    cursor: pointer;
    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 8px;

      .user {
        display: flex;
        align-items: center;
        font-size: 14px;

        .photo {
          position: relative;
          width: 20px;
          min-width: 20px;
          height: 20px;
          margin-right: 8px;
          border-radius: 50%;
          overflow: hidden;
        }
        .nickname {
          transform: translateY(1px);
        }
      }
      .count {
        font-size: 12px;
        color: ${colors.gray[4]};
        span {
          color: ${colors.gray[5]};
        }
      }
    }
    .mid {
      width: 100%;
      background-color: ${colors.gray[0]};
      border-radius: 14px;
      margin-bottom: 8px;
      padding: 12px 8px 8px;
      .strategy_tit {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        margin-bottom: 8px;
      }
      .description {
        width: 100%;
        color: ${colors.gray[5]};
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;

        display: -webkit-box;
        -webkit-line-clamp: 2; // 원하는 라인수
        -webkit-box-orient: vertical;
      }
    }
    .styles {
      width: 100%;
      margin-bottom: 12px;
      flex: 1;
      display: flex;
      overflow-x: scroll;
      overflow: -moz-scrollbars-none;
      -ms-overflow-style: none;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
      }
      .style {
        height: 28px;
        border-radius: 14px;
        padding: 4px 12px;
        font-size: 14px;
        border: 1px solid ${colors.blue[2]};
        color: ${colors.blue[2]};
        white-space: nowrap;
        margin-left: 8px;
        &:first-child {
          margin-left: 0;
        }
      }
    }
    & > .strate_title {
      font-size: 14px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      white-space: nowrap;
      overflow: hidden;
      margin-bottom: 10px;
      span {
        color: ${colors.blue[2]};
      }
    }
    .communities {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .commu {
        font-size: 14px;
        height: 20px;
        color: ${colors.gray[5]};
      }
      .commu_list {
        display: flex;
        align-items: center;
        .community {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
`;

export default CertifiedItem;
