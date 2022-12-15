import { axiosInstance } from '..';
import { GetAdminAllBoardsPayload } from '../../types';

// get admin all boards
export const apiGetAdminAllBoards = ({ page, category, title, user }: GetAdminAllBoardsPayload) =>
  axiosInstance.get(`/admin/boards?category=${category}&page=${page}&title=${title}&user=${user}`);
