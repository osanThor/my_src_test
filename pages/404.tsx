import { Box, Card, Typography, Container, Button, styled } from '@mui/material';
import Head from 'next/head';
import type { ReactElement } from 'react';

const MainContent = styled(Box)(
  () => `
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
  `,
);

const TopWrapper = styled(Box)(
  ({ theme }) => `
    display: flex;
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing(6)};
  `,
);

function Status404() {
  return (
    <>
      <Head>
        <title>Status - 404</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="md">
            <Box textAlign="center">
              <Typography variant="h2" sx={{ my: 2, fontSize: '2rem', fontFamily: 'GmarketSansBold' }}>
                The page you were looking for doesn't exist.
              </Typography>
              <Typography variant="h4" color="text.secondary" fontWeight="normal" sx={{ fontSize: '1rem', mb: 4 }}>
                It's on us, we moved the content to a different page. The search below should help!
              </Typography>
            </Box>
            <Container maxWidth="sm">
              <Card sx={{ textAlign: 'center', mt: 3, p: 4, border: 'none', boxShadow: 'none' }}>
                <Button href="/" variant="outlined">
                  Go to homepage
                </Button>
              </Card>
            </Container>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default Status404;

Status404.getLayout = function getLayout(page: ReactElement) {
  return <div>{page}</div>;
};
