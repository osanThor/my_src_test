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
  const { isDark } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
  }));

  const onClick = () => {
    const user = localStorage.getItem('user');

    if (!user) {
      alert('로그인 해주세요');
      return;
    }
    dispatch(userActions.changeTheme({ isDark }));
    dispatch(userActions.changeThemeStatus({ isDark: !isDark }));
    localStorage.setItem('isDark', JSON.stringify(!isDark));
  };

  React.useEffect(() => {
    const isDarkSt = localStorage.getItem('isDark');
    if (isDarkSt === 'true') {
      dispatch(userActions.changeThemeStatus({ isDark: !isDark }));
    }
  }, []);

  return (
    <UserLayout>
      <div>
        <h1>퀀트로 Index 페이지</h1>
        <Button onClick={onClick}>다크모드</Button>
      </div>
    </UserLayout>
  );
};

export default IndexPage;
