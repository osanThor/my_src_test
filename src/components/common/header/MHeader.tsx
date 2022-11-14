import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '@/src/store/configureStore';
import colors from '@/src/assets/Colors';
import { useRouter } from 'next/router';
import AuthService from '@/src/utils/auth_service';
import { media } from '@/styles/theme';
import AlramWindow from './AlramWindow';
import MyMenuWindow from './MyMenuWindow';
import Link from 'next/link';
import Image from 'next/image';
import {
  AlramIcon,
  ApiKeyMenu,
  Logo,
  MMenuBar,
  LogOutIcon,
  Menu1,
  Menu2,
  Menu3,
  Menu4,
  Menu5,
  Menu6,
  MyDefaultIcon,
  ResetIcon,
  Profile1,
  SearchIcon,
} from '@/src/assets/Images';

const MHeader = () => {
  const authService = new AuthService();
  const dispatch = useDispatch();
  const { isDark } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
  }));
  const [btnWord, setBtnWord] = React.useState('');
  const [hBtnTxt, setHBtnTxt] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      setBtnWord('로그아웃');
      setHBtnTxt('MY');
    }
    if (user === null) {
      setBtnWord('로그인');
      setHBtnTxt('로그인');
    }
  }, []);

  const onClickHandler = () => {
    const user = localStorage.getItem('user');

    if (user) {
      authService.userLogOut(dispatch);
      setBtnWord('로그인');
      setHBtnTxt('로그인');
    }
    return router.push('/auth/login');
  };

  const AlramRef = useRef<HTMLDivElement>(null);
  const [openAlram, setOpenAlram] = useState(false);
  const handleOpenAlram = () => {
    setOpenAlram(!openAlram);
  };
  const MyMenuRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

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

  return (
    <MHeaderBlock>
      <MHeaderTop>
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
          <div className="alram">
            <Image src={AlramIcon[0]} alt="reset" />
          </div>
        </div>
      </MHeaderTop>
      <MHeaderTopSpacer />
      {openGnbMenu && (
        <MHeaderSideBlock ref={gnbMenuRef} onClick={handleClickMenuBack}>
          <div className={openGnbMenuEvent ? 'm_silde_menu on' : 'm_silde_menu'}>
            <div className="menu_top">
              <div className="profile">
                <div className="profile_image">
                  <Image src={Profile1[1]} alt="profile" />
                </div>
                <div className="profile_info">
                  <div className="nickName">부자부자</div>
                  <div className="api_key">이용권을 등로해주세요</div>
                </div>
              </div>
              <div className="close_btn" onClick={handleCloseGnbMenu}></div>
            </div>
          </div>
        </MHeaderSideBlock>
      )}
    </MHeaderBlock>
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
const MHeaderTop = styled.div`
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

    &.on {
      left: 0;
    }

    .menu_top {
      width: 100%;
      display: flex;
      justify-content: space-between;

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
            margin-bottom: 4px;
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
    }
  }
`;

export default MHeader;
