// API.js
const BASE_URL = process.env.REACT_APP_ALPACA_BASE_URL;

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

  // Assets endpoints
  getAssets: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return alpacaFetch(`/assets?${queryParams}`);
  },

  // Market data endpoints (note: this might require different base URL)
  getBars: (symbols, timeframe, params = {}) => {
    // This would use a different base URL for market data
    // For now, just a placeholder structure
    const queryParams = new URLSearchParams({
      symbols: Array.isArray(symbols) ? symbols.join(',') : symbols,
      timeframe,
      ...params
    }).toString();
    return alpacaFetch(`/bars?${queryParams}`);
  }
};

export default alpacaAPI;












// import testalpacadocs from '@api/testalpacadocs';



// // Account Endpoints
// export const getAccount = () => {

//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);

//   return testalpacadocs.getAccount()
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error fetching account:', err);
//       throw err;
//     });

    
// };



// export const getAccountConfig = () => {
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);
//   return testalpacadocs.getAccountConfigurations()
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error fetching account config:', err);
//       throw err;
//     });
// };

// export const updateAccountConfig = (config) => {
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);
//   return testalpacadocs.patchAccountConfigurations(config)
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error updating account config:', err);
//       throw err;
//     });
// };

// // Orders Endpoints
// export const getOrders = (params = {}) => {
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);
//   return testalpacadocs.getOrders(params)
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error fetching orders:', err);
//       throw err;
//     });
// };

// export const getOrderById = (orderId) => {
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);
//   return testalpacadocs.getOrdersById({ order_id: orderId })
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error fetching order by ID:', err);
//       throw err;
//     });
// };

// export const placeOrder = (orderData) => {
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);
//   return testalpacadocs.postOrders(orderData)
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error placing order:', err);
//       throw err;
//     });
// };

// export const cancelOrder = (orderId) => {
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);
//   return testalpacadocs.deleteOrdersById({ order_id: orderId })
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error canceling order:', err);
//       throw err;
//     });
// };

// export const cancelAllOrders = () => {
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);
//   return testalpacadocs.deleteOrders()
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error canceling all orders:', err);
//       throw err;
//     });
// };

// // Positions Endpoints
// export const getPositions = () => {
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);
//   return testalpacadocs.getPositions()
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error fetching positions:', err);
//       throw err;
//     });
// };

// export const getPosition = (symbol) => {
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);
//   return testalpacadocs.getPositionsBySymbolOrAssetId({ symbol_or_asset_id: symbol })
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error fetching position:', err);
//       throw err;
//     });
// };

// export const closePosition = (symbol) => {
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);
//   return testalpacadocs.deletePositionsBySymbolOrAssetId({ symbol_or_asset_id: symbol })
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error closing position:', err);
//       throw err;
//     });
// };

// export const closeAllPositions = () => {
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);
//   return testalpacadocs.deletePositions()
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error closing all positions:', err);
//       throw err;
//     });
// };

// // Assets Endpoints
// export const getAssets = (params = {}) => {
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);

//   return testalpacadocs.getAssets(params)
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error fetching assets:', err);
//       throw err;
//     });
// };

// export const getAsset = (symbol) => {
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);
//   return testalpacadocs.getAssetsBySymbolOrAssetId({ symbol_or_asset_id: symbol })
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error fetching asset:', err);
//       throw err;
//     });
// };

// // Clock Endpoint
// export const getClock = () => {
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);
//   return testalpacadocs.getClock()
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error fetching clock:', err);
//       throw err;
//     });
// };

// // Calendar Endpoints
// export const getCalendar = (params = {}) => {
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_API_KEY);
//   testalpacadocs.auth(process.env.REACT_APP_ALPACA_SECRET_KEY);
//   return testalpacadocs.getCalendar(params)
//     .then(({ data }) => data)
//     .catch(err => {
//       console.error('Error fetching calendar:', err);
//       throw err;
//     });
// };

// // Export default object with all functions for backward compatibility
// const alpacaApi = {
//   getAccount,
//   getAccountConfig,
//   updateAccountConfig,
//   getOrders,
//   getOrderById,
//   placeOrder,
//   cancelOrder,
//   cancelAllOrders,
//   getPositions,
//   getPosition,
//   closePosition,
//   closeAllPositions,
//   getAssets,
//   getAsset,
//   getClock,
//   getCalendar,
// };

// export default alpacaApi;

