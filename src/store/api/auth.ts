import { axiosInstance } from '.';

import type { LoadAuthBody, LoadAuthResponse, LoadUserResponse } from '../types';

// 로그인 요청
export const userLogin = ({ email, pw }: LoadAuthBody) =>
  axiosInstance.post<LoadAuthResponse>(
    `/auth/login/email`,
    { email, pw },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

// 이메일 인증요청
export const apiVerifyEmial = ({ email, isExistTrigger }: LoadAuthBody) =>
  axiosInstance.post<LoadAuthResponse>(`/auth/email/verify/${email}?isExistTrigger=${isExistTrigger}`);

//이메일 인증번호
export const apiVerifyCode = ({ email, verifyCode }: LoadAuthBody) =>
  axiosInstance.post<LoadAuthResponse>(`/auth/email/verify`, {
    email,
    verifyCode,
  });
