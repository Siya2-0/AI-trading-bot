// Order type constants
export const ORDER_TYPES = {
  MARKET: 'market',
  LIMIT: 'limit',
  STOP: 'stop',
  STOP_LIMIT: 'stop_limit',
  TRAILING_STOP: 'trailing_stop',
};

export const ORDER_SIDES = {
  BUY: 'buy',
  SELL: 'sell',
};

export const TIME_IN_FORCE = {
  DAY: 'day',
  GTC: 'gtc',
  OPG: 'opg',
  CLS: 'cls',
  IOC: 'ioc',
  FOK: 'fok',
};

// Helper functions for creating orders
export const createMarketOrder = (symbol, qty, side, timeInForce = TIME_IN_FORCE.DAY) => ({
  symbol,
  qty: qty.toString(),
  side,
  type: ORDER_TYPES.MARKET,
  time_in_force: timeInForce,
});

export const createLimitOrder = (symbol, qty, side, limitPrice, timeInForce = TIME_IN_FORCE.DAY) => ({
  symbol,
  qty: qty.toString(),
  side,
  type: ORDER_TYPES.LIMIT,
  limit_price: limitPrice.toString(),
  time_in_force: timeInForce,
});

export const createStopOrder = (symbol, qty, side, stopPrice) => ({
  symbol,
  qty: qty.toString(),
  side,
  type: ORDER_TYPES.STOP,
  stop_price: stopPrice.toString(),
  time_in_force: TIME_IN_FORCE.GTC,
});

export const createStopLimitOrder = (symbol, qty, side, stopPrice, limitPrice) => ({
  symbol,
  qty: qty.toString(),
  side,
  type: ORDER_TYPES.STOP_LIMIT,
  stop_price: stopPrice.toString(),
  limit_price: limitPrice.toString(),
  time_in_force: TIME_IN_FORCE.GTC,
});