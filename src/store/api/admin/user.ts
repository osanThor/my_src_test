import { axiosInstance } from '..';
import {
  adminTelegramUsersMessage,
  adminTelegramUsersNotice,
  adminUserDetailPayload,
  getAdminUsersPayload,
} from '../../types';

// get admin All user list
export const apiGetAdminUsers = ({ page, snsType, email, grade, licensePackage, nickname }: getAdminUsersPayload) =>
  axiosInstance.get(
    `/admin/users?page=${page}${snsType && `&snsType=${snsType}`}${email && `&email=${email}`}${
      licensePackage && `&licensePackage=${licensePackage}`
    }${nickname && `&nickname=${nickname}`}${grade && `&grade=${grade}`}`,
  );

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
