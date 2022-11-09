import { Logo, Menu1, Menu2, Menu3, Menu4, Menu5, Menu6 } from '@/src/assets/Images';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '@/src/store/configureStore';
import colors from '@/src/assets/Colors';

const Header = ({ children }: { children: React.ReactNode }) => {
  const { isDark } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
  }));

  return (
    <HeaderBlock>
      <TopHeader />
      <TopHeaderSpacer />
      <GnbHeader>
        <div className="main_logo">
          <Link href="/">
            <a>
              <Image src={isDark ? Logo[1] : Logo[0]} alt="main_logo" />
            </a>
          </Link>
        </div>
        <div className="gnb">
          <div className="gnb_menu">
            <Link href="/">
              <a>
                <div className="headerIcon" />
                <span>대시보드</span>
              </a>
            </Link>
          </div>
          <div className="gnb_menu">
            <Link href="/">
              <a>
                <div className="headerIcon" />
                <span>퀀트작성</span>
              </a>
            </Link>
          </div>
          <div className="gnb_menu">
            <Link href="/">
              <a>
                <div className="headerIcon" />
                <span>이용권 등록 / API Key</span>
              </a>
            </Link>
          </div>
          <div className="gnb_menu">
            <Link href="/">
              <a>
                <div className="headerIcon" />
                <span>주문내역 / 에러 메세지</span>
              </a>
            </Link>
          </div>
          <div className="gnb_menu">
            <Link href="/">
              <a>
                <div className="headerIcon" />
                <span>마이페이지</span>
              </a>
            </Link>
          </div>
          <div className="gnb_menu">
            <Link href="/">
              <a>
                <div className="headerIcon" />
                <span>커뮤니티</span>
              </a>
            </Link>
          </div>
        </div>
      </GnbHeader>
      <MainContainer>
        <GnbHeaderSpacer />
        {children}
      </MainContainer>
    </HeaderBlock>
  );
};

const HeaderBlock = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const TopHeader = styled.div`
  width: calc(100% - 228px);
  height: 80px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 990;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;
const TopHeaderSpacer = styled.div`
  width: 100%;
  height: 80px;
`;
const GnbHeader = styled.div`
  width: 228px;
  height: 100%;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  border-right: 1px solid #e9eaec;
  z-index: 991;

  .main_logo {
    width: 100%;
    height: 80px;
    padding: 1rem 20px;

    a {
      display: block;
      position: relative;
    }
  }
  .gnb {
    width: 100%;
    padding: 1rem 1rem 3rem;
    .gnb_menu {
      width: 100%;
      margin-bottom: 12px;
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
      }
    }
  }
`;
const GnbHeaderSpacer = styled.div`
  width: 228px;
  height: 100%;
`;
const MainContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;

  & > div:nth-child(2) {
    flex: 1;
  }
`;

export default Header;
