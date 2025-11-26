import { useState, useEffect, useCallback, useRef } from 'react';
import alpacaApi from '../services/Api.js';

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

  //Assets methods
  const getAssets = useCallback((params) => 
    executeRequest(alpacaApi.getAssets, params), [executeRequest]);

  // Trading methods
  const placeOrder = useCallback((orderData) => 
    executeRequest(alpacaApi.placeOrder, orderData), [executeRequest]);

  const cancelOrder = useCallback((orderId) => 
    executeRequest(alpacaApi.cancelOrder, orderId), [executeRequest]);

  const closePosition = useCallback((symbol) => 
    executeRequest(alpacaApi.closePosition, symbol), [executeRequest]);

  // Market data methods
  const getLatestBars = useCallback((symbols, timeframe, params) => 
    executeRequest(alpacaApi.getLatestBars, symbols, timeframe, params), [executeRequest]);

  const getHistoricalBars = useCallback((symbols, timeframe, params) => 
    executeRequest(alpacaApi.getHistoricalBars, symbols, timeframe, params), [executeRequest]);

  const getLatestTrade = useCallback((symbol) => 
    executeRequest(alpacaApi.getLatestTrade, symbol), [executeRequest]);

  //

 

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
    getLatestBars,
    getHistoricalBars,
    getLatestTrade,
    getAssets,
    // connectToStream,
    // connectToTradingStream,
    //subscribeToSymbols,
    //unsubscribeFromSymbols,
   // disconnectStream,
    //disconnectTradingStream,
  };
 };