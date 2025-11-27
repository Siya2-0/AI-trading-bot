import React, { useState, useEffect } from 'react';

function BrokerCard({ className = '' }) {
    
    const brokerInfo = {
        name: "Alpaca",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.TsOzAihG3KPpuWl6i1ucJwHaDt%3Fpid%3DApi&f=1&ipt=b29a8cd88613642aa0dad3ac67a4f223fa38ad7e915dd70664abe6aac7dd3be8&ipo=images",
        website: "https://alpaca.markets",
        description: "Commission-free API trading platform for developers",
        established: "2015",
        regulation: "FINRA/SIPC Member",
        rating: 4.5,
        features: ["Commission-free", "API First", "Real-time Data"],
        accountTypes: ["Individual", "IRA"]
        };


    return(

        <div 
  className={`bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-blue-500 ${className}`}
  onClick={() => window.open(brokerInfo.website, '_blank')}
>
  <h2 className="text-lg font-semibold text-gray-700 mb-3">Broker Information</h2>
  <div className="flex items-center">
    <img 
      src={brokerInfo.image} 
      alt={brokerInfo.name} 
      className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-gray-200"
    />
    <div>
      <h3 className="font-medium text-gray-800 text-lg">{brokerInfo.name}</h3>
      <p className="text-blue-500 hover:text-blue-600 text-sm mt-1 flex items-center">
        <span>Visit broker website</span>
        <svg 
          className="w-4 h-4 ml-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
          />
        </svg>
      </p>
    </div>
  </div>
  
  {/* Optional: Additional broker details */}
  {brokerInfo.description && (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <p className="text-sm text-gray-600">{brokerInfo.description}</p>
    </div>
  )}
</div>

    );

}

export default BrokerCard;