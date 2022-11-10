import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

export {
  userLogin,
  apiGoogleLogin,
  apiRefreshToken,
  apiVerifyEmial,
  apiVerifyCode,
  apiLogout,
  apiResetPw,
} from './auth';
export { apiCheckNickname, apiRegister, apiChangeTheme, apiTelegramUsername } from './user';
export { apiLoadPosts } from './post';
