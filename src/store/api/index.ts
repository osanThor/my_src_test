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

export {
  apiCreateUpdateKey,
  apiGetAllExchanges,
  apiGetExchanges,
  apiGetActiveOrders,
  apiGetDashboard,
  apiGetBalances,
  apiGetPositions,
  apiClosePosition,
} from './exchange';

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
  apiCreateComment,
  apiUpdateBoard,
  apiDeleteBoard,
  apiUpdateComment,
  apiDeleteComment,
  apiSetBoardCollection,
  apiSetBoardLike,
  apiGetUserInquiry,
  apiGetUserByNickname,
} from './boards';

//admin
export { apiAdminLogin, apiAdminLogout, apiAdminRefresh } from './admin/auth';

export { apiGetAdminUserCount, apiGetAdminExchangeCount, apiGetAdminPackageCount } from './admin/dashboard';

export {
  apiGetAdminUsers,
  apiGetAdminUserDetail,
  apiDeleteAdminUser,
  apiSendAdminUserNotice,
  apiSendAdminUserMessage,
} from './admin/user';

export { apiCreateAdminBanner, apiGetAdminAllBanners, apiGetAdminBannerDetail } from './admin/banners';

export {
  apiGetAdminAllStrategies,
  apiGetAdminStrategyDetail,
  apiCertifiedAdminStrategy,
  apiCreateQuantroIndicator,
  apiCreateQuantroStrategy,
} from './admin/strategy';

export { apiGetAdminAllBoards } from './admin/boards';
