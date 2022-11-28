import { axiosInstance } from '.';
import { LoadBoardsBody, LoadBoardsResponse } from '../types';

// create board
export const apiCreateBoard = ({ category, title, content, fileUrls }: LoadBoardsBody) =>
  axiosInstance.post<LoadBoardsResponse>(`/boards`, { category, title, content, fileUrls });
