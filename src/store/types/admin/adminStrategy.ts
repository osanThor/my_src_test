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
  strategies: Array<{
    board: {
      id: number | null;
      title: string | null;
      user: { email: string | null; nickname: string | null };
      category: string | null;
      createdAt: string | null;
    };
    confirmStatus: string | null;
  }> | null;
} | null;

export type certifiedAdminStrategyPayload = {
  id: number | null;
  comminities: Array<string> | null;
  platform: string | null;
  symbol: string | null;
  chartCycle: string | null;
  profitPct: number | null;
  confirmStatus: string | null;
};

export type getAdminStrategyDetailPayload = {
  id: number | null;
  category: string | null;
};

export type getAdminStrategyDetailResult = {
  category: string | null;
  content: string | null;
  files: [];
  strategy: {
    platform: string | null;
    symbol: string | null;
    chartCycle: string | null;
    profitPct: number | null;
    confirmStatus: string | null;
  };
  title: string | null;
  user: { nickname: string | null };
} | null;

export type createQuantroStrategyPayload = {
  category: string | null;
  title: string | null;
  content: string | null;
  fileUrls: [string] | [];
  platform: string | null;
  symbol: string | null;
  chartCycle: string | null;
  profitPct: number | null;
};

export type createQuantroIndicatorPayload = {
  category: string | null;
  title: string | null;
  content: string | null;
  fileUrls: [string] | [];
};

export type LoadAdminStrategiesResponse = {
  message: string | null;
};
