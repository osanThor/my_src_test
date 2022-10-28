import type { AppProps } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import wrapper from '../src/store/configureStore';
import { GlobalStyle } from '@/styles/global-styles';

function MyApp({ Component, pageProps }: AppProps) {
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
