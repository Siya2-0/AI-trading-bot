import { useState, useEffect, useCallback } from 'react';
import alpacaApi from '../services/alpacaApi.js';

export const useAlpaca = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

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

  return {
    loading,
    error,
    data,
    getAccount,
    getPositions,
    getOrders,
    placeOrder,
    cancelOrder,
    closePosition,
    getBars,
    getLatestTrade,
  };
};