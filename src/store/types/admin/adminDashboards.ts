//admin dashboards
export type GetAdminUserCountResult = {
  totalUserCount: number | null;
  comparedLastMonth: number | null;
} | null;
export type GetAllAdminExchagneCountResult = {
  totalExchangeCount: number | null;
  comparedLastMonth: number | null;
  countByPlatforms: Array<{
    date: string | null;
    bybit: number | null;
    bybitTest: number | null;
    binance: number | null;
    binanceTest: number | null;
    bitget: number | null;
  }>;
} | null;

export type GetAdminPackageCountResult = {
  basicCount: number | null;
  regularCount: number | null;
  premiumCount: number | null;
} | null;
export type LoadAdminDashboardsResponse = {
  message: string | null;
};
