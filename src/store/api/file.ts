import { LoadFileResponse } from './../types/file';
import { axiosInstance } from '.';

// 로그인 요청
export const userLogin = ({ file }: any) =>
  axiosInstance.post<LoadFileResponse>(`/uploads/picture`, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
