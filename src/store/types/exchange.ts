//exchange
export type LoadExchangeBody = {
  exchange: string | null;
  id: string | null;
  alias: string | null;
  apiKey: string | null;
  apiSecret: string | null;
  exchangeId: string | null;
};

export type LoadExchangeResponse = {
  message: string | boolean | null;
};
