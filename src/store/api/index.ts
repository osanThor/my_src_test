import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

export { userLogin, apiRefreshToken, apiVerifyEmial, apiVerifyCode, apiLogout } from './auth';
export { apiCheckNickname, apiRegister, apiChangeTheme } from './user';
export { apiLoadPosts } from './post';
