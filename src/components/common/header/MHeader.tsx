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
  PencilIcon,
} from '@/src/assets/Images';
import MMenuWindow from './MMenuWindow';
import GnbMenu from './GnbMenu';
import DashBoardMenu from './mobileHeaderAdded/DashBoardMenu';
import WriteQuantMenu from './mobileHeaderAdded/WriteQuantMenu';
import MessageMenu from './mobileHeaderAdded/MessageMenu';
import MyPageMenu from './mobileHeaderAdded/MyPageMenu';
import CommunityMenu from './mobileHeaderAdded/CommunityMenu';
import MWriteHeader from './MWriteHeader';
import MBoardHeader from './MBoardHeader';
import StrategyMenu from './mobileHeaderAdded/StrategyMenu';
import LicensesMenu from './mobileHeaderAdded/LicensesMenu';
import MLicenseHeader from './MLicenseHeader';
import { adminAuthActions } from '@/src/store/reducers';
import Modal from '../modals/Modal';

const MHeader = () => {
  const authService = new AuthService();
  const dispatch = useDispatch();
  const { isDark, photoUrl, nickname, license } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
    photoUrl: user.photoUrl,
    nickname: user.nickname,
    license: user.license,
  }));
  const [btnWord, setBtnWord] = React.useState('');
  const [isAdmin, setIsAmdin] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const user = localStorage.getItem('user');
    const admin = localStorage.getItem('admin');

    if (user) {
      setBtnWord('로그아웃');
    }
    if (user === null) {
      if (admin) {
        setBtnWord('로그아웃');
        setIsAmdin(true);
      } else {
        setBtnWord('로그인');
        setIsAmdin(false);
      }
    }
  }, []);

  const onClickHandler = () => {
    const user = localStorage.getItem('user');
    const admin = localStorage.getItem('admin');

    if (user || admin) {
      if (user) {
        authService.userLogOut(dispatch);
      }
      setBtnWord('로그인');
      if (admin) {
        dispatch(adminAuthActions.adminLogout());
      }
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

  // 페이지별 추가 레이아웃
  const [dashBoard, setDashBoard] = useState(false);
  const [writeQuant, setWriteQuant] = useState(false);
  const [licenseIndex, setLicenseIndex] = useState(false);
  const [licenseSt, setLicense] = useState(false);
  const [message, setMessage] = useState(false);
  const [myPage, setMyPage] = useState(false);
  const [strategy, setStrategy] = useState(false);
  const [community, setCommunity] = useState(false);
  const [isWrite, setIsWrite] = useState(false);
  const [isBoard, setIsBoard] = useState(false);

  useEffect(() => {
    if (router.pathname === '/dashboard') {
      setDashBoard(true);
    } else {
      setDashBoard(false);
    }
    if (router.pathname === '/write-quant') {
      setWriteQuant(true);
    } else {
      setWriteQuant(false);
    }
    if (router.pathname === '/message') {
      setMessage(true);
    } else {
      setMessage(false);
    }
    if (router.pathname === '/licenses' && router.query.state === 'index') {
      console.log(router.query.state);
      setLicenseIndex(true);
    } else {
      setLicenseIndex(false);
    }
    if (router.pathname === '/licenses' && router.query.state != 'index') {
      setLicense(true);
    } else {
      setLicense(false);
    }
    if (router.pathname === '/mypage') {
      setMyPage(true);
    } else {
      setMyPage(false);
    }
    if (router.pathname === '/strategy') {
      setStrategy(true);
    } else {
      setStrategy(false);
    }
    if (router.pathname === '/community') {
      setCommunity(true);
    } else {
      setCommunity(false);
    }
    if (
      router.pathname === '/community/write' ||
      router.pathname === '/mypage/inquiries/write' ||
      router.pathname === '/mypage/inquiries/[qId]' ||
      router.pathname === '/strategy/strategist'
    ) {
      setIsWrite(true);
    } else {
      setIsWrite(false);
    }
    if (router.pathname === '/board/[bId]') {
      setIsBoard(true);
    } else {
      setIsBoard(false);
    }
  }, [router]);

  const [modalOpen, setModalOpen] = useState(false);
  const handleOnClose = () => {
    setModalOpen(false);
  };
  const handleCommission = () => {
    if (router.pathname === '/community' && router.query.category === 'commission') {
      if (!license || license?.package === 'BASIC') {
        setModalOpen(true);
        return;
      } else {
        router.push('/community/write');
      }
    } else {
      router.push('/community/write');
    }
  };
  return (
    <>
      <MHeaderBlock>
        {isWrite || isBoard || licenseSt || (
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
              {dashBoard && (
                <div className="reset">
                  <Image src={ResetIcon[0]} alt="reset" />
                </div>
              )}
              <div className="alram" onClick={handleOpenAlram}>
                <Image src={AlramIcon[0]} alt="reset" />
              </div>
              {community && (
                <div className="write" onClick={handleCommission}>
                  <Image src={PencilIcon} alt="reset" />
                </div>
              )}
            </div>
            {dashBoard && <DashBoardMenu />}
            {writeQuant && <WriteQuantMenu />}
            {licenseIndex && <LicensesMenu />}
            {message && <MessageMenu />}
            {myPage && <MyPageMenu />}
            {strategy && <StrategyMenu />}
            {community && <CommunityMenu />}
          </MHeaderMain>
        )}
        {isWrite && <MWriteHeader />}
        {isBoard && <MBoardHeader />}
        {licenseSt && <MLicenseHeader />}
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
                    <div className="nickName">
                      {isAdmin ? <>'관리자'</> : <>{nickname ? nickname : '로그인 해주세요'}</>}
                    </div>
                    <div className="api_key">
                      {!license && '이용권을 등록해주세요'}
                      {license && <>{Array.isArray(license) ? '' : 'Quantro Basic Package'}</>}
                    </div>
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
              {btnWord != '로그인' && (
                <div className="menu profile_edit" onClick={handleOpenMenu}>
                  <div className="icon">
                    <Image src={ProfileEditIcon} alt="edit" />
                  </div>
                  설정
                </div>
              )}
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
      <Modal
        open={modalOpen}
        close={handleOnClose}
        message={'전략 개발 의뢰는 레귤러 패키지 이상부터 가능해요'}
        error={true}
      />
    </>
  );
};

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
  box-shadow: ${({ theme }) => theme.boxShadow};
  position: fixed;
  z-index: 997;

  .menu_bar {
    height: 20px;
    img {
      width: 20px;
    }
  }
  .main_logo {
    max-width: 120px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
            font-weight: 800;
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

export default React.memo(MHeader);
