import { useState, useEffect, useCallback, useRef } from 'react';
import alpacaApi from '../services/alpacaApi';

export const useAlpaca = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [streamConnected, setStreamConnected] = useState(false);
  const [tradingStreamConnected, setTradingStreamConnected] = useState(false);
  const [realTimeData, setRealTimeData] = useState({});

  const executeRequest = useCallback(async (apiCall, ...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Account methods
  const getAccount = useCallback(() => 
    executeRequest(alpacaApi.getAccount), [executeRequest]);

  const getPositions = useCallback(() => 
    executeRequest(alpacaApi.getPositions), [executeRequest]);

  const getOrders = useCallback((params) => 
    executeRequest(alpacaApi.getOrders, params), [executeRequest]);

  // Trading methods
  const placeOrder = useCallback((orderData) => 
    executeRequest(alpacaApi.placeOrder, orderData), [executeRequest]);

  const cancelOrder = useCallback((orderId) => 
    executeRequest(alpacaApi.cancelOrder, orderId), [executeRequest]);

  const closePosition = useCallback((symbol) => 
    executeRequest(alpacaApi.closePosition, symbol), [executeRequest]);

  // Market data methods
  const getBars = useCallback((symbols, timeframe, params) => 
    executeRequest(alpacaApi.getBars, symbols, timeframe, params), [executeRequest]);

  const getLatestTrade = useCallback((symbol) => 
    executeRequest(alpacaApi.getLatestTrade, symbol), [executeRequest]);

  // Streaming methods
  const connectToStream = useCallback((callbacks = {}) => {
    alpacaApi.connectToStream({
      onTrade: (trade) => {
        setRealTimeData(prev => ({
          ...prev,
          [trade.S]: { ...prev[trade.S], trade }
        }));
        callbacks.onTrade?.(trade);
      },
      onQuote: (quote) => {
        setRealTimeData(prev => ({
          ...prev,
          [quote.S]: { ...prev[quote.S], quote }
        }));
        callbacks.onQuote?.(quote);
      },
      onBar: (bar) => {
        setRealTimeData(prev => ({
          ...prev,
          [bar.S]: { ...prev[bar.S], bar }
        }));
        callbacks.onBar?.(bar);
      },
      onError: (error) => {
        setError(error.message);
        callbacks.onError?.(error);
      },
      onConnected: () => {
        setStreamConnected(true);
        callbacks.onConnected?.();
      },
    });
  }, []);

  const connectToTradingStream = useCallback((callbacks = {}) => {
    alpacaApi.connectToTradingStream({
      onOrderUpdate: (order) => {
        callbacks.onOrderUpdate?.(order);
      },
      onAccountUpdate: (account) => {
        callbacks.onAccountUpdate?.(account);
      },
      onError: (error) => {
        setError(error.message);
        callbacks.onError?.(error);
      },
      onConnected: () => {
        setTradingStreamConnected(true);
        callbacks.onConnected?.();
      },
    });
  }, []);

  const subscribeToSymbols = useCallback((symbols) => {
    alpacaApi.subscribeToSymbols(symbols);
  }, []);

  const unsubscribeFromSymbols = useCallback((symbols) => {
    alpacaApi.unsubscribeFromSymbols(symbols);
  }, []);

  const disconnectStream = useCallback(() => {
    alpacaApi.disconnectStream();
    setStreamConnected(false);
  }, []);

  const disconnectTradingStream = useCallback(() => {
    alpacaApi.disconnectTradingStream();
    setTradingStreamConnected(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnectStream();
      disconnectTradingStream();
    };
  }, [disconnectStream, disconnectTradingStream]);

  return {
    loading,
    error,
    data,
    realTimeData,
    streamConnected,
    tradingStreamConnected,
    getAccount,
    getPositions,
    getOrders,
    placeOrder,
    cancelOrder,
    closePosition,
    getBars,
    getLatestTrade,
    connectToStream,
    connectToTradingStream,
    subscribeToSymbols,
    unsubscribeFromSymbols,
    disconnectStream,
    disconnectTradingStream,
  };
};