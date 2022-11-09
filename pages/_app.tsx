import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import wrapper, { RootState } from '../src/store/configureStore';
import { GlobalStyle } from '@/styles/global-styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AuthService from '@/src/utils/auth_service';
import theme from '@/styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const authService = new AuthService();

  const dispatch = useDispatch();

  const { user, isDark } = useSelector(({ user }: RootState) => ({
    user: user.user,
    isDark: user.isDark,
  }));
  const { loadAuthDone } = useSelector(({ auth }: RootState) => ({
    loadAuthDone: auth.loadAuthDone,
  }));

  // // 자동 로그인
  // useEffect(() => {
  //   authService.autoLogin(dispatch);
  // }, []);

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
        authService.intervalRefresh(dispatch, loadAuthDone);
      }, loadAuthDone.expiryTime - 30000);
    } else {
      clearTimeout(timeoutId);
      console.log('Not User');
      return;
    }
  }, [user]);

  // theme
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  useEffect(() => {
    const isLocalDark = localStorage.getItem('isDark');
    console.log(isLocalDark);
    if (isLocalDark === 'true') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, [isDark]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>QUANTRO</title>
      </Head>
      <ThemeProvider theme={isDarkMode ? theme.darkTheme : theme.lightTheme}>
        <GlobalStyle />
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
