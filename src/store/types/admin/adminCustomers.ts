//admin customer
export type GetAdminAllGuidesPayload = {
  group: string | null;
  page: number | null;
} | null;
export type GetAdminAllGuidesResult = { total: number | null; guides: Array<any> | [] } | null;
export type CreateAdminGuidePayload = {
  group: string | null;
  title: string | null;
  content: string | null;
  isVisible: boolean;
} | null;
export type GetAdminGuideDetailPayload = {
  guideId: number | null;
} | null;
export type GetAdminGuideDetailResult = any;
export type UpdateAdminGuidePayload = {
  id: number | null;
  group: string | null;
  title: string | null;
  content: string | null;
  isVisible: boolean;
} | null;

export type GetAdminAllInquiriesPayload = {
  page: number | null;
  nickname: string | null;
  title: string | null;
  isWait: string | null;
} | null;
export type GetAdminAllInquiriesResult = { total: number | null; inquiries: Array<any> | [] } | null;
export type GetAdminInquiryDetailPayload = {
  inquiryId: number | null;
} | null;
export type GetAdminInquiryDetailResult = any;

export type changeGroupPayload = {
  group: string | null;
};
export type LoadAdminCustomersResponse = {
  message: string | null;
};
