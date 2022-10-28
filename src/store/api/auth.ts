import { axiosInstance } from '.';

import type { LoadAuthBody, LoadUserResponse } from '../types';

// 모든 게시글들 요청
export const userLogin = ({ email, pw }: LoadAuthBody) =>
  axiosInstance.post<LoadUserResponse>(
    `/auth/login/email`,
    { email, pw },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
