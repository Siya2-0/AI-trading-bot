import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar 
} from 'recharts';

const PriceCard = ({ stock, priceData, loading }) => {
const [chartType, setChartType] = useState('candlestick'); // 'candlestick' or 'line'
  
  // Calculate current price and changes
const currentPriceInfo = useMemo(() => {
  // Check if we have the required data structure
  if (!priceData?.bars?.[stock?.symbol]?.length) {
    console.log('Missing or invalid price data');
    return null;
  }

  console.log('Price Data in PriceCard:', priceData);
  
  // Extract the bars for the specific stock symbol
  const symbolBars = priceData.bars[stock.symbol];
  console.log('Processed Price Data in PriceCard:', symbolBars);
  
  // Check if we have at least 2 data points for change calculation
  if (symbolBars.length < 2) {
    console.log('Not enough data points for comparison');
    // If only one data point, return just that without change calculations
    const latest = symbolBars[symbolBars.length - 1];
    return {
      price: latest.c,      // Use 'c' for close price
      change: 0,
      changePercent: 0,
      high: latest.h,       // Use 'h' for high
      low: latest.l,        // Use 'l' for low
      volume: latest.v      // Use 'v' for volume
    };
  }
  
  const latest = symbolBars[symbolBars.length - 1];
  const previous = symbolBars[symbolBars.length - 2];
  
  console.log('Latest Price Point:', latest);
  console.log('Previous Price Point:', previous);
  
  const change = latest.c - previous.c;
  const changePercent = (change / previous.c) * 100;
  
  return {
    price: latest.c,        // Use 'c' for close price
    change,
    changePercent,
    high: latest.h,         // Use 'h' for high
    low: latest.l,          // Use 'l' for low
    volume: latest.v        // Use 'v' for volume
  };
}, [priceData, stock?.symbol]); // Add stock.symbol as dependency

// Format data for different chart types
const chartData = useMemo(() => {
  // Check if we have the required data structure
  if (!priceData?.bars?.[stock?.symbol]?.length) {
    return [];
  }

  // Extract the bars for the specific stock symbol
  const symbolBars = priceData.bars[stock.symbol];
  
  return symbolBars.map(bar => ({
    // Spread the original bar properties
    ...bar,
    // Use 't' for timestamp and convert to formatted date
    date: new Date(bar.t).toLocaleDateString(),
    // For candlestick-like display - use 'l' for low and 'h' for high
    range: [bar.l, bar.h],
    // Use 'c' for close and 'o' for open to determine color
    color: bar.c >= bar.o ? '#10b981' : '#ef4444',
    // Add explicit properties for easier access in charts
    open: bar.o,
    high: bar.h, 
    low: bar.l,
    close: bar.c,
    volume: bar.v,
    time: bar.t
  }));
}, [priceData, stock?.symbol]); // Add stock.symbol as dependency

  if (!stock) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-lg font-medium">Select a stock to view price data</p>
          <p className="text-sm mt-1">Choose from the stocks list on the left</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            {/* removed  symbol */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{stock.symbol}</h2>
              <p className="text-gray-600">{stock.name}</p>
            </div>
          </div>
        </div>
        
        {/* Chart Type Toggle */}
        <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setChartType('candlestick')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              chartType === 'candlestick'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Candlestick
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              chartType === 'line'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Line
          </button>
        </div>
      </div>

      {/* Current Price Info */}
      {currentPriceInfo && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                ${currentPriceInfo.price.toFixed(2)}
              </div>
              <div className={`flex items-center space-x-2 mt-1 ${
                currentPriceInfo.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className="font-semibold">
                  {currentPriceInfo.change >= 0 ? '+' : ''}{currentPriceInfo.change.toFixed(2)}
                </span>
                <span>
                  ({currentPriceInfo.change >= 0 ? '+' : ''}{currentPriceInfo.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            <div className="text-right text-sm text-gray-600">
              <div>High: <span className="font-medium">${currentPriceInfo.high.toFixed(2)}</span></div>
              <div>Low: <span className="font-medium">${currentPriceInfo.low.toFixed(2)}</span></div>
              <div>Volume: <span className="font-medium">{currentPriceInfo.volume.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="h-80 mb-6">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-pulse text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Loading chart data...</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  domain={['dataMin - 5', 'dataMax + 5']}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Price']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="close" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            ) : (
              // Simplified candlestick using bar chart
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'price') {
                      return [`$${value}`, 'Close Price'];
                    }
                    return [value, name];
                  }}
                />
                <Bar 
                  dataKey="close" 
                  fill="#3b82f6"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>

      {/* Additional Stock Info */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-gray-500">Exchange</div>
          <div className="font-semibold">{stock.exchange}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-gray-500">Currency</div>
          <div className="font-semibold">{stock.currency}</div>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;