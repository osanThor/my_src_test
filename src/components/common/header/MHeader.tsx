import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '@/src/store/configureStore';
import colors from '@/src/assets/Colors';
import { useRouter } from 'next/router';
import AuthService from '@/src/utils/auth_service';
import { media } from '@/styles/theme';
import AlramWindow from './AlramWindow';
import Link from 'next/link';
import Image from 'next/image';
import {
  AlramIcon,
  Logo,
  MMenuBar,
  LogOutIcon,
  ResetIcon,
  Profile1,
  ArrowLeft,
  MApiKeyMenu,
  ProfileEditIcon,
} from '@/src/assets/Images';
import MMenuWindow from './MMenuWindow';
import GnbMenu from './GnbMenu';

const MHeader = () => {
  const authService = new AuthService();
  const dispatch = useDispatch();
  const { isDark, photoUrl, nickname, licenses } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
    photoUrl: user.photoUrl,
    nickname: user.nickname,
    licenses: user.licenses,
  }));
  const [btnWord, setBtnWord] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      setBtnWord('로그아웃');
    }
    if (user === null) {
      setBtnWord('로그인');
    }
  }, []);

  const onClickHandler = () => {
    const user = localStorage.getItem('user');

    if (user) {
      authService.userLogOut(dispatch);
      setBtnWord('로그인');
    }
    return router.push('/auth/login');
  };

  const AlramRef = useRef<HTMLDivElement>(null);
  const [openAlram, setOpenAlram] = useState(false);
  const handleOpenAlram = () => {
    setOpenAlram(!openAlram);
  };
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(true);
  };
  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  // gnb menu open event
  const [openGnbMenu, setOpenGnbMenu] = useState(false);
  const [openGnbMenuEvent, setOpenGnbMenuEvent] = useState(false);
  const gnbMenuRef = useRef<HTMLDivElement>(null);

  const handleOpenGnbMenu = () => {
    setOpenGnbMenu(true);
    setTimeout(() => {
      setOpenGnbMenuEvent(true);
    }, 30);
  };
  const handleCloseGnbMenu = () => {
    setOpenGnbMenu(false);
    setOpenGnbMenuEvent(false);
  };

  const handleClickMenuBack = (e: any) => {
    if (gnbMenuRef.current === e.target) {
      handleCloseGnbMenu();
    }
  };

  const [dashBoard, setDashBoard] = useState(false);

  useEffect(() => {
    if (router.pathname === '/dashboard') {
      setDashBoard(true);
    } else {
      setDashBoard(false);
    }
  }, []);

  return (
    <MHeaderBlock>
      <MHeaderMain>
        <div className="menu_bar">
          <Image src={MMenuBar} alt="menu" onClick={handleOpenGnbMenu} />
        </div>
        <div className="main_logo">
          <Link href="/">
            <a>
              <Image src={isDark ? Logo[1] : Logo[0]} alt="main_logo" />
            </a>
          </Link>
        </div>
        <div className="menu_right">
          <div className="reset">
            <Image src={ResetIcon[0]} alt="reset" />
          </div>
          <div className="alram" onClick={handleOpenAlram}>
            <Image src={AlramIcon[0]} alt="reset" />
          </div>
        </div>
        {dashBoard && <DashBoardMenu />}
      </MHeaderMain>
      <MHeaderTopSpacer />
      {openGnbMenu && (
        <MHeaderSideBlock ref={gnbMenuRef} onClick={handleClickMenuBack}>
          <div className={openGnbMenuEvent ? 'm_silde_menu on' : 'm_silde_menu'}>
            <div className="menu_top">
              <div className="profile">
                <div className="profile_image">
                  <Image
                    src={photoUrl && photoUrl != 'default.com' ? photoUrl : Profile1[1]}
                    alt="profile"
                    layout={photoUrl && photoUrl != 'default.com' ? 'fill' : 'intrinsic'}
                  />
                </div>
                <div className="profile_info">
                  <div className="nickName">{nickname ? nickname : '로그인 해주세요'}</div>
                  <div className="api_key">이용권을 등록해주세요</div>
                </div>
              </div>
              <div className="close_btn" onClick={handleCloseGnbMenu}>
                <Image src={ArrowLeft} alt="back button" />
              </div>
            </div>
            <div className="gnb">
              <GnbMenu />
              <div className="moreInfoBox">
                <Image src={isDark ? MApiKeyMenu[1] : MApiKeyMenu[0]} alt="menu box" />
                <Link href="/">
                  <a className="cbksrh">More</a>
                </Link>
              </div>
            </div>
            <div className="menu profile_edit" onClick={handleOpenMenu}>
              <div className="icon">
                <Image src={ProfileEditIcon} alt="edit" />
              </div>
              설정
            </div>
            <div className="menu logOut" onClick={onClickHandler}>
              <div className="icon">
                <Image src={LogOutIcon} alt="logOut" />
              </div>
              {btnWord}
            </div>
          </div>
        </MHeaderSideBlock>
      )}
      {openMenu && <MMenuWindow handleCloseMenu={handleCloseMenu} />}
    </MHeaderBlock>
  );
};

