import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import wrapper, { RootState } from '../src/store/configureStore';
import { GlobalStyle } from '@/styles/global-styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AuthService from '@/src/utils/auth_service';

function MyApp({ Component, pageProps }: AppProps) {
  const authService = new AuthService();

  const dispatch = useDispatch();

  const { user } = useSelector(({ user }: RootState) => ({
    user: user.user,
  }));
  const { loadAuthDone } = useSelector(({ auth }: RootState) => ({
    loadAuthDone: auth.loadAuthDone,
  }));

  // 사용자 확인
  useEffect(() => {
    authService.isUser(dispatch, loadAuthDone);
  }, [user, dispatch, loadAuthDone]);

  // axios 토큰 관리
  useEffect(() => {
    authService.jwtToken(loadAuthDone);
  }, [loadAuthDone]);

  // 토큰 재발급
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (user) {
      timeoutId = setTimeout(() => {
        authService.intervalRefresh(dispatch);
      }, loadAuthDone.expiryTime - 30000);
      console.log('발급 받음');
    } else {
      clearTimeout(timeoutId);
      console.log('Not User');
      return;
    }
  }, [user]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>QUANTRO</title>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
