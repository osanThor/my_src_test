import { axiosInstance } from '..';
import {
  createAdminNoticePayload,
  deleteAdminBoardCommentPayload,
  GetAdminAllBoardsPayload,
  GetAdminBoardDetailPayload,
  updateAdminNoticePayload,
} from '../../types';

// get admin all boards
export const apiGetAdminAllBoards = ({ page, category, title, user }: GetAdminAllBoardsPayload) =>
  axiosInstance.get(`/admin/boards?category=${category}&page=${page}&title=${title}&user=${user}`);

// get admin board detail
export const apiGetAdminBoardDetail = ({ boardId }: GetAdminBoardDetailPayload) =>
  axiosInstance.get(`/admin/boards/${boardId}`);

// delete admin board detail
export const apiDeleteAdminBoardDetail = ({ boardId }: GetAdminBoardDetailPayload) =>
  axiosInstance.delete(`/admin/boards/${boardId}`);

// get admin board commetns
export const apiGetAdminBoardComments = ({ boardId }: GetAdminBoardDetailPayload) =>
  axiosInstance.get(`/admin/boards/${boardId}/comments`);

// delete admin board detail
export const apiDeleteAdminBoardComments = ({ commentId, comment }: deleteAdminBoardCommentPayload) =>
  axiosInstance.delete(`/admin/boards/comments/${commentId}`);

// create admin notice
export const apiCreateAdminNotice = ({ content, title, targetCategory }: createAdminNoticePayload) =>
  axiosInstance.post(`/admin/boards/notice`, { content, title, targetCategory });
// update admin notice
export const apiUpdateAdminNotice = ({ boardId, content, title, targetCategory }: updateAdminNoticePayload) =>
  axiosInstance.put(`/admin/boards/notice/${boardId}`, { content, title, targetCategory });
