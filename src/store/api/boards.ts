import { axiosInstance } from '.';
import {
  getBoardsPayload,
  GetUserBoardsPayload,
  GetUserInquiriesPayload,
  LoadBoardsPayload,
  LoadBoardsResponse,
} from '../types';

// get board
export const apiGetBoards = ({ category, page, title, user, comment }: getBoardsPayload) =>
  axiosInstance.get<LoadBoardsResponse>(
    `/boards?category=${category}&page=${page}${title && `&title=${title}`}${user && `&user=${user}`}${
      comment && `&comment=${comment}`
    }`,
  );
// get user boards
export const apiGetUserBoards = ({ category, page }: GetUserBoardsPayload) =>
  axiosInstance.get(`/users/boards${category || page ? `?category=${category}&page=${page}` : ''}`);
// get user comments
export const apiGetUserComments = ({ category, page }: GetUserBoardsPayload) =>
  axiosInstance.get(`/users/comments${category || page ? `?category=${category}&page=${page}` : ''}`);
// get user Likes
export const apiGetUserLikes = ({ category, page }: GetUserBoardsPayload) =>
  axiosInstance.get(`/users/likes${category || page ? `?category=${category}&page=${page}` : ''}`);
// get user Collection
export const apiGetUserCollection = ({ category, page }: GetUserBoardsPayload) =>
  axiosInstance.get(`/users/collections${category || page ? `?category=${category}&page=${page}` : ''}`);
// get user Inquiries
export const apiGetUserInquiries = ({ page }: GetUserInquiriesPayload) =>
  axiosInstance.get(`/users/inquiries${page ? `?page=${page}` : ''}`);

// create board
export const apiCreateBoard = ({ category, title, content, fileUrls }: LoadBoardsPayload) =>
  axiosInstance.post<LoadBoardsResponse>(`/boards`, { category, title, content, fileUrls });
