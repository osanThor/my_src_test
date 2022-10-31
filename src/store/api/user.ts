import { axiosInstance } from '.';

import type { LoadUserBody, LoadUserResponse } from '../types';

// 닉네임 중복확인
export const checkNickname = ({ nickname }: LoadUserBody) =>
  axiosInstance.get<LoadUserResponse>(`/users/nickname/exist?nickname=${nickname}`);

// 모든 게시글들 요청
export const apiChangeTheme = ({ isDark }: LoadUserBody) =>
  axiosInstance.put<LoadUserResponse>(`/users/theme?isDark=${isDark}`);
