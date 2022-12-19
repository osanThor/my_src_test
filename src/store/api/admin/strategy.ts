import { axiosInstance } from '..';
import {
  certifiedAdminStrategyPayload,
  createQuantroIndicatorPayload,
  createQuantroStrategyPayload,
  deleteAdminStrategyPayload,
  getAdminStrategiesPayload,
  getAdminStrategyDetailPayload,
} from '../../types';

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

// get detail
export const apiGetAdminStrategyDetail = ({ id, category }: getAdminStrategyDetailPayload) =>
  axiosInstance.get(`/admin/strategies/${id}?category=${category}`);

// delete strategy
export const apiDeleteAdminStrategy = ({ id }: deleteAdminStrategyPayload) =>
  axiosInstance.get(`/admin/strategies/${id}`);

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

/// create quantro-strategy
export const apiCreateQuantroStrategy = ({
  category,
  title,
  content,
  fileUrls,
  platform,
  symbol,
  chartCycle,
  profitPct,
}: createQuantroStrategyPayload) =>
  axiosInstance.post('/admin/strategies/quantro-strategy', {
    category,
    title,
    content,
    fileUrls,
    platform,
    symbol,
    chartCycle,
    profitPct,
  });

/// creaqte quantro-indicator
export const apiCreateQuantroIndicator = ({ category, title, content, fileUrls }: createQuantroIndicatorPayload) =>
  axiosInstance.post('/admin/strategies/quantro-indicator', {
    category,
    title,
    content,
    fileUrls,
  });
