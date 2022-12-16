import { axiosInstance } from '..';
import {
  createAdminBannerPayload,
  getAdminBannerDetailPayload,
  getAdminBannersPayload,
  getAdminSubscripbePlatformPayload,
  updateAdminBannerPayload,
} from '../../types';

// get admin all banners
export const apiGetAdminAllBanners = ({ page, bannerPosition, isAllSubscribe }: getAdminBannersPayload) =>
  axiosInstance.get(
    `/admin/banners?page=${page}${bannerPosition && `&bannerPosition=${bannerPosition}`}${
      isAllSubscribe && `&isAllSubscribe=${isAllSubscribe}`
    }`,
  );

// create admin banner
export const apiCreateAdminBanner = ({
  position,
  isVisibleMobile,
  isVisiblePc,
  fileUrlMobile,
  fileUrlPc,
}: createAdminBannerPayload) =>
  axiosInstance.post(`/admin/banners`, { position, isVisibleMobile, isVisiblePc, fileUrlMobile, fileUrlPc });

//get banner detail
export const apiGetAdminBannerDetail = ({ id }: getAdminBannerDetailPayload) =>
  axiosInstance.get(`/admin/banners/${id}`);

// create admin banner
export const apiUpdateAdminBanner = ({
  id,
  position,
  isVisibleMobile,
  isVisiblePc,
  fileUrlMobile,
  fileUrlPc,
}: updateAdminBannerPayload) =>
  axiosInstance.put(`/admin/banners/${id}`, { position, isVisibleMobile, isVisiblePc, fileUrlMobile, fileUrlPc });
