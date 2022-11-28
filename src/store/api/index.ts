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
export {
  apiCheckNickname,
  apiRegister,
  apiGoogleRegister,
  apiChangeTheme,
  apiTelegramUsername,
  apiGetUserProfile,
  apiUpdateUserProfile,
  apiChangePw,
  apiDeleteUser,
  apiGetUserBoards,
  apiGetUserComments,
  apiGetUserLikes,
  apiGetUserCollection,
  apiGetUserInquiries,
} from './user';

export { apiUploadFile } from './file';

export { apiGetBoards, apiCreateBoard } from './boards';
