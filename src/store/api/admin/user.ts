import { axiosInstance } from '..';
import {
  adminTelegramUsersMessage,
  adminTelegramUsersNotice,
  adminUserDetailPayload,
  getAdminUsersPayload,
} from '../../types';

// get admin All user list
export const apiGetAdminUsers = ({ page }: getAdminUsersPayload) => axiosInstance.get(`/admin/users?page=${page}`);

//get admin User detail
export const apiGetAdminUserDetail = ({ email }: adminUserDetailPayload) => axiosInstance.get(`/admin/users/${email}`);

//get admin User delete
export const apiDeleteAdminUser = ({ email }: adminUserDetailPayload) => axiosInstance.delete(`/admin/users/${email}`);

// send notice to all telegram users
export const apiSendAdminUserNotice = ({ contents }: adminTelegramUsersNotice) =>
  axiosInstance.post(`/admin/users/telegram/notice`, { contents });

// send message to specify telegram users
export const apiSendAdminUserMessage = ({ contents, idList }: adminTelegramUsersMessage) =>
  axiosInstance.post(`/admin/users/telegram/message`, { contents, idList });
