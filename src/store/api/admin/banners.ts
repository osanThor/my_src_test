import { axiosInstance } from '..';
import {
  createAdminBannerPayload,
  getAdminBannerDetailPayload,
  getAdminBannersPayload,
  getAdminSubscripbePlatformPayload,
} from '../../types';

// get admin all banners
export const apiGetAdminAllBanners = ({ page }: getAdminBannersPayload) =>
  axiosInstance.get(`/admin/banners?page=${page}`);

// create admin banner
export const apiCreateAdminBanner = ({
  position,
  isVisibleMobile,
  isVisiblePc,
  fileUrlMobile,
  fileUrlPc,
}: createAdminBannerPayload) =>
  axiosInstance.post(`/admin/banners`, { position, isVisibleMobile, isVisiblePc, fileUrlMobile, fileUrlPc });

// get admin main banners
export const apiGetAdminMainBanners = ({ page }: getAdminBannersPayload) =>
  axiosInstance.get(`/admin/banners/main?page=${page}`);
// get admin subscribe banners
export const apiGetAdminSubscribeBanners = ({ page }: getAdminBannersPayload) =>
  axiosInstance.get(`/admin/banners/subscribe?page=${page}`);
// get admin subscribe banners by platform
export const apiGetAdminSubscribeByPlatformBanners = ({ platform, page }: getAdminSubscripbePlatformPayload) =>
  axiosInstance.get(`/admin/banners/subscribe/${platform}?page=1${page}`);
//get banner detail
export const apiGetAdminBannerDetail = ({ id }: getAdminBannerDetailPayload) =>
  axiosInstance.get(`/admin/banners/${id}`);
