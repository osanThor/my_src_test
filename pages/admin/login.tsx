import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import { Logo } from '@/src/assets/Images';
import center from '../center';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.quantro.net/">
        QUANTRO
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {
  const onSubmit = (e: any) => {};
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box
            sx={{
              mb: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                my: 1,
                fontFamily: 'GmarketSansBold',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '1rem',
                mb: '1rem',
              }}
            >
              <Image src={Logo[0]} style={{ maxWidth: '100px' }} alt="logo" />
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontFamily: 'GmarketSansBold', fontSize: '1rem', mb: 2, color: '#3682F9' }}
            >
              Admin Authorization
            </Typography>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="ID"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, height: '58px' }}>
                Sign In
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
