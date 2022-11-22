export const platform = [
  { name: 'platform', value: 'BYBIT', txt: 'Bybit' },
  { name: 'platform', value: 'BYBIT_TEST', txt: 'Bybit 테스트넷' },
  { name: 'platform', value: 'BITGET', txt: 'Bitget' },
  { name: 'platform', value: 'BITGET_TEST', txt: 'Bitget 테스트넷' },
];

export const market = [
  { name: 'market', value: 'INVERSE', txt: 'Inverse Perpetual' },
  { name: 'market', value: 'USDT', txt: 'USDT Perpetual' },
  { name: 'market', value: 'SPOT', txt: 'Spot' },
];

export const alias = [{ name: 'alias', value: '', txt: '해당 거래소에 속한 계정' }];

export const symbol = [{ name: 'symbol', value: '', txt: '해당 마켓에 포함된 symbol' }];

export const orderType = [
  { name: 'orderType', value: 'Limit', txt: '지정가' },
  { name: 'orderType', value: 'Market', txt: '시장가' },
];

export const side = [
  { name: 'side', value: 'Buy', txt: '매수' },
  { name: 'side', value: 'Sell', txt: '매도' },
  { name: 'side', value: 'Close', txt: '청산' },
  { name: 'side', value: 'BuyClose', txt: '청산(매수 포지션 종료)' },
  { name: 'side', value: 'SellClose', txt: '청산(매도 포지션 종료)' },
];

export const priceType = [
  { name: 'priceType', value: 'LAST', txt: 'LAST(마지막 체결가격)' },
  { name: 'priceType', value: 'BID', txt: 'BID(매수호가에서 최고가격)' },
  { name: 'priceType', value: 'ASK', txt: 'ASK(매도호가에서 최저가격)' },
  { name: 'priceType', value: 'AVG', txt: 'AVG(포지션 평균가격)' },
  { name: 'priceType', value: 'INP', txt: '직접입력' },
];

//** INP */
export const price = {};
export const pricePct = {};
//** !--INP */

export const qtyType = [
  { name: 'qtyType', value: 'USD', txt: 'USD' },
  { name: 'qtyType', value: 'USDT', txt: 'USDT' },
];

export const qty: any[] = [];

export const equityType = [
  { name: 'equityType', value: 'EQUITY', txt: '총자산대비' },
  { name: 'equityType', value: 'BALANCE', txt: '잔액대비' },
];

export const equityPct: any[] = [];

//** 옵션선택 =  미체결주문취소: openOrderCancel,포지션 청산: positionClose */
//** 레버리지: marginType =  격리:ISOLATED, 교차: CROSS , 입력값 : leverage*/

export const conditionType = [
  { name: 'conditionType', value: 'LAST', txt: 'LAST(마지막 체결가격)' },
  { name: 'conditionType', value: 'INP', txt: '직접입력' },
];
//** INP */
export const conditionPrice = {};
//** !--INP */

export const trailingStopPct = {};
