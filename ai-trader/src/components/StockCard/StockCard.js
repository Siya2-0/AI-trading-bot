import React, { useState, useEffect } from 'react';
import { useAlpaca } from '../../hooks/useAlpaca';

const StockCard = ({ onStockSelect, selectedStock }) => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const stocksPerPage = 8;

  const { getAssets } = useAlpaca();

  useEffect(() => {
    loadStocksFromAlpaca();
  }, []);

  useEffect(() => {
    // Filter stocks based on search term
    if (searchTerm) {
      const filtered = stocks.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStocks(filtered);
    } else {
      setFilteredStocks(stocks);
    }
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, stocks]);

  const loadStocksFromAlpaca = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use the getAsset function from useAlpaca hook
      
      const assets = await getAssets({
        status: 'active',
        asset_class: 'us_equity'
      });

      console.log('Fetched assets from Alpaca:', assets);
      // Filter for active, tradable US equities and exclude OTC stocks
      const activeStocks = assets.filter(asset => 
        asset.status === 'active' && 
        asset.tradable && 
        asset.class === 'us_equity' &&
        asset.exchange !== 'OTC'
      );

      // Sort by symbol and limit to top 100 for performance
      const sortedStocks = activeStocks
        .sort((a, b) => a.symbol.localeCompare(b.symbol))
        .slice(0, 100)
        .map(asset => ({
          symbol: asset.symbol,
          name: asset.name,
          exchange: asset.exchange,
          currency: asset.currency || 'USD',
          tradable: asset.tradable,
          marginable: asset.marginable,
          shortable: asset.shortable,
          easy_to_borrow: asset.easy_to_borrow,
          fractionable: asset.fractionable,
          asset_class: asset.class,
        }));

      setStocks(sortedStocks);
      setFilteredStocks(sortedStocks);
    } catch (err) {
      console.error('Error loading stocks from Alpaca:', err);
      setError('Failed to load stocks from Alpaca. Please try again.');
      setStocks([]);
      setFilteredStocks([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredStocks.length / stocksPerPage);
  const startIndex = (currentPage - 1) * stocksPerPage;
  const currentStocks = filteredStocks.slice(startIndex, startIndex + stocksPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRetry = () => {
    loadStocksFromAlpaca();
  };

  const getExchangeColor = (exchange) => {
    const exchangeColors = {
      'NASDAQ': 'bg-blue-100 text-blue-800',
      'NYSE': 'bg-green-100 text-green-800',
      'AMEX': 'bg-purple-100 text-purple-800',
      'ARCA': 'bg-orange-100 text-orange-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return exchangeColors[exchange] || exchangeColors.default;
  };

  const getStatusBadge = (stock) => {
    if (!stock.tradable) {
      return <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Not Tradable</span>;
    }
    if (stock.easy_to_borrow) {
      return <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Easy to Borrow</span>;
    }
    return <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Tradable</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
  <div className="flex flex-col space-y-3">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800">Available Stocks</h2>
      <button
        onClick={handleRetry}
        className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span className="text-sm font-medium">Refresh</span>
      </button>
    </div>
    
    <div className="relative">
      <input
        type="text"
        placeholder="Search by symbol or company name..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  </div>
</div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700 text-sm">{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-red-700 hover:text-red-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Stock List */}
      <div className="space-y-3">
  {loading ? (
    // Loading skeleton with consistent card size
    Array.from({ length: stocksPerPage }).map((_, index) => (
      <div 
        key={index} 
        className="animate-pulse flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 h-20"
      >
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="h-5 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-40"></div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-5 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    ))
  ) : currentStocks.length > 0 ? (
    currentStocks.map((stock) => (
      <div
        key={stock.symbol}
        className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200 h-20 ${
          selectedStock?.symbol === stock.symbol
            ? 'border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-200'
            : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-white hover:shadow-md'
        } ${!stock.tradable ? 'opacity-60' : ''}`}
        onClick={() => stock.tradable && onStockSelect(stock)}
      >
        {/* Left Section - Stock Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-800 text-lg truncate">
              {stock.symbol}
            </h3>
            {stock.fractionable && (
              <span 
                className="flex-shrink-0 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium" 
                title="Fractionable"
              >
                F
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 truncate max-w-[200px]">
            {stock.name}
          </p>
        </div>
        
        {/* Right Section - Exchange & Status */}
        <div className="flex flex-col items-end space-y-1 ml-4">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getExchangeColor(stock.exchange)}`}>
            {stock.exchange}
          </span>
          {getStatusBadge(stock)}
        </div>
      </div>
    ))
  ) : (
    // Empty State with consistent card style
    <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
      <svg 
        className="w-12 h-12 text-gray-300 mx-auto mb-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1} 
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <p className="text-gray-500 font-medium text-lg mb-1">
        {searchTerm ? 'No stocks found' : 'No stocks available'}
      </p>
      <p className="text-gray-400 text-sm">
        {searchTerm ? 'Try adjusting your search terms' : 'Stocks will appear here once loaded'}
      </p>
    </div>
  )}
</div>


      {/* Pagination and Info */}
      <div className="flex justify-between items-center border-t pt-4">
        <div className="text-sm text-gray-600">
          Showing {currentStocks.length} of {filteredStocks.length} stocks
          {searchTerm && ` for "${searchTerm}"`}
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            
            <span className="text-sm text-gray-600 mx-2">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Data Source Info */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Data provided by Alpaca Markets</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default StockCard;