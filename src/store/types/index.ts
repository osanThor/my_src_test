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
export type { LoadFileBody, LoadFileResponse } from './file';
export type { LoadExchangeBody } from './exchange';
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
  updateCommentPayload,
  deleteCommentPayload,
} from './boards';
