// 응답 status 기본 타입
export type ResponseStatus = {
  status: {
    ok: boolean;
  };
};
// 응답 데이터 기본 타입
export type ResponseData = {
  message: string;
};
// 예측가능한 실패인 경우 응답 타입 ( 403, 409 등 )
export type ResponseFailure = {
  status: { ok: boolean };
  message: string;
};

export type {
  AuthPayload,
  LoginPayload,
  GooglePayload,
  LoadAuthBody,
  LoadAuthResponse,
  VerifyEmailPayload,
  VerifyCodePayload,
} from './auth';
export type {
  CheckNicknameRes,
  LoadUserBody,
  RegisterBody,
  RegisterPayload,
  CheckNicknamePayload,
  LoadUserResponse,
  ThemePayload,
  TelegramPayload,
  ChangePwFormPayload,
  ChangePwPayload,
  EditMyProfilePayload,
  UserProfilePayload,
  UpdateUserProfilePayload,
  DeleteUserPayload,
} from './user';
export type {
  LoadExchangeBody,
  LoadExchangeIdPayload,
  GetAllExchangeResult,
  LoadExchangeResponse,
  CreateUpdateApiKeyPayload,
} from './exchange';
export type { LoadFileBody, LoadFileResponse } from './file';
export type {
  LoadBoardsBody,
  getBoardsPayload,
  getBoardsResult,
  getNoticePayload,
  LoadBoardsPayload,
  LoadBoardsResponse,
  changePage,
  changeTitle,
  changeUser,
  changeComment,
  GetUserInquiriesPayload,
  getUserInquiriesResult,
  GetUserBoardsPayload,
  getBoardPayload,
  getBoardResult,
  updateBoardPayload,
  CreateUserInquiruesPayload,
  getNoticeResult,
  getUserBoardsResult,
  changeCategory,
  changeParentCommentId,
  changeCommentId,
  createCommentPayload,
  getUserCommentsResult,
  getUserCollectionsResult,
  getUserLikesResult,
  updateCommentStPayload,
  updateCommentPayload,
  deleteCommentPayload,
  setBoardCollectionPayload,
  setBoardLikePayload,
  getUserInquiryPayload,
  getUserInquiryResult,
  getUserByNicknamePayload,
  getUserByNicknameResult,
} from './boards';

//admin
export type { adminLoginPayload, LoadAdminAuthResponse } from './admin/adminAuth';
export type {
  getAdminBannersPayload,
  getAdminSubscripbePlatformPayload,
  changePagePayload,
  createAdminBannerPayload,
  getAdminBannersResult,
  changeBannerPositionPayload,
  changeIsAllSubscribePayload,
  getAdminBannerDetailPayload,
  getAdminBannerDetailResult,
  LoadAdminBannersResponse,
} from './admin/adminBanners';
export type {
  GetAdminUserCountResult,
  GetAllAdminExchagneCountResult,
  GetAdminPackageCountResult,
} from './admin/adminDashboards';

export type {
  getAdminUsersPayload,
  getAdminUsersResult,
  adminUserDetailPayload,
  getAdminUserDetailResult,
  adminTelegramUsersNotice,
  adminTelegramUsersMessage,
  changeEmailPayload,
  changeGradePayload,
  changeNicknamePayload,
  changeSnsTypePayload,
  changelicensePackagePayload,
  LoadAdminUsersResponse,
} from './admin/adminUser';

export type {
  getAdminStrategiesPayload,
  certifiedAdminStrategyPayload,
  getAdminStrategiesResult,
  changeConfirmStatusPayload,
  LoadAdminStrategiesResponse,
  createQuantroStrategyPayload,
  createQuantroIndicatorPayload,
  getAdminStrategyDetailPayload,
  getAdminStrategyDetailResult,
} from './admin/adminStrategy';

export type {
  GetAdminAllBoardsPayload,
  GetAdminBoardDetailPayload,
  deleteAdminBoardCommentPayload,
  getAdminBoardDetailResult,
  GetAdminAllBoardsResult,
  LoadAdminBoardsResponse,
  createAdminNoticePayload,
  updateAdminNoticePayload,
  getAdminBoardCommentsResult,
} from './admin/adminBoards';

export type {
  GetAdminAllGuidesPayload,
  CreateAdminGuidePayload,
  LoadAdminCustomersResponse,
  GetAdminGuideDetailPayload,
  UpdateAdminGuidePayload,
  GetAdminAllInquiriesPayload,
  changeGroupPayload,
  GetAdminAllGuidesResult,
  GetAdminGuideDetailResult,
  GetAdminAllInquiriesResult,
  GetAdminInquiryDetailPayload,
  GetAdminInquiryDetailResult,
  changeIsWaitPayload,
} from './admin/adminCustomers';
