import { axiosInstance } from '.';
import {
  createCommentPayload,
  CreateUserInquiruesPayload,
  deleteCommentPayload,
  getBoardPayload,
  getBoardsPayload,
  getNoticePayload,
  getRankingPayload,
  GetUserBoardsPayload,
  getUserByNicknamePayload,
  GetUserInquiriesPayload,
  getUserInquiryPayload,
  LoadBoardsPayload,
  LoadBoardsResponse,
  setBoardCollectionPayload,
  setBoardLikePayload,
  updateBoardPayload,
  updateCommentPayload,
  updateUserInquiruesPayload,
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
// read user Inquiry
export const apiGetUserInquiry = ({ inquiryId }: getUserInquiryPayload) =>
  axiosInstance.get(`/users/inquiries/${inquiryId}`);
//get rank
export const apiGetRank = ({ period }: getRankingPayload) => axiosInstance.get(`/boards/ranking?period=${period}`);
//get guides
export const apiGetGuides = () => axiosInstance.get(`/boards/guides`);

// create board
export const apiCreateBoard = ({ category, title, content, fileUrls }: LoadBoardsPayload) =>
  axiosInstance.post<LoadBoardsResponse>(`/boards`, { category, title, content, fileUrls });
// create user Inquiries
export const apiCreateUserInquiries = ({ title, content, fileUrls }: CreateUserInquiruesPayload) =>
  axiosInstance.post<LoadBoardsResponse>(`/users/inquiries`, { title, content, fileUrls });
// update user Inquiry
export const apiUpdateUserInquiry = ({ inquiryId, title, content, fileUrls }: updateUserInquiruesPayload) =>
  axiosInstance.put(`/users/inquiries/${inquiryId}`, { title, content, fileUrls });

// get read board
export const apiGetBoard = ({ boardId }: getBoardPayload) => axiosInstance.get(`/boards/${boardId}`);

// update board
export const apiUpdateBoard = ({ boardId, category, title, content, fileUrls }: updateBoardPayload) =>
  axiosInstance.put(`/boards/${boardId}`, { category, title, content, fileUrls });
// update board
export const apiDeleteBoard = ({ boardId }: getBoardPayload) => axiosInstance.delete(`/boards/${boardId}`);

// create Comment
export const apiCreateComment = ({ boardId, parentCommentId, content, fileUrl }: createCommentPayload) =>
  axiosInstance.post(`/boards/${boardId}/comments`, { parentCommentId, content, fileUrl });

// update comment
export const apiUpdateComment = ({ commentId, parentCommentId, content, fileUrl }: updateCommentPayload) =>
  axiosInstance.put(`/boards/comments/${commentId}`, { parentCommentId, content, fileUrl });
// delete comment
export const apiDeleteComment = ({ commentId }: deleteCommentPayload) =>
  axiosInstance.delete(`/boards/comments/${commentId}`);

// set unset board colleciton
export const apiSetBoardCollection = ({ boardId, isCollect }: setBoardCollectionPayload) =>
  axiosInstance.post(`/boards/${boardId}/collections?isCollect=${isCollect}`);
// set unset board like
export const apiSetBoardLike = ({ boardId, isLike }: setBoardLikePayload) =>
  axiosInstance.post(`/boards/${boardId}/likes?isLike=${isLike}`);

export const apiGetUserByNickname = ({ nickname }: getUserByNicknamePayload) => axiosInstance.get(`/users/${nickname}`);
