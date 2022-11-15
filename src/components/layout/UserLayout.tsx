import { RootState } from '@/src/store/configureStore';
import { userActions } from '@/src/store/reducers';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Header from '../common/header/Header';
import MHeader from '../common/header/MHeader';
import Container from './Container';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
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
  console.log(router.pathname);
  // headHightLight
  const [dashboard, setDachBoard] = useState(false);
  const [writeQuant, setWriteQuant] = useState(false);
  const [licenses, setLicenses] = useState(false);
  const [message, setMessage] = useState(false);
  const [strategy, setStrategy] = useState(false);
  const [community, setCommunity] = useState(false);

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
