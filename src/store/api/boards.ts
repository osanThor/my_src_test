import { axiosInstance } from '.';
import { getBoardsPayload, LoadBoardsPayload, LoadBoardsResponse } from '../types';

// get board
export const apiGetBoard = ({ category, page, title, user, comment }: getBoardsPayload) =>
  axiosInstance.get<LoadBoardsResponse>(
    `/boards?category=${category}&page=${page}${title && `&title=${title}`}${user && `&user=${user}`}${
      comment && `&comment=${comment}`
    }`,
  );

// create board
export const apiCreateBoard = ({ category, title, content, fileUrls }: LoadBoardsPayload) =>
  axiosInstance.post<LoadBoardsResponse>(`/boards`, { category, title, content, fileUrls });
