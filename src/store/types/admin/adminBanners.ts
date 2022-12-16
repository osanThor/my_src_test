//admin banners
export type getAdminBannersPayload = {
  page: number | null;
  bannerPosition: string | null;
  isAllSubscribe: boolean | '';
};
export type changePagePayload = {
  page: number | null;
};
export type changeBannerPositionPayload = {
  bannerPosition: string | null;
};
export type changeIsAllSubscribePayload = {
  isAllSubscribe: boolean;
};
export type getAdminSubscripbePlatformPayload = {
  platform: string | null;
  page: number | null;
};
export type getAdminBannerDetailPayload = {
  id: number | null;
};
export type getAdminBannerDetailResult = {
  files: Array<{ url: string | null }> | [];
  isVisibleMobile: boolean;
  isVisiblePc: boolean;
  position: string | null;
} | null;

export type getAdminBannersResult = {
  total: number | null;
  banners: Array<{
    createdAt: string | null;
    files: Array<{ url: string }> | [];
    id: number | null;
    isVisibleMobile: boolean;
    isVisiblePc: boolean;
    position: string | null;
  }>;
} | null;

export type createAdminBannerPayload = {
  position: string | null;
  isVisiblePc: boolean;
  isVisibleMobile: boolean;
  fileUrlPc: string | null;
  fileUrlMobile: string | null;
};
export type updateAdminBannerPayload = {
  id: number | null;
  position: string | null;
  isVisiblePc: boolean;
  isVisibleMobile: boolean;
  fileUrlPc: string | null;
  fileUrlMobile: string | null;
};

export type LoadAdminBannersResponse = {
  message: string | undefined;
};
