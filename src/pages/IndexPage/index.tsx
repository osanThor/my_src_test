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
  const { isDark, user } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
    user: user.user,
  }));
  const onClick = async () => {
    dispatch(userActions.changeTheme({ isDark }));
  };

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
      <h1>퀀트로 Index 페이지</h1>
      <Button onClick={onClick}>다크모드</Button>
      <div style={{ cursor: 'pointer' }} onClick={onClickHandler}>
        {btnWord}
      </div>
    </UserLayout>
  );
};

export default IndexPage;
