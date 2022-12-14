import type { AppProps } from 'next/app';
import '../styles/fonts.css';
import React, { useEffect, useState } from 'react';
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
import { adminAuthActions, authActions, localActions, userActions } from '@/src/store/reducers';
import AuthService from '@/src/utils/auth_service';
import { axiosInstance } from '@/src/store/api';
import { useRouter } from 'next/router';
import OpenBetaModal from '@/src/components/common/modals/OpenBetaModal';
import FuncModal from '@/src/components/common/modals/FuncModal';

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const authService = new AuthService();
  const dispatch = useDispatch();
  const router = useRouter();

  const { isDark, email } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
    email: user.email,
  }));
  const { loadAuthDone, loadAuthError } = useSelector(({ auth }: RootState) => ({
    loadAuthDone: auth.loadAuthDone,
    loadAuthError: auth.loadAuthError,
  }));
  const { loadAdminAuthDone, loadAdminAuthError } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
    loadAdminAuthError: adminAuth.loadAdminAuthError,
  }));
  const { bgBlur } = useSelector(({ local }: RootState) => ({
    bgBlur: local.bgBlur,
  }));

  // auto login
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) return;
    const { email, pw } = userInfo;
    dispatch(authActions.userLogin({ email, pw }));
  }, []);

  //next auth session reset and localDispatch
  useEffect(() => {
    const gId = localStorage.getItem('gId');
    if (gId) {
      signOut({ redirect: false });
    }
    if (bgBlur) {
      dispatch(localActions.isNotLocalBgBlur());
    }
  }, [router]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (loadAuthDone.message === 'LOGGED_IN' || user) {
      authService.userLogin(loadAuthDone);
      if (loadAuthDone.accessToken) {
        if (!email) {
          dispatch(userActions.getUserProfile());
        }
      }
    }
  }, [loadAuthDone]);

  useEffect(() => {
    if (loadAuthError) {
      localStorage.clear();
      delete axiosInstance.defaults.headers.common['Authorization'];
      if (loadAuthDone.message === 'ACCESS_DENIED') {
        setTokenDinedOpen(true);
        authService.userLogOut(dispatch);
      }
    }
  }, [loadAuthError, loadAuthDone]);

  const [tokenDiedOpen, setTokenDinedOpen] = useState(false);
  const handleTokenDinedModal = () => {
    setTokenDinedOpen(false);
    router.push('/auth/login');
  };

  // token
  useEffect(() => {
    authService.userRefreshToken(dispatch, loadAuthDone);
  }, [dispatch, router]);

  //admin
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loadAdminAuthError) {
      alert(loadAdminAuthError);
      delete axiosInstance.defaults.headers.common['Authorization'];
      localStorage.clear();
      router.push('/admin/login');
      return;
    }

    if (loadAdminAuthDone) {
      if (loadAdminAuthDone.message === 'LOGGED_IN' || loadAdminAuthDone.message === 'UPDATED') {
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + loadAdminAuthDone.accessToken;
        timeout = setTimeout(() => {
          console.log('admin refresh');
          dispatch(adminAuthActions.adminRefresh());
        }, loadAdminAuthDone.expiryTime - 30000);
      } else {
        clearTimeout(timeout);
        localStorage.clear();
        delete axiosInstance.defaults.headers.common['Authorization'];
        router.push('/admin/login');
      }
    }
  }, [loadAdminAuthError, loadAdminAuthDone]);

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (admin) {
      dispatch(adminAuthActions.adminRefresh());
    }
  }, [router]);

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

  // open modal
  const [openModal, setOpenModal] = useState(true);
  const handleCloseOpenModal = () => {
    setOpenModal(false);
  };
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
          <OpenBetaModal open={openModal} onClose={handleCloseOpenModal} />
          <FuncModal
            open={tokenDiedOpen}
            onClose={handleTokenDinedModal}
            message={{
              title: '세션이 만료되었어요',
              description: '다시 로그인해주세요',
              btnTxt: '',
            }}
            dubBtn={false}
            onClick={handleTokenDinedModal}
            onClick2={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
