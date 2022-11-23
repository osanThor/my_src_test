import type { AppProps } from 'next/app';
import '../styles/fonts.css';
import React, { useEffect } from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import wrapper, { RootState } from '@/src/store/configureStore';
import { GlobalStyle } from '@/styles/global-styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import theme from '@/styles/theme';
import { Session } from 'next-auth';
import { SessionProvider, signOut } from 'next-auth/react';
import { authActions, userActions } from '@/src/store/reducers';
import AuthService from '@/src/utils/auth_service';
import { axiosInstance } from '@/src/store/api';
import { useRouter } from 'next/router';

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const authService = new AuthService();
  const dispatch = useDispatch();
  const router = useRouter();

  const { isDark, photoUrl } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
    photoUrl: user.photoUrl,
  }));
  const { loadAuthDone, loadAuthError } = useSelector(({ auth }: RootState) => ({
    loadAuthDone: auth.loadAuthDone,
    loadAuthError: auth.loadAuthError,
  }));

  // auto login
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) return;
    const { email, pw } = userInfo;
    dispatch(authActions.userLogin({ email, pw }));
  }, []);

  //next auth session reset
  useEffect(() => {
    const gId = localStorage.getItem('gId');
    if (gId) {
      signOut({ redirect: false });
    }
  }, [router]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (loadAuthDone.message === 'LOGGED_IN' || user) {
      authService.userLogin(loadAuthDone);
      if (loadAuthDone.accessToken) {
        if (!photoUrl) {
          dispatch(userActions.getUserProfile());
        }
      }
    }
  }, [loadAuthDone]);

  useEffect(() => {
    if (loadAuthError) {
      localStorage.clear();
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  }, [loadAuthError]);

  // token
  useEffect(() => {
    authService.userRefreshToken(dispatch, loadAuthDone);
  }, [dispatch, router]);

  // theme
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  useEffect(() => {
    const isLocalDark = localStorage.getItem('isDark');
    if (isLocalDark === 'true') {
      dispatch(userActions.changeThemeStatus({ isDark: true }));
      setIsDarkMode(true);
    } else {
      dispatch(userActions.changeThemeStatus({ isDark: false }));
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
