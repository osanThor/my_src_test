import { axiosInstance } from '..';
import {
  adminExchangePayload,
  adminTelegramPayload,
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

// add telegram
export const apiAddAdminUserTelegram = ({ id, username }: adminTelegramPayload) =>
  axiosInstance.post(`/admin/users/${id}/telegram?username=${username}`);

//delete telegram
export const apiDeleteAdminUserTelegram = ({ id, username }: adminTelegramPayload) =>
  axiosInstance.delete(`/admin/users/${id}/telegram?username=${username}`);

// send notice to all telegram users
export const apiSendAdminUserNotice = ({ contents }: adminTelegramUsersNotice) =>
  axiosInstance.post(`/admin/users/telegram/notice`, { contents });

// send message to specify telegram users
export const apiSendAdminUserMessage = ({ contents, idList }: adminTelegramUsersMessage) =>
  axiosInstance.post(`/admin/users/telegram/message`, { contents, idList });

//delete telegram
export const apiDeleteAdminUserExchange = ({ id }: adminExchangePayload) =>
  axiosInstance.delete(`/admin/users/exchanges/${id}?id=${id}`);
