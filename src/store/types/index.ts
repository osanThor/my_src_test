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
  data: { message: string };
};

export type { LoginPayload, LoadAuthBody, LoadAuthResponse, VerifyEmailPayload, VerifyCodePayload } from './auth';
export type {
  CheckNicknameRes,
  LoadUserBody,
  RegisterBody,
  RegisterPayload,
  CheckNicknamePayload,
  LoadUserResponse,
  ThemePayload,
  TelegramPayload,
} from './user';
export type { LoadPostsBody, LoadPostsResponse } from './post';
export type { LoadFileBody, LoadFileResponse } from './file';