import { axiosInstance } from '.';
import {
  createCommentPayload,
  CreateUserInquiruesPayload,
  getBoardPayload,
  getBoardsPayload,
  getNoticePayload,
  GetUserBoardsPayload,
  GetUserInquiriesPayload,
  LoadBoardsPayload,
  LoadBoardsResponse,
  updateBoardPayload,
} from '../types';

// get board
export const apiGetBoards = ({ category, page, title, user, comment }: getBoardsPayload) =>
  axiosInstance.get(
    `/boards?category=${category}&page=${page}${title && `&title=${title}`}${user && `&user=${user}`}${
      comment && `&comment=${comment}`
    }`,
  );

// get boards Notice
export const apiGetNoice = ({ category }: getNoticePayload) =>
  axiosInstance.get(`/boards/notices?category=${category}`);

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
// create user Inquiries
export const apiCreateUserInquiries = ({ title, content, fileUrls }: CreateUserInquiruesPayload) =>
  axiosInstance.post<LoadBoardsResponse>(`/users/inquiries`, { title, content, fileUrls });

// get read board
export const apiGetBoard = ({ boardId }: getBoardPayload) => axiosInstance.get(`/boards/${boardId}`);

// update board
export const apiUpdateBoard = ({ boardId, category, title, content, fileUrls }: updateBoardPayload) =>
  axiosInstance.put(`/boards/${boardId}`, { category, title, content, fileUrls });
// update board
export const apiDeleteBoard = ({ boardId }: getBoardPayload) => axiosInstance.delete(`/boards/${boardId}`);

// create Comment
export const apiCreateComment = ({ boardId, parentCommentId, content, fileUrls }: createCommentPayload) =>
  axiosInstance.post(`/boards/${boardId}`, { parentCommentId, content, fileUrls });
