import Alpaca from '@alpacahq/alpaca-trade-api';

class AlpacaAPI {
  constructor() {
    // Initialize Alpaca client
    this.alpaca = new Alpaca({
      keyId: process.env.REACT_APP_ALPACA_API_KEY,
      secretKey: process.env.REACT_APP_ALPACA_SECRET_KEY,
      paper: true, // Use paper trading
      usePolygon: false, // Set to true if you have Polygon subscription
    });
  }

  // Account Endpoints
  async getAccount() {
    return await this.alpaca.getAccount();
  }

  async getAccountConfig() {
    return await this.alpaca.getAccountConfigurations();
  }

  async updateAccountConfig(config) {
    return await this.alpaca.updateAccountConfigurations(config);
  }

  // Orders Endpoints
  async getOrders(params = {}) {
    return await this.alpaca.getOrders(params);
  }

  async getOrderById(orderId) {
    return await this.alpaca.getOrder(orderId);
  }

  async getOrderByClientId(clientOrderId) {
    return await this.alpaca.getOrderByClientOrderId(clientOrderId);
  }

  async placeOrder(orderData) {
    return await this.alpaca.createOrder(orderData);
  }

  async cancelOrder(orderId) {
    return await this.alpaca.cancelOrder(orderId);
  }

  async cancelAllOrders() {
    return await this.alpaca.cancelAllOrders();
  }

  // Positions Endpoints
  async getPositions() {
    return await this.alpaca.getPositions();
  }

  async getPosition(symbol) {
    return await this.alpaca.getPosition(symbol);
  }

  async closePosition(symbol) {
    return await this.alpaca.closePosition(symbol);
  }

  async closeAllPositions() {
    return await this.alpaca.closeAllPositions();
  }

  // Assets Endpoints
  async getAssets(params = {}) {
    return await this.alpaca.getAssets(params);
  }

  async getAsset(symbol) {
    return await this.alpaca.getAsset(symbol);
  }

  // Market Data Endpoints
  async getBars(symbols, timeframe = '1Day', params = {}) {
    return await this.alpaca.getBarsV2(
      symbols,
      {
        timeframe,
        ...params
      }
    );
  }

  async getLatestTrade(symbol) {
    return await this.alpaca.getLatestTrade(symbol);
  }

  async getLatestQuote(symbol) {
    return await this.alpaca.getLatestQuote(symbol);
  }

  async getSnapshot(symbol) {
    return await this.alpaca.getSnapshot(symbol);
  }

  // Watchlist Endpoints
  async getWatchlists() {
    return await this.alpaca.getWatchlists();
  }

  async getWatchlist(watchlistId) {
    return await this.alpaca.getWatchlist(watchlistId);
  }

  async createWatchlist(watchlistData) {
    return await this.alpaca.createWatchlist(watchlistData);
  }

  async updateWatchlist(watchlistId, watchlistData) {
    return await this.alpaca.updateWatchlist(watchlistId, watchlistData);
  }

  async deleteWatchlist(watchlistId) {
    return await this.alpaca.deleteWatchlist(watchlistId);
  }

  // Calendar Endpoints
  async getCalendar(params = {}) {
    return await this.alpaca.getCalendar(params);
  }

  // Clock Endpoint
  async getClock() {
    return await this.alpaca.getClock();
  }

  // Streaming Data
  async connectToStream(callbacks = {}) {
    const {
      onTrade = () => {},
      onQuote = () => {},
      onBar = () => {},
      onError = () => {},
      onConnected = () => {},
    } = callbacks;

    this.alpaca.data_stream.onConnect(() => {
      console.log('Connected to Alpaca stream');
      onConnected();
    });

    this.alpaca.data_stream.onError((error) => {
      console.error('Stream error:', error);
      onError(error);
    });

    this.alpaca.data_stream.onStockTrade((trade) => {
      onTrade(trade);
    });

    this.alpaca.data_stream.onStockQuote((quote) => {
      onQuote(quote);
    });

    this.alpaca.data_stream.onStockBar((bar) => {
      onBar(bar);
    });

    this.alpaca.data_stream.connect();
  }

  async subscribeToSymbols(symbols) {
    if (this.alpaca.data_stream.connected) {
      this.alpaca.data_stream.subscribe(symbols);
    }
  }

  async unsubscribeFromSymbols(symbols) {
    if (this.alpaca.data_stream.connected) {
      this.alpaca.data_stream.unsubscribe(symbols);
    }
  }

  async disconnectStream() {
    this.alpaca.data_stream.disconnect();
  }

  // Trading Stream (for order updates)
  async connectToTradingStream(callbacks = {}) {
    const {
      onOrderUpdate = () => {},
      onAccountUpdate = () => {},
      onError = () => {},
      onConnected = () => {},
    } = callbacks;

    this.alpaca.trade_stream.onConnect(() => {
      console.log('Connected to Alpaca trading stream');
      onConnected();
    });

    this.alpaca.trade_stream.onError((error) => {
      console.error('Trading stream error:', error);
      onError(error);
    });

    this.alpaca.trade_stream.onOrderUpdate((order) => {
      onOrderUpdate(order);
    });

    this.alpaca.trade_stream.onAccountUpdate((account) => {
      onAccountUpdate(account);
    });

    this.alpaca.trade_stream.connect();
  }

  async disconnectTradingStream() {
    this.alpaca.trade_stream.disconnect();
  }
}

// Create and export a singleton instance
const alpacaApi = new AlpacaAPI();
export default alpacaApi;