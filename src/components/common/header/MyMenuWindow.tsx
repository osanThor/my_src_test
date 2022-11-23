import colors from '@/src/assets/Colors';
import { EditIcon, LangKr, LogOutIcon, ProfileEditIcon } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { userActions } from '@/src/store/reducers';
import AuthService from '@/src/utils/auth_service';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const MyMenuWindow = ({ MyMenuRef }: { MyMenuRef: any }) => {
  const authService = new AuthService();
  const dispatch = useDispatch();
  const router = useRouter();
  const { isDark } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
  }));
  const handleLogOut = () => {
    authService.userLogOut(dispatch);
    router.push('/auth/login');
  };

  const handleChangeTheme = () => {
    dispatch(userActions.changeTheme({ isDark }));
    dispatch(userActions.changeThemeStatus({ isDark: !isDark }));
    localStorage.setItem('isDark', JSON.stringify(!isDark));
  };

  return (
    <MyMenuWindowBlock ref={MyMenuRef}>
      <div className="menuItem">
        <span>내정보 변경</span>
        <Link href="/mypage">
          <a className="menuBtn">
            <Image src={ProfileEditIcon} alt="profile edit" />
          </a>
        </Link>
      </div>
      <div className="menuItem">
        <span>게시글 변경</span>
        <Link href="/mypage">
          <a className="menuBtn">
            <Image src={EditIcon} alt="edit" />
          </a>
        </Link>
      </div>
      <div className="menuItem">
        <span>언어</span>
        <Image src={LangKr} alt="change lang" />
      </div>
      <div className="menuItem">
        <span>화이트 / 다크 버전</span>
        <label className="switch">
          <input
            className="switchBtn theme"
            onChange={handleChangeTheme}
            type="checkbox"
            name="isDark"
            checked={isDark}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="menuItem">
        <span>주문 확인창 띄우기</span>
        <label className="switch">
          <input className="switchBtn" type="checkbox" name="exposed" />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="menuItem">
        <span>로그아웃</span>
        <div className="menuBtn" onClick={handleLogOut}>
          <Image src={LogOutIcon} alt="edit" />
        </div>
      </div>
    </MyMenuWindowBlock>
  );
};

const MyMenuWindowBlock = styled.div`
  width: 290px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.bgColor};
  position: absolute;
  padding: 20px 32px;
  border-radius: 14px;
  top: 110%;
  right: 0;
  box-shadow: ${({ theme }) => theme.boxShadow};
  color: ${colors.gray[5]};
  display: flex;
  flex-direction: column;
  .menuItem {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    color: ${colors.gray[4]};
    align-items: center;
    margin-bottom: 4px;
    padding: 4px 0;

    span {
      transform: translateY(2px);
    }

    .menuBtn {
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: ${colors.gray[0]};
      border-radius: 50%;

      &:hover {
        background-color: ${colors.gray[1]};
      }
    }
    /* on off 스위치 */
    /* The switch - the box around the slider */
    .switch {
      position: relative;
      display: inline-block;
      width: 32px;
      height: 16px;
      vertical-align: middle;
    }
    /* Hide default HTML checkbox */
    .switch input {
      display: none;
    }
    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: white;
      border: 1px solid ${colors.gray[3]};
      border-radius: 20px;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
    .slider:before {
      position: absolute;
      content: '';
      height: 12px;
      width: 12px;
      left: 2px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      background-color: ${colors.gray[5]};
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
    input.switchBtn:checked + .slider {
    }
    input.switchBtn:focus + .slider {
    }
    input.switchBtn:checked + .slider:before {
      -webkit-transform: translate(14px, -50%);
      -ms-transform: translate(14px, -50%);
      transform: translate(14px, -50%);
      background-color: ${colors.blue[2]};
    }
    &:first-child img {
      transform: translateY(-2px);
    }
    &:last-child img {
      max-width: 18px !important;
      transform: translateY(-2px);
    }
  }
`;

export default React.memo(MyMenuWindow);
