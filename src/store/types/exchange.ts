//exchange
export type LoadExchangeBody = {
  exchange: string | null;
  id: string | null;
  alias: string | null;
  apiKey: string | null;
  apiSecret: string | null;
};
export type LoadExchangeIdPayload = {
  exchangeId: string | null;
};

export type GetAllExchangeResult =
  | Array<{
      id: string | null;
      platform: string | null;
      alias: string | null;
      apiKey: string | null;
      isReferral: boolean | null;
      balance: null;
      profit: null;
      totalProfit: null;
      orders: [];
      pastProfits: [];
      positions: [];
    }>
  | [];

export type CreateUpdateApiKeyPayload = {
  exchange: string | null;
  apiKeyObj: {
    id: string | null;
    alias: string | null;
    apiKey: string | null;
    apiSecret: string | null;
  };
};

export type LoadExchangeResponse = {
  message: string | null;
};
