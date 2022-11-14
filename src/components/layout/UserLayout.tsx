import { RootState } from '@/src/store/configureStore';
import { userActions } from '@/src/store/reducers';
import { useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Header from '../common/header/Header';
import MHeader from '../common/header/MHeader';
import Container from './Container';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const isDesk = useMediaQuery('(min-width: 769px)');
  const { isDark } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
  }));
  React.useEffect(() => {
    const isDarkSt = localStorage.getItem('isDark');
    if (isDarkSt === 'true') {
      dispatch(userActions.changeThemeStatus({ isDark: !isDark }));
    }
  }, []);

  return (
    <UserLayOutBlock>
      {isDesk ? <Header /> : <MHeader />}
      <Container>{children}</Container>
    </UserLayOutBlock>
  );
};

const UserLayOutBlock = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export default UserLayout;
