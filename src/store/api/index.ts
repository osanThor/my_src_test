import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

export { userLogin, apiVerifyEmial, apiVerifyCode } from './auth';
export { apiChangeTheme } from './user';
export { apiLoadPosts } from './post';
