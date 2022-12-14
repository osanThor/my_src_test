import { axiosInstance } from '..';
import { certifiedAdminStrategyPayload, getAdminStrategiesPayload } from '../../types';

// get all
export const apiGetAdminAllStrategies = ({ page }: getAdminStrategiesPayload) =>
  axiosInstance.get(`/admin/strategies?page=${page}`);

// get certified
export const apiGetAdminCertifiedStrategies = ({ page }: getAdminStrategiesPayload) =>
  axiosInstance.get(`/admin/strategies/certified?page=${page}`);

// get User
export const apiGetAdminUserStrategies = ({ page }: getAdminStrategiesPayload) =>
  axiosInstance.get(`/admin/strategies/user?page=${page}`);

// get commision
export const apiGetAdminCommisionStrategies = ({ page }: getAdminStrategiesPayload) =>
  axiosInstance.get(`/admin/strategies/commision?page=${page}`);

// get quantro strategies
export const apiGetAdminPublicStrategies = ({ page }: getAdminStrategiesPayload) =>
  axiosInstance.get(`/admin/strategies/public?page=${page}`);

// get quantro indicators
export const apiGetAdminIndicatorsStrategies = ({ page }: getAdminStrategiesPayload) =>
  axiosInstance.get(`/admin/strategies/indicators?page=${page}`);

// get quantro indicators
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
