import { axiosInstance } from '..';
import { certifiedAdminStrategyPayload, getAdminStrategiesPayload } from '../../types';

// get all
export const apiGetAdminAllStrategies = ({ page }: getAdminStrategiesPayload) =>
  axiosInstance.get(`/admin/strategies?page=${page}`);

// certified strategy
export const apiCertifiedAdminStrategy = ({
  id,
  comminities,
  platform,
  symbol,
  chartCycle,
  profitPct,
  confirmStatus,
}: certifiedAdminStrategyPayload) =>
  axiosInstance.put(`/admin/strategies/certified/${id}`, {
    comminities,
    platform,
    symbol,
    chartCycle,
    profitPct,
    confirmStatus,
  });
