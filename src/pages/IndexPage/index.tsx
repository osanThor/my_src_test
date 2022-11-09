import React from 'react';
import Button from '@/src/components/common/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';

import type { RootState } from '@/src/store/configureStore';
import { userActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import AuthService from '@/src/utils/auth_service';
import UserLayout from '@/src/components/layout/UserLayout';

const IndexPage: NextPage = () => {
  const authService = new AuthService();
  const dispatch = useDispatch();
  const { isDark, user, loadUserDone } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
    user: user.user,
    loadUserDone: user.loadUserDone,
  }));
  const onClick = () => {
    if (!user) {
      alert('로그인 해주세요');
      return;
    }
    dispatch(userActions.changeTheme({ isDark }));
    dispatch(userActions.changeThemeStatus({ isDark: !isDark }));
  };

  React.useEffect(() => {
    const isDarkSt = localStorage.getItem('isDark');
    console.log(isDarkSt);
    if (!isDarkSt) return;
    if (isDarkSt === 'true') {
      dispatch(userActions.changeThemeStatus({ isDark: true }));
      localStorage.setItem('isDark', JSON.stringify(isDark));
    } else {
      localStorage.setItem('isDark', JSON.stringify(isDark));
    }
  }, [isDark]);

  const [btnWord, setBtnWord] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    if (user) setBtnWord('로그아웃');
    if (user === null) setBtnWord('로그인');
  }, [user]);

  const onClickHandler = () => {
    if (user) {
      authService.logout(dispatch);
      setBtnWord('로그인');
    }
    return router.push('/auth/login');
  };
  return (
    <UserLayout>
      <div>
        <h1>퀀트로 Index 페이지</h1>
        <Button onClick={onClick}>다크모드</Button>
        <div style={{ cursor: 'pointer' }} onClick={onClickHandler}>
          {btnWord}
        </div>
      </div>
    </UserLayout>
  );
};

export default IndexPage;
