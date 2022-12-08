import { AlramIcon, ApiKeyMenu, Logo, LogOutIcon, MyDefaultIcon, ResetIcon } from '@/src/assets/Images';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '@/src/store/configureStore';
import colors from '@/src/assets/Colors';
import { useRouter } from 'next/router';
import AuthService from '@/src/utils/auth_service';
import { media } from '@/styles/theme';
import AlramWindow from './AlramWindow';
import MyMenuWindow from './MyMenuWindow';
import GnbMenu from './GnbMenu';

const Header = () => {
  const authService = new AuthService();
  const dispatch = useDispatch();
  const { isDark, photoUrl } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
    photoUrl: user.photoUrl,
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
  const MyMenuButtonRef = useRef<HTMLDivElement>(null);
  const MyMenuRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleHeadModal = (e: any) => {
    if (openAlram) {
      if (AlramRef.current === e.target) {
        setOpenAlram(true);
      } else {
        setOpenAlram(false);
      }
    }
    if (openMenu) {
      const themeInput = document.querySelector('.switchBtn.theme');
      if (MyMenuRef.current === e.target || e.target.parentNode == themeInput.parentNode) {
        setOpenMenu(true);
      } else {
        setOpenMenu(false);
      }
    }
  };
  const handleClickOutSideHeader = (e: any) => {
    if (openAlram && !AlramRef.current.contains(e.target)) {
      setOpenAlram(false);
      return;
    }
    if (openMenu && !MyMenuRef.current.contains(e.target)) {
      if (!MyMenuButtonRef.current.contains(e.target)) {
        handleOpenMenu();
      }
      return;
    }
  };
  useEffect(() => {
    if (openAlram || openMenu) document.addEventListener('mousedown', handleClickOutSideHeader);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSideHeader);
    };
  });

  return (
    <HeaderBlock onClick={handleHeadModal}>
      <TopHeader>
        <div className="inner_header">
          <div className=""></div>
          <div className="header_con">
            <div className="headBtn">
              <Image src={ResetIcon[0]} alt="ResetIcon" />
              <span>다시</span>
            </div>
            <div style={{ position: 'relative' }}>
              <div className="headBtn alram" onClick={handleOpenAlram}>
                <Image src={AlramIcon[0]} alt="AlramIcon" />
                <span>알림</span>
              </div>
              {openAlram && <AlramWindow AlramRef={AlramRef} />}
            </div>
            <div style={{ position: 'relative' }}>
              <div
                ref={MyMenuButtonRef}
                className="headBtn blue"
                onClick={
                  hBtnTxt === '로그인'
                    ? () => {
                        router.push('/auth/login');
                      }
                    : () => {
                        handleOpenMenu();
                      }
                }
              >
                <Image
                  src={photoUrl && photoUrl != 'default.com' ? photoUrl : MyDefaultIcon}
                  style={
                    photoUrl && photoUrl != 'default.com' ? {} : { height: '100px', transform: 'translateY(-5px)' }
                  }
                  alt="MyDefaultIcon"
                  layout={photoUrl && photoUrl != 'default.com' ? 'fill' : 'intrinsic'}
                />
                <span className="txt">{hBtnTxt}</span>
              </div>
              {openMenu && <MyMenuWindow MyMenuRef={MyMenuRef} />}
            </div>
          </div>
        </div>
      </TopHeader>
      <GnbHeader>
        <div className="main_logo">
          <Link href="/">
            <a>
              <Image src={isDark ? Logo[1] : Logo[0]} alt="main_logo" />
            </a>
          </Link>
        </div>
        <div className="gnb">
          <GnbMenu />

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
    </HeaderBlock>
  );
};

const HeaderBlock = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 990;

  ${media.tablet} {
    display: none;
  }
`;
const TopHeader = styled.div`
  width: calc(100% - 228px);
  height: 80px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 990;
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 1rem 48px;
  .inner_header {
    max-width: 1504px;
    display: flex;
    justify-content: space-between;
    .search_place {
      width: 48px;
      height: 48px;
      background-color: ${colors.gray[0]};
      border-radius: 24px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .header_con {
      display: flex;
      .headBtn {
        width: 48px;
        height: 48px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: ${colors.gray[0]};
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        font-size: 10px;
        color: ${colors.gray[3]};
        transition: all 0.2s;
        margin-left: 12px;
        position: relative;

        &:hover {
          background-color: ${colors.gray[1]};
        }
        &.blue {
          background-color: ${colors.blue[2]};
          color: white;
          span {
            height: 100% !important;
          }
          span.txt {
            width: 100%;
            height: 15px !important;
            text-align: center;
            position: absolute;
            left: 50%;
            bottom: 3px;
            transform: translateX(-50%);
          }
          &:hover {
            background-color: ${colors.blue[1]};
          }
        }
      }
    }
  }
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
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: ${({ theme }) => theme.boxShadow};
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
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
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
        width: 24px;
        height: 24px;
        margin-right: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* transform: translateY(2px); */
      }
    }
  }
`;

export default React.memo(Header);
