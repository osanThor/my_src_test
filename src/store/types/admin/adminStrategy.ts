//admin strategy

export type getAdminStrategiesPayload = {
  page: number | null;
  category: string | null;
  title: string | null;
  nickname: string | null;
  email: string | null;
  confirmStatus: string | null;
};
export type changeConfirmStatusPayload = {
  confirmStatus: string | null;
};

export type getAdminStrategiesResult = {
  total: number | null;
  boards: Array<{
    category: string | null;
    createdAt: string | null;
    deletedAt: string | null;
    id: number | null;
    strategy: { confirmStatus: string } | null;
    title: string | null;
    user: { email: string | null; nickname: string | null };
  }> | null;
} | null;

export type certifiedAdminStrategyPayload = {
  id: number | null;
  comminities: Array<{ channel: string; url: string }> | null;
  platform: string | null;
  symbol: string | null;
  chartCycle: string | null;
  profitPct: number | null;
  confirmStatus: string | null;
  fileUrl: string | null;
};

export type getAdminStrategyDetailPayload = {
  id: number | null;
  category: string | null;
};

export type deleteAdminStrategyPayload = {
  id: number | null;
};

export type getAdminStrategyDetailResult = {
  category: string | null;
  content: string | null;
  files: Array<{ url: string }> | [];
  strategy: {
    communities: Array<{ channel: string | null; url: string | null }> | null;
    platform: string | null;
    symbol: string | null;
    chartCycle: string | null;
    profitPct: number | null;
    confirmStatus: string | null;
  };
  title: string | null;
  user: { nickname: string | null };
} | null;
export type getAdminCommissionDetailResult = {
  category: string | null;
  content: string | null;
  files: Array<{ url: string }> | [];
  commission: {
    answer: string | null;
  };
  title: string | null;
  user: { nickname: string | null };
} | null;
export type commissionPayload = {
  id: number | null;
  answer: string | null;
};

export type createQuantroStrategyPayload = {
  category: string | null;
  title: string | null;
  content: string | null;
  platform: string | null;
  symbol: string | null;
  chartCycle: string | null;
  profitPct: number | null;
  fileUrls: Array<string> | null;
};
export type updateQuantroStrategyPayload = {
  id: number | null;
  category: string | null;
  title: string | null;
  content: string | null;
  platform: string | null;
  symbol: string | null;
  chartCycle: string | null;
  profitPct: number | null;
  fileUrls: Array<string> | null;
};

export type createQuantroIndicatorPayload = {
  category: string | null;
  title: string | null;
  content: string | null;
  fileUrls: Array<string> | [];
};

export type updateQuantroIndicatorPayload = {
  id: number | null;
  category: string | null;
  title: string | null;
  content: string | null;
  fileUrls: Array<string> | [];
};

export type LoadAdminStrategiesResponse = {
  message: string | null;
};
