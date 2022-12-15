import { axiosInstance } from '..';
import {
  certifiedAdminStrategyPayload,
  createQuantroIndicatorPayload,
  createQuantroStrategyPayload,
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
export const apiGetAdminStrategyDetail = ({ id, category }: getAdminStrategyDetailPayload) =>
  axiosInstance.get(`/admin/strategies/${id}?category=${category}`);

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

///admin/strategies/quantro-strategy
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
///admin/strategies/quantro-indicator
export const apiCreateQuantroIndicator = ({ category, title, content, fileUrls }: createQuantroIndicatorPayload) =>
  axiosInstance.post('/admin/strategies/quantro-indicator', {
    category,
    title,
    content,
    fileUrls,
  });
