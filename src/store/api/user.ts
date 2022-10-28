import { axiosInstance } from '.';

import type { LoadUserBody, LoadUserResponse } from '../types';

// 모든 게시글들 요청
export const apiChangeTheme = ({ isDark }: LoadUserBody) =>
  axiosInstance.put<LoadUserResponse>(`/users/theme?isDark=${isDark}`);
