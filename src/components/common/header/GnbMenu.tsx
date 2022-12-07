import colors from '@/src/assets/Colors';
import { Menu1, Menu2, Menu3, Menu4, Menu5, Menu6, Menu7 } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const GnbMenu = () => {
  const router = useRouter();

  const pathName = router.pathname;
  // headHightLight
  const [dashboard, setDachBoard] = useState(false);
  const [writeQuant, setWriteQuant] = useState(false);
  const [licenses, setLicenses] = useState(false);
  const [message, setMessage] = useState(false);
  const [strategy, setStrategy] = useState(false);
  const [community, setCommunity] = useState(false);
  const [center, setCenter] = useState(false);

  useEffect(() => {
    if (pathName === '/dashboard') {
      setDachBoard(true);
      setWriteQuant(false);
      setLicenses(false);
      setMessage(false);
      setStrategy(false);
      setCommunity(false);
      setCenter(false);
    } else if (pathName === '/write-quant') {
      setDachBoard(false);
      setWriteQuant(true);
      setLicenses(false);
      setMessage(false);
      setStrategy(false);
      setCommunity(false);
      setCenter(false);
    } else if (pathName === '/licenses') {
      setDachBoard(false);
      setWriteQuant(false);
      setLicenses(true);
      setMessage(false);
      setStrategy(false);
      setCommunity(false);
      setCenter(false);
    } else if (pathName === '/message') {
      setDachBoard(false);
      setWriteQuant(false);
      setLicenses(false);
      setMessage(true);
      setStrategy(false);
      setCommunity(false);
      setCenter(false);
    } else if (pathName === '/strategy' || pathName === '/strategy/strategist') {
      setDachBoard(false);
      setWriteQuant(false);
      setLicenses(false);
      setMessage(false);
      setStrategy(true);
      setCommunity(false);
      setCenter(false);
    } else if (pathName === '/community' || pathName === '/community/write' || pathName === '/community/board/[bId]') {
      setDachBoard(false);
      setWriteQuant(false);
      setLicenses(false);
      setMessage(false);
      setStrategy(false);
      setCommunity(true);
      setCenter(false);
    } else if (pathName === '/center') {
      setDachBoard(false);
      setWriteQuant(false);
      setLicenses(false);
      setMessage(false);
      setStrategy(false);
      setCommunity(false);
      setCenter(true);
    }
  }, [router]);

  return (
    <>
      <GnbMenuList className="gnb_menu_list">
        <div className="gnb_menu">
          <Link href="/dashboard">
            <a className={dashboard ? 'on' : ''}>
              <div className="headerIcon" />
              <span>대시보드</span>
            </a>
          </Link>
        </div>
        <div className="gnb_menu">
          <Link href="/write-quant">
            <a className={writeQuant ? 'on' : ''}>
              <div className="headerIcon" />
              <span>퀀트작성</span>
            </a>
          </Link>
        </div>
        <div className="gnb_menu">
          <Link href="/licenses?state=index">
            <a className={licenses ? 'on' : ''}>
              <div className="headerIcon" />
              <span>이용권 등록 / API Key</span>
            </a>
          </Link>
        </div>
        <div className="gnb_menu">
          <Link href="/message">
            <a className={message ? 'on' : ''}>
              <div className="headerIcon" />
              <span>주문내역 / 에러 메세지</span>
            </a>
          </Link>
        </div>
        <div className="gnb_menu">
          <Link href="/strategy?category=certified">
            <a className={strategy ? 'on' : ''}>
              <div className="headerIcon" />
              <span>전략</span>
            </a>
          </Link>
        </div>
        <div className="gnb_menu">
          <Link href="/community?category=discussion">
            <a className={community ? 'on' : ''}>
              <div className="headerIcon" />
              <span>커뮤니티</span>
            </a>
          </Link>
        </div>
        <div className="gnb_menu">
          <Link href="/center">
            <a className={center ? 'on' : ''}>
              <div className="headerIcon" />
              <span>이용안내</span>
            </a>
          </Link>
        </div>
      </GnbMenuList>
    </>
  );
};

