// API.js
const BASE_URL = process.env.REACT_APP_ALPACA_BASE_URL;
const MARKET_URL = process.env.REACT_APP_ALPACA_DATA_URL;
const NEWS_URL = process.env.REACT_APP_ALPACA_NEWS_URL;

// Default headers for Alpaca API
const getDefaultHeaders = () => ({
  'accept': 'application/json',
  'APCA-API-KEY-ID': process.env.REACT_APP_ALPACA_API_KEY ,
  'APCA-API-SECRET-KEY': process.env.REACT_APP_ALPACA_SECRET_KEY
});

// Generic fetch function with error handling
const alpacaFetch = async (endpoint, options = {}) => {
  try {
   
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: getDefaultHeaders(),
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.json()}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Market fetch function with error handling
const alpacaMarketFetch = async (endpoint, options = {}) => {
  try {
   
    const response = await fetch(`${MARKET_URL}${endpoint}`, {
      headers: getDefaultHeaders(),
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.json()}`);
    }

    return await response.json();
  } catch (error) {
    console.error('MARKET API call failed:', error);
    throw error;
  }
};
const alpacaNewsFetch = async (endpoint, options = {}) => {
  try {
   
    const response = await fetch(`${NEWS_URL}${endpoint}`, {
      headers: getDefaultHeaders(),
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.json()}`);
    }

    return await response.json();
  } catch (error) {
    console.error('MARKET API call failed:', error);
    throw error;
  }
}
// Specific API functions
export const alpacaAPI = {
  // Account endpoints
  getAccount: () => alpacaFetch('/account'),
  
  // Orders endpoints
  getOrders: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return alpacaFetch(`/orders?${queryParams}`);
  },
  
  getOrder: (orderId) => alpacaFetch(`/orders/${orderId}`),
  
  createOrder: (orderData) => alpacaFetch('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getDefaultHeaders()
    },
    body: JSON.stringify(orderData)
  }),
  
  cancelOrder: (orderId) => alpacaFetch(`/orders/${orderId}`, {
    method: 'DELETE'
  }),

  // Positions endpoints
  getPositions: () => alpacaFetch('/positions'),
  
  getPosition: (symbol) => alpacaFetch(`/positions/${symbol}`),
  
  closePosition: (symbol) => alpacaFetch(`/positions/${symbol}`, {
    method: 'DELETE'
  }),
  //NEWS endpoints
  getNews: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return alpacaNewsFetch(`/news?${queryParams}`);
  },

  // Assets endpoints
  getAssets: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return alpacaFetch(`/assets?${queryParams}`);
  },

  // Market data endpoints (note: this might require different base URL)
  getLatestBars: (symbols, timeframe, params = {}) => {
    // This would use a different base URL for market data
    // For now, just a placeholder structure
    const queryParams = new URLSearchParams({
      symbols: Array.isArray(symbols) ? symbols.join(',') : symbols,
      timeframe,
      ...params
    }).toString();
    return alpacaMarketFetch(`/bars/latest?${queryParams}`);
  },

  getHistoricalBars: (symbols, timeframe, params = {}) => {
    // This would use a different base URL for market data
    // For now, just a placeholder structure
    const queryParams = new URLSearchParams({
      symbols: Array.isArray(symbols) ? symbols.join(',') : symbols,
      timeframe,
      ...params
    }).toString();
    return alpacaMarketFetch(`/bars?${queryParams}`);
  }
  
};


export default alpacaAPI;


