import {
  AlramIcon,
  ApiKeyMenu,
  Logo,
  LogOutIcon,
  Menu1,
  Menu2,
  Menu3,
  Menu4,
  Menu5,
  Menu6,
  MyDefaultIcon,
  ResetIcon,
  SearchIcon,
} from '@/src/assets/Images';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '@/src/store/configureStore';
import colors from '@/src/assets/Colors';
import { useRouter } from 'next/router';
import AuthService from '@/src/utils/auth_service';

const Header = ({ children }: { children: React.ReactNode }) => {
  const authService = new AuthService();
  const dispatch = useDispatch();
  const { isDark } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
  }));
  const [btnWord, setBtnWord] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) setBtnWord('로그아웃');
    if (user === null) setBtnWord('로그인');
  }, []);

  const onClickHandler = () => {
    const user = localStorage.getItem('user');

    if (user) {
      authService.userLogOut(dispatch);
      setBtnWord('로그인');
    } else {
      return router.push('/auth/login');
    }
  };
  return (
    <HeaderBlock>
      <TopHeader>
        <div className="search_place">
          <Image src={SearchIcon} alt="search" />
        </div>
        <div className="header_con">
          <Image src={ResetIcon[0]} alt="ResetIcon" />
          <Image src={AlramIcon[0]} alt="AlramIcon" />
          <Image src={MyDefaultIcon} alt="MyDefaultIcon" />
        </div>
      </TopHeader>
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
          <div className="gnb_menu_list">
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
                  <span>전략</span>
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

          <div className="moreInfoBox">
            <Image src={isDark ? ApiKeyMenu[1] : ApiKeyMenu[0]} alt="menu box" />
            <Link href="/">
              <a className="cbksrh">More</a>
            </Link>
          </div>
        </div>
        <div className="headerBtn">
          <div style={{ cursor: 'pointer' }} onClick={onClickHandler}>
            <div>
              <Image src={LogOutIcon} alt="Sign" />
            </div>
            {btnWord}
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
  display: flex;
  padding: 1rem 140px 1rem 48px;
`;
const TopHeaderSpacer = styled.div`
  width: 100%;
  height: 80px;
`;
const GnbHeader = styled.div`
  width: 228px;
  height: 100%;
  display: flex;
  flex-direction: column;
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
    padding: 1rem 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    overflow-y: auto;

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
    .moreInfoBox {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      a.cbksrh {
        width: calc(100% - 30px);
        max-width: 104px;
        line-height: 40px;
        background-color: ${colors.blue[2]};
        color: white;
        position: absolute;
        left: 50%;
        bottom: 28px;
        transform: translateX(-50%);
        text-align: center;
        border-radius: 8px;
        transition: all 0.2s;
        &:hover {
          background-color: ${colors.blue[1]};
        }
      }
    }
  }

  .headerBtn {
    margin: 40px 24px 40px;
    & > div {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: ${colors.gray[5]};
      transition: all 0.2s;
      &:hover {
        opacity: 0.7;
      }

      & > div {
        width: 28px;
        height: 30px;
        margin-right: 12px;
        transform: translateY(2px);
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
