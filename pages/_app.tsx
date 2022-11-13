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
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { authActions } from '@/src/store/reducers';

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const authService = new AuthService();
  const dispatch = useDispatch();

  const { user, isDark } = useSelector(({ user }: RootState) => ({
    user: user.user,
    isDark: user.isDark,
  }));
  const { loadAuthDone } = useSelector(({ auth }: RootState) => ({
    loadAuthDone: auth.loadAuthDone,
  }));

  // auto login
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) return;
    const { email, pw } = userInfo;
    dispatch(authActions.userLogin({ email, pw }));
  }, []);

  // token
  useEffect(() => {
    authService.userRefreshToken(dispatch, loadAuthDone);
  }, [dispatch]);

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
      <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>QUANTRO</title>
        </Head>
        <ThemeProvider theme={isDarkMode ? theme.darkTheme : theme.lightTheme}>
          <GlobalStyle />
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
