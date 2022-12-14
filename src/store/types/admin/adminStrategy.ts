//admin strategy

export type getAdminStrategiesPayload = {
  page: number | null;
};

export type getAdminStrategiesResult = Array<{
  board: {
    title: string | null;
    user: { email: string | null; nickname: string | null };
    category: string | null;
    createdAt: string | null;
  };
  confirmStatus: string | null;
}> | null;

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
