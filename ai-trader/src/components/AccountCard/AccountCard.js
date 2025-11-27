import React, { useState, useEffect } from 'react';
import { useAlpaca } from '../../hooks/useAlpaca';

function AccountCard({ className = '' }) {
    const {
        getAccount,

    } = useAlpaca();
  const [accountInfo, setAccountInfo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const loadAccountData = async () => {
    try {
      const [account] = await Promise.all([
        getAccount(),
      ]);
      setAccountInfo(account);
    } catch (err) {
      console.error('Failed to load account data:', err);
    }
  };

  useEffect(() => {
    loadAccountData();
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!accountInfo) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 w-64">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Account Card */}
      <div 
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 border-2 border-transparent hover:border-blue-500"
        onClick={togglePopup}
      >
        <h3 className="text-sm font-medium text-gray-500 mb-2">Account Balance</h3>
        <div className="text-2xl font-bold text-gray-800">
          {accountInfo.currency} {parseFloat(accountInfo.portfolio_value || 0).toLocaleString()}
        </div>
        <div className="text-xs text-gray-400 mt-2">Click for details</div>
      </div>

      {/* Popup Window */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 max-h-90vh overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Account Details</h2>
              <button 
                onClick={closePopup}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Account Information */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Account Number</label>
                  <p className="text-gray-800 font-mono">{accountInfo.account_number || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Currency</label>
                  <p className="text-gray-800">{accountInfo.currency || 'N/A'}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Balance</label>
                  <p className="text-gray-800 font-bold">
                    {accountInfo.currency} {parseFloat(accountInfo.portfolio_value || 0).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Accrued Fees</label>
                  <p className="text-gray-800">
                    {accountInfo.currency} {parseFloat(accountInfo.accrued_fees || 0).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Buying Power</label>
                  <p className="text-gray-800">
                    {accountInfo.currency} {parseFloat(accountInfo.buying_power || 0).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Account Status</label>
                  <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    accountInfo.account_blocked 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {accountInfo.account_blocked ? 'Blocked' : 'Active'}
                  </p>
                </div>
              </div>

              {/* Created At - Full width */}
              <div className="pt-4 border-t">
                <label className="text-sm font-medium text-gray-500">Account Created</label>
                <p className="text-gray-800">{formatDate(accountInfo.created_at)}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end p-6 border-t bg-gray-50 rounded-b-lg">
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountCard;