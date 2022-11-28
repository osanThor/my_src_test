import { axiosInstance } from '.';
import { LoadBoardsBody, LoadBoardsPayload, LoadBoardsResponse } from '../types';

// create board
export const apiCreateBoard = ({ category, title, content, fileUrls }: LoadBoardsPayload) =>
  axiosInstance.post<LoadBoardsResponse>(`/boards`, { category, title, content, fileUrls });
