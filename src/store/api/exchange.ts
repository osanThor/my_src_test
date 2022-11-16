import { axiosInstance } from '.';

import type { LoadExchangeBody } from '../types';

// create / update API Key
export const apiCreateUpdateKey = ({ exchange, id, alias, apiKey, apiSecret }: LoadExchangeBody) =>
  axiosInstance.post(`/exchanges/${exchange}/key`, { id, alias, apiKey, apiSecret });

// get all Exchanges
export const apiGetAllExchanges = () => axiosInstance.get(`/exchanges`);

// get Exchange
export const apiGetExchanges = ({ exchangeId }: LoadExchangeBody) => axiosInstance.get(`/exchanges/${exchangeId}`);

// get Active Orders
export const apiGetActiveOrders = ({ exchangeId }: LoadExchangeBody) =>
  axiosInstance.get(`/exchanges/${exchangeId}/active-orders`);

// get Dashboard
export const apiGetDashboard = ({ exchangeId }: LoadExchangeBody) =>
  axiosInstance.get(`/exchanges/${exchangeId}/dashboard`);

// get Balances
export const apiGetBalances = ({ exchangeId }: LoadExchangeBody) =>
  axiosInstance.get(`/exchanges/${exchangeId}/balances`);

// get Positions
export const apiGetPositions = ({ exchangeId }: LoadExchangeBody) =>
  axiosInstance.get(`/exchanges/${exchangeId}/positions`);

// close Position
export const apiClosePosition = ({ exchangeId }: LoadExchangeBody) =>
  axiosInstance.post(`/exchanges/${exchangeId}/positions/close`);
