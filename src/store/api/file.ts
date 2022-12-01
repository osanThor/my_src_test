import { LoadFileBody, LoadFileResponse } from './../types/file';
import { axiosInstance } from '.';

// file upload
export const apiUploadFile = (data: LoadFileBody) =>
  axiosInstance.post<LoadFileResponse>(`/uploads/picture`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
