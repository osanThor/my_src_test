//admin customer
export type GetAdminAllGuidesPayload = {
  group: string | null;
  page: number | null;
} | null;
export type GetAdminAllGuidesResult = {
  total: number | null;
  groups:
    | Array<{
        content: string | null;
        createdAt: string | null;
        group: string | null;
        id: number | null;
        isVisible: boolean;
        title: string | null;
      }>
    | [];
} | null;
export type CreateAdminGuidePayload = {
  group: string | null;
  title: string | null;
  content: string | null;
  isVisible: boolean;
} | null;
export type GetAdminGuideDetailPayload = {
  guideId: number | null;
} | null;
export type GetAdminGuideDetailResult = {
  content: string | null;
  createdAt: string | null;
  group: string | null;
  id: number | null;
  isVisible: boolean;
  title: string | null;
} | null;
export type UpdateAdminGuidePayload = {
  guideId: number | null;
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
export type GetAdminAllInquiriesResult = {
  total: number | null;
  inquiries:
    | Array<{
        answer: { id: number | null };
        createdAt: string | null;
        id: number | null;
        title: string | null;
        user: { nickname: string | null; email: string | null };
      }>
    | [];
} | null;
export type GetAdminInquiryDetailPayload = {
  inquiryId: number | null;
} | null;
export type CreateAdminInquiryAnswerPayload = {
  inquiryId: number | null;
  content: string | null;
} | null;
export type GetAdminInquiryDetailResult = any;

export type changeGroupPayload = {
  group: string | null;
};
export type changeIsWaitPayload = {
  isWait: string | null;
};
export type LoadAdminCustomersResponse = {
  message: string | null;
};
