import { axiosInstance } from '.';

import type { CreateUpdateApiKeyPayload, LoadExchangeIdPayload } from '../types';

// create / update API Key
export const apiCreateUpdateKey = ({ exchange, apiKeyObj }: CreateUpdateApiKeyPayload) =>
  axiosInstance.post(`/exchanges/${exchange}/key`, apiKeyObj);

// get all Exchanges
export const apiGetAllExchanges = () => axiosInstance.get(`/exchanges`);

// get Exchange
export const apiGetExchanges = ({ exchangeId }: LoadExchangeIdPayload) => axiosInstance.get(`/exchanges/${exchangeId}`);

// get Active Orders
export const apiGetActiveOrders = ({ exchangeId }: LoadExchangeIdPayload) =>
  axiosInstance.get(`/exchanges/${exchangeId}/active-orders`);

// get Dashboard
export const apiGetDashboard = ({ exchangeId }: LoadExchangeIdPayload) =>
  axiosInstance.get(`/exchanges/${exchangeId}/dashboard`);

// get Balances
export const apiGetBalances = ({ exchangeId }: LoadExchangeIdPayload) =>
  axiosInstance.get(`/exchanges/${exchangeId}/balances`);

// get Positions
export const apiGetPositions = ({ exchangeId }: LoadExchangeIdPayload) =>
  axiosInstance.get(`/exchanges/${exchangeId}/positions`);

// close Position
export const apiClosePosition = ({ exchangeId }: LoadExchangeIdPayload) =>
  axiosInstance.post(`/exchanges/${exchangeId}/positions/close`);