const GnbMenuList = styled.div`
  &.gnb_menu_list {
    .gnb_menu {
      width: 100%;
      margin-bottom: 8px;
      color: ${colors.gray[4]};

      &:last-child {
        margin-bottom: 0;
      }
      a {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        transition: all 0.2s;
        &.on {
          color: ${colors.blue[2]};
        }
        & > .headerIcon {
          width: 24px;
          height: 24px;
          margin-right: 12px;
        }
        & > span {
          transform: translateY(2px);
          font-size: 14px;
        }
      }
      &:nth-child(1) > a > .headerIcon {
        background: url(${Menu1[0].src}) no-repeat 50% / cover;
      }
      &:nth-child(2) > a > .headerIcon {
        background: url(${Menu2[0].src}) no-repeat 50% / cover;
      }
      &:nth-child(3) > a > .headerIcon {
        background: url(${Menu3[0].src}) no-repeat 50% / cover;
      }
      &:nth-child(4) > a > .headerIcon {
        background: url(${Menu4[0].src}) no-repeat 50% / cover;
      }
      &:nth-child(5) > a > .headerIcon {
        background: url(${Menu5[0].src}) no-repeat 50% / cover;
      }
      &:nth-child(6) > a > .headerIcon {
        background: url(${Menu6[0].src}) no-repeat 50% / cover;
      }
      &:nth-child(7) > a > .headerIcon {
        background: url(${Menu7[0].src}) no-repeat 50% / cover;
      }
      &:nth-child(1) > a.on > .headerIcon {
        background: url(${Menu1[1].src}) no-repeat 50% / cover;
      }
      &:nth-child(2) > a.on > .headerIcon {
        background: url(${Menu2[1].src}) no-repeat 50% / cover;
      }
      &:nth-child(3) > a.on > .headerIcon {
        background: url(${Menu3[1].src}) no-repeat 50% / cover;
      }
      &:nth-child(4) > a.on > .headerIcon {
        background: url(${Menu4[1].src}) no-repeat 50% / cover;
      }
      &:nth-child(5) > a.on > .headerIcon {
        background: url(${Menu5[1].src}) no-repeat 50% / cover;
      }
      &:nth-child(6) > a.on > .headerIcon {
        background: url(${Menu6[1].src}) no-repeat 50% / cover;
      }
      &:nth-child(7) > a.on > .headerIcon {
        background: url(${Menu7[1].src}) no-repeat 50% / cover;
      }
      &:hover {
        color: ${colors.blue[2]};
        &:nth-child(1) > a > .headerIcon {
          background: url(${Menu1[1].src}) no-repeat 50% / cover;
        }
        &:nth-child(2) > a > .headerIcon {
          background: url(${Menu2[1].src}) no-repeat 50% / cover;
        }
        &:nth-child(3) > a > .headerIcon {
          background: url(${Menu3[1].src}) no-repeat 50% / cover;
        }
        &:nth-child(4) > a > .headerIcon {
          background: url(${Menu4[1].src}) no-repeat 50% / cover;
        }
        &:nth-child(5) > a > .headerIcon {
          background: url(${Menu5[1].src}) no-repeat 50% / cover;
        }
        &:nth-child(6) > a > .headerIcon {
          background: url(${Menu6[1].src}) no-repeat 50% / cover;
        }
        &:nth-child(7) > a > .headerIcon {
          background: url(${Menu7[1].src}) no-repeat 50% / cover;
        }
      }
    }
  }
  ${media.tablet} {
    &.gnb_menu_list {
      width: 100%;
      margin-bottom: 20px;
      .gnb_menu {
        width: 100%;
        color: ${colors.gray[5]};
        margin-bottom: 0;
      }
    }
  }
`;

export default React.memo(GnbMenu);
