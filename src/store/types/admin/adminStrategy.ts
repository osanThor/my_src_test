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

export type LoadAdminStrategiesResponse = {
  message: string | null;
};
