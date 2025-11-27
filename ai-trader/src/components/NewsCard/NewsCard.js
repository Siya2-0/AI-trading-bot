import React, { useState,useEffect } from 'react';
import {useAlpaca} from '../../hooks/useAlpaca.js';
 

const NewsCard = () => {
  const [expandedNews, setExpandedNews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 5;
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getNews } = useAlpaca();
  

  // Fetch news data (example)
  const fetchNews = async () => {
    setLoading(true);
    try {
      // Your API call to get news data
      const response = await getNews();
      setNewsData(response);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
      fetchNews();
    }, []);

  if (!newsData?.news || newsData.news.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Market News</h2>
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-lg font-medium">No news available</p>
          <p className="text-sm mt-1">Market news will appear here</p>
        </div>
      </div>
    );
  }

  const toggleExpand = (newsId) => {
    setExpandedNews(expandedNews === newsId ? null : newsId);
  };

  // Format date to relative time (e.g., "2 hours ago")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  // Get thumbnail image
  const getThumbnail = (images) => {
    if (!images || images.length === 0) {
      return null;
    }
    // Prefer thumb size, fall back to small, then large
    const thumb = images.find(img => img.size === 'thumb') || 
                  images.find(img => img.size === 'small') || 
                  images[0];
    return thumb.url;
  };

  // Pagination
  const totalPages = Math.ceil(newsData.news.length / newsPerPage);
  const startIndex = (currentPage - 1) * newsPerPage;
  const currentNews = newsData.news.slice(startIndex, startIndex + newsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setExpandedNews(null); // Close any expanded news when changing pages
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Market News</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{newsData.news.length} articles</span>
          {newsData.next_page_token && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              More Available
            </span>
          )}
        </div>
      </div>

      {/* News List */}
      <div className="space-y-4">
        {currentNews.map((news) => {
          const thumbnail = getThumbnail(news.images);
          const isExpanded = expandedNews === news.id;
          
          return (
            <div
              key={news.id}
              className={`border rounded-lg transition-all duration-200 ${
                isExpanded 
                  ? 'border-blue-300 bg-blue-50 shadow-sm' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              {/* News Header */}
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleExpand(news.id)}
              >
                <div className="flex space-x-3">
                  {/* Thumbnail */}
                  {thumbnail && (
                    <div className="flex-shrink-0">
                      <img
                        src={thumbnail}
                        alt={news.headline}
                        className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1">
                          {news.headline}
                        </h3>
                        
                        {/* Symbols */}
                        {news.symbols && news.symbols.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {news.symbols.slice(0, 5).map((symbol) => (
                              <span
                                key={symbol}
                                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                              >
                                {symbol}
                              </span>
                            ))}
                            {news.symbols.length > 5 && (
                              <span className="inline-block bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                                +{news.symbols.length - 5} more
                              </span>
                            )}
                          </div>
                        )}
                        
                        {/* Meta Info */}
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span className="font-medium">{news.source}</span>
                          <span>{formatRelativeTime(news.created_at)}</span>
                          {news.author && <span>by {news.author}</span>}
                        </div>
                      </div>
                      
                      {/* Expand Icon */}
                      <div className="flex-shrink-0 ml-2">
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Summary Preview */}
                    {news.summary && !isExpanded && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {news.summary}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-200 pt-4">
                  {/* Full Summary */}
                  {news.summary && (
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                      {news.summary}
                    </p>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-gray-500">
                      Updated {formatRelativeTime(news.updated_at)}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(news.url, '_blank');
                        }}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                      >
                        <span>Read Full Article</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Next Page Token Indicator */}
      {newsData.next_page_token && (
        <div className="mt-4 text-center">
          <div className="text-xs text-gray-500 bg-gray-50 py-2 rounded-lg">
            More news available • Next page token: {newsData.next_page_token.substring(0, 10)}...
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsCard;