import { axiosInstance } from '..';
import { certifiedAdminStrategyPayload, getAdminStrategiesPayload } from '../../types';

// get all with filter
export const apiGetAdminAllStrategies = ({
  page,
  category,
  title,
  nickname,
  email,
  confirmStatus,
}: getAdminStrategiesPayload) =>
  axiosInstance.get(
    `/admin/strategies?page=${page}&category=${category}&title=${title}&nickname=${nickname}&email=${email}&confirmStatus=${confirmStatus}`,
  );

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