const DashBoardMenu = () => {
  const [point1, setPoint1] = useState(true);
  const [point2, setPoint2] = useState(false);
  const [point3, setPoint3] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', scrollTracker);
    return () => {
      window.removeEventListener('scroll', scrollTracker); //clean up
    };
  }, []);
  function scrollTracker() {
    if (window.scrollY < 509) {
      setPoint1(true);
      setPoint2(false);
      setPoint3(false);
    } else if (window.scrollY < 633) {
      setPoint1(false);
      setPoint2(true);
      setPoint3(false);
    } else {
      setPoint1(false);
      setPoint2(false);
      setPoint3(true);
    }
  }
  return (
    <DashBoardMenuBlock>
      <a className={point1 ? 'on' : ''} href="#point1">
        총 포지션 현황
      </a>
      <a className={point2 ? 'on' : ''} href="#point2">
        총 누적 평가손익
      </a>
      <a className={point3 ? 'on' : ''} href="#point3">
        현재 계좌 잔고
      </a>
    </DashBoardMenuBlock>
  );
};

const DashBoardMenuBlock = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.gray[1]};
  background-color: ${({ theme }) => theme.bgColor};
  overflow-x: auto;
  a {
    width: 33.333%;
    min-width: 107px;
    line-height: 37px;
    font-size: 14px;
    text-align: center;
    color: ${colors.gray[3]};
    white-space: nowrap;
    position: relative;
    &.on {
      font-family: 'GmarketSansBold';
      color: ${colors.blue[2]};
      &::after {
        content: '';
        width: 100%;
        height: 2px;
        background-color: ${colors.blue[2]};
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
`;

const MHeaderBlock = styled.div`
  width: 100%;
  position: relative;
  z-index: 990;
  display: none;
  ${media.tablet} {
    display: block;
  }
`;
const MHeaderMain = styled.div`
  width: 100%;
  height: 50px;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
  position: fixed;
  z-index: 997;

  .menu_bar {
    width: 62px;
    height: 20px;
    img {
      width: 20px;
    }
  }
  .main_logo {
    max-width: 120px;
  }
  .menu_right {
    display: flex;
    align-items: center;

    & > div {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 1rem;
      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

const MHeaderTopSpacer = styled.div`
  height: 50px;
`;

const MHeaderSideBlock = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 997;
  top: 0;
  left: 0;
  backdrop-filter: blur(10px);

  .m_silde_menu {
    width: 100%;
    max-width: 300px;
    padding: 12px 1rem 50px;
    height: 100%;
    position: absolute;
    top: 0;
    left: -100%;
    background-color: ${({ theme }) => theme.bgColor};
    transition: all 0.5s ease-in-out;
    overflow-y: auto;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }

    &.on {
      left: 0;
    }

    .menu_top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      .profile {
        display: flex;
        align-items: center;

        .profile_image {
          width: 40px;
          height: 40px;
          position: relative;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 4px;
        }
        .profile_info {
          flex: 1;
          .nickName {
            font-family: 'GmarketSansBold';
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .api_key {
            font-size: 14px;
            color: ${colors.blue[2]};
          }
        }
      }
      .close_btn {
        width: 18px;
        height: 18px;
      }
    }
    .gnb {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;

      .moreInfoBox {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-bottom: 20px;

        a.cbksrh {
          width: calc(100% - 76px);
          max-width: 104px;
          line-height: 40px;
          background-color: ${colors.blue[2]};
          color: white;
          position: absolute;
          left: 50%;
          bottom: 20px;
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
    .menu {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      color: ${colors.gray[5]};
      .icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 20px !important;
        }
      }
    }
  }
`;

export default MHeader;
