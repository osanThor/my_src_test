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

// get admin board discussion detail
export const apiGetAdminDiscussionDetail = ({ boardId }: GetAdminBoardDetailPayload) =>
  axiosInstance.get(`/admin/boards/discussion/${boardId}`);
// get admin board notice detail
export const apiGetAdminNoticeDetail = ({ boardId }: GetAdminBoardDetailPayload) =>
  axiosInstance.get(`/admin/boards/notice/${boardId}`);

// delete admin board detail
export const apiDeleteAdminBoardDetail = ({ boardId }: GetAdminBoardDetailPayload) =>
  axiosInstance.delete(`/admin/boards/${boardId}`);

// get admin board commetns
export const apiGetAdminBoardComments = ({ boardId }: GetAdminBoardDetailPayload) =>
  axiosInstance.get(`/admin/boards/${boardId}/comments`);

// delete admin board commetns
export const apiDeleteAdminBoardComments = ({ commentId }: deleteAdminBoardCommentPayload) =>
  axiosInstance.delete(`/admin/boards/comments/${commentId}`);

// create admin notice
export const apiCreateAdminNotice = ({ content, title, targetCategory }: createAdminNoticePayload) =>
  axiosInstance.post(`/admin/boards/notice`, { content, title, targetCategory });
// update admin notice
export const apiUpdateAdminNotice = ({ boardId, content, title, targetCategory }: updateAdminNoticePayload) =>
  axiosInstance.put(`/admin/boards/notice/${boardId}`, { content, title, targetCategory });
