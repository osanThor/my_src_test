import { axiosInstance } from '..';
import {
  CreateAdminGuidePayload,
  CreateAdminInquiryAnswerPayload,
  GetAdminAllGuidesPayload,
  GetAdminAllInquiriesPayload,
  GetAdminGuideDetailPayload,
  GetAdminInquiryDetailPayload,
  UpdateAdminGuidePayload,
} from '../../types';

// get admin all guide
export const apiGetAdminAllGuides = ({ group, page }: GetAdminAllGuidesPayload) =>
  axiosInstance.get(`/admin/customers/guides?group=${group}&page=${page}`);
// create admin all guide
export const apiCreateAdminGuide = ({ group, title, content, isVisible }: CreateAdminGuidePayload) =>
  axiosInstance.post(`/admin/customers/guides`, { group, title, content, isVisible });
// Get admin guide detail
export const apiGetAdminGuideDetail = ({ guideId }: GetAdminGuideDetailPayload) =>
  axiosInstance.get(`/admin/customers/guides/${guideId}`);
// update admin guide detail
export const apiUpdateAdminGuide = ({ guideId, group, title, content, isVisible }: UpdateAdminGuidePayload) =>
  axiosInstance.put(`/admin/customers/guides/${guideId}`, { group, title, content, isVisible });
// delete admin guide detail
export const apiDeleteAdminGuide = ({ guideId }: GetAdminGuideDetailPayload) =>
  axiosInstance.delete(`/admin/customers/guides/${guideId}`);
// Get admin all inquiries
export const apiGetAdminAllInquiries = ({ page, nickname, title, isWait }: GetAdminAllInquiriesPayload) =>
  axiosInstance.get(`/admin/customers/inquiries?page=${page}&nickname=${nickname}&title=${title}&isWait=${isWait}`);
// Get admin inquiries detaul
export const apiGetAdminInquiryDetail = ({ inquiryId }: GetAdminInquiryDetailPayload) =>
  axiosInstance.get(`/admin/customers/inquiries/${inquiryId}`);
//delete admin inquiries detaul
export const apiDeleteAdminInquiryDetail = ({ inquiryId }: GetAdminInquiryDetailPayload) =>
  axiosInstance.delete(`/admin/customers/inquiries/${inquiryId}`);
//create answer admin inquiries detail
export const apiCreateAdminInquiryAnswer = ({ inquiryId, content }: CreateAdminInquiryAnswerPayload) =>
  axiosInstance.post(`/admin/customers/inquiries/${inquiryId}/answer`, { content });
