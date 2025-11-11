class AlpacaAPI {
  constructor() {
    this.apiKey = process.env.REACT_APP_ALPACA_API_KEY;
    this.secretKey = process.env.REACT_APP_ALPACA_SECRET_KEY;
    this.baseURL = process.env.REACT_APP_ALPACA_BASE_URL;
    this.dataURL = process.env.REACT_APP_ALPACA_DATA_URL;
    
    this.headers = {
      'APCA-API-KEY-ID': this.apiKey,
      'APCA-API-SECRET-KEY': this.secretKey,
      'Content-Type': 'application/json',
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: this.headers,
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Alpaca API request failed:', error);
      throw error;
    }
  }

  async dataRequest(endpoint, options = {}) {
    const url = `${this.dataURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: this.headers,
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Alpaca Data API request failed:', error);
      throw error;
    }
  }

  // Account Endpoints
  async getAccount() {
    return await this.request('/v2/account');
  }

  async getAccountConfig() {
    return await this.request('/v2/account/configurations');
  }

  async updateAccountConfig(config) {
    return await this.request('/v2/account/configurations', {
      method: 'PATCH',
      body: JSON.stringify(config),
    });
  }

  // Orders Endpoints
  async getOrders(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/v2/orders${queryParams ? `?${queryParams}` : ''}`;
    return await this.request(endpoint);
  }

  async getOrderById(orderId) {
    return await this.request(`/v2/orders/${orderId}`);
  }

  async getOrderByClientId(clientOrderId) {
    const queryParams = new URLSearchParams({ client_order_id: clientOrderId });
    return await this.request(`/v2/orders:by_client_order_id?${queryParams}`);
  }

  async placeOrder(orderData) {
    return await this.request('/v2/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async cancelOrder(orderId) {
    return await this.request(`/v2/orders/${orderId}`, {
      method: 'DELETE',
    });
  }

  async cancelAllOrders() {
    return await this.request('/v2/orders', {
      method: 'DELETE',
    });
  }

  // Positions Endpoints
  async getPositions() {
    return await this.request('/v2/positions');
  }

  async getPosition(symbol) {
    return await this.request(`/v2/positions/${symbol}`);
  }

  async closePosition(symbol) {
    return await this.request(`/v2/positions/${symbol}`, {
      method: 'DELETE',
    });
  }

  async closeAllPositions() {
    return await this.request('/v2/positions', {
      method: 'DELETE',
    });
  }

  // Assets Endpoints
  async getAssets(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/v2/assets${queryParams ? `?${queryParams}` : ''}`;
    return await this.request(endpoint);
  }

  async getAsset(symbol) {
    return await this.request(`/v2/assets/${symbol}`);
  }

  // Market Data Endpoints
  async getBars(symbols, timeframe = '1Day', params = {}) {
    const queryParams = new URLSearchParams({
      symbols: Array.isArray(symbols) ? symbols.join(',') : symbols,
      timeframe,
      ...params,
    }).toString();
    
    return await this.dataRequest(`/v2/stocks/bars?${queryParams}`);
  }

  async getLatestTrade(symbol) {
    return await this.dataRequest(`/v2/stocks/${symbol}/trades/latest`);
  }

  async getLatestQuote(symbol) {
    return await this.dataRequest(`/v2/stocks/${symbol}/quotes/latest`);
  }

  async getSnapshot(symbol) {
    return await this.dataRequest(`/v2/stocks/${symbol}/snapshot`);
  }

  // Watchlist Endpoints
  async getWatchlists() {
    return await this.request('/v2/watchlists');
  }

  async getWatchlist(watchlistId) {
    return await this.request(`/v2/watchlists/${watchlistId}`);
  }

  async createWatchlist(watchlistData) {
    return await this.request('/v2/watchlists', {
      method: 'POST',
      body: JSON.stringify(watchlistData),
    });
  }

  async updateWatchlist(watchlistId, watchlistData) {
    return await this.request(`/v2/watchlists/${watchlistId}`, {
      method: 'PUT',
      body: JSON.stringify(watchlistData),
    });
  }

  async deleteWatchlist(watchlistId) {
    return await this.request(`/v2/watchlists/${watchlistId}`, {
      method: 'DELETE',
    });
  }

  // Calendar Endpoints
  async getCalendar(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/v2/calendar${queryParams ? `?${queryParams}` : ''}`;
    return await this.request(endpoint);
  }

  // Clock Endpoint
  async getClock() {
    return await this.request('/v2/clock');
  }
}

// Create and export a singleton instance
const alpacaApi = new AlpacaAPI();
export default alpacaApi;