import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

export { userLogin } from './auth';
export { apiChangeTheme } from './user';
export { apiLoadPosts } from './post';
