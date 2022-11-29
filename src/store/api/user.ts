import { axiosInstance } from '.';

import type {
  LoadUserBody,
  LoadUserResponse,
  ChangePwPayload,
  TelegramPayload,
  UpdateUserProfilePayload,
  DeleteUserPayload,
  GetUserBoardsPayload,
  CreateUserInquiruesPayload,
} from '../types';

// 닉네임 중복확인
export const apiCheckNickname = ({ nickname }: LoadUserBody) =>
  axiosInstance.get<LoadUserResponse>(`/users/nickname/exist?nickname=${nickname}`);

// 테마 변경 요청
export const apiChangeTheme = ({ isDark }: LoadUserBody) =>
  axiosInstance.put<LoadUserResponse>(`/users/theme?isDark=${isDark}`);

// email 회원가입 요청
export const apiRegister = ({ email, pw, nickname, photoUrl }: LoadUserBody) =>
  axiosInstance.post<LoadUserResponse>(`/users/email`, {
    email,
    pw,
    nickname,
    photoUrl,
  });
//google 회원가입 요청
export const apiGoogleRegister = ({ email, pw, nickname, photoUrl }: LoadUserBody) =>
  axiosInstance.post<LoadUserResponse>(`/users/google`, {
    email,
    pw,
    nickname,
    photoUrl,
  });

// 텔레그램 사용자명 입력
export const apiTelegramUsername = ({ username }: TelegramPayload) =>
  axiosInstance.put<LoadUserResponse>(`/users/telegram?username=${username}`);

// get user profile
export const apiGetUserProfile = () => axiosInstance.get('/users/profile');

// update user profile
export const apiUpdateUserProfile = ({ photoUrl, nickname, introduction, styles }: UpdateUserProfilePayload) =>
  axiosInstance.put('/users/profile', { photoUrl, nickname, introduction, styles });

// change user pw
export const apiChangePw = ({ oldPw, newPw }: ChangePwPayload) =>
  axiosInstance.put('/users/password', { oldPw, newPw });

//delete user
export const apiDeleteUser = ({ email, pw }: DeleteUserPayload) =>
  axiosInstance.delete<LoadUserResponse>('/users', { data: { email, pw } });

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
export const apiGetUserInquiries = ({ page }: GetUserBoardsPayload) =>
  axiosInstance.get(`/users/inquiries${page ? `?page=${page}` : ''}`);

// create user Inquiries
export const apiCreateUserInquiries = ({ title, content, fileUrls }: CreateUserInquiruesPayload) =>
  axiosInstance.post<LoadUserResponse>(`/users/inquiries`, { title, content, fileUrls });
