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
} from './user';

export { apiUploadFile } from './file';

export {
  apiGetBoards,
  apiGetNoice,
  apiGetBoard,
  apiGetUserBoards,
  apiGetUserComments,
  apiGetUserLikes,
  apiGetUserCollection,
  apiGetUserInquiries,
  apiCreateBoard,
  apiCreateUserInquiries,
  apiUpdateBoard,
} from './boards';
