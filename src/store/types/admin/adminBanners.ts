//admin banners
export type getAdminBannersPayload = {
  page: number | null;
};
export type getAdminSubscripbePlatformPayload = {
  platform: string | null;
  page: number | null;
};
export type getAdminBannerDetailPayload = {
  id: number | null;
};

export type createAdminBannerPayload = {
  position: string | null;
  isVisiblePc: boolean;
  isVisibleMobile: boolean;
  fileUrlPc: string | boolean | null;
  fileUrlMobile: string | boolean | null;
};

export type LoadAdminBannersResponse = {
  message: string | undefined;
};
