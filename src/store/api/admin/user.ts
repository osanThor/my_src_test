import { axiosInstance } from '..';
import {
  adminTelegramUsersMessage,
  adminTelegramUsersNotice,
  adminUserDetailPayload,
  getAdminUsersPayload,
  LoadAdminUsersResponse,
  updateAdminUserPayload,
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

//update admin User
export const apiUpdateAdminUser = ({
  email,
  nickname,
  introduction,
  grade,
  depositStatus,
  licensePackageInfo,
}: updateAdminUserPayload) =>
  axiosInstance.put<LoadAdminUsersResponse>(`/admin/users/${email}`, {
    nickname,
    introduction,
    grade,
    depositStatus,
    licensePackageInfo,
  });

//delete admin User
export const apiDeleteAdminUser = ({ email }: adminUserDetailPayload) => axiosInstance.delete(`/admin/users/${email}`);

//change admin User default photo
export const apiChangeAdminUserDefaultPhoto = ({ email }: adminUserDetailPayload) =>
  axiosInstance.put<LoadAdminUsersResponse>(`/admin/users/${email}/default-photo`);

// send notice to all telegram users
export const apiSendAdminUserNotice = ({ contents }: adminTelegramUsersNotice) =>
  axiosInstance.post(`/admin/users/telegram/notice`, { contents });

// send message to specify telegram users
export const apiSendAdminUserMessage = ({ contents, idList }: adminTelegramUsersMessage) =>
  axiosInstance.post(`/admin/users/telegram/message`, { contents, idList });
