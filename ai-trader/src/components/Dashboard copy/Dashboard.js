import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiMail } from 'react-icons/fi';
import './Dashboard.css';
import AccountCard from '../AccountCard/AccountCard';
import BrokerCard from '../BrokerCard/BrokerCard';
import StockCard from '../StockCard/StockCard';
import PriceCard from '../PriceCard/PriceCard';
import {useAlpaca} from '../../hooks/useAlpaca.js';
import NewsCard from '../NewsCard/NewsCard';
// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ isCollapsed } ) => {
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getHistoricalBars } = useAlpaca();

  const [news, setNews] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [unreadNotifications, setUnreadNotifications] = useState(2);
  

  const handleStockSelect = async (stock) => {
    setSelectedStock(stock);
    setLoading(true);

    try {
      // Fetch historical data for the selected stock
      const data = await getHistoricalBars(stock.symbol, '5Min');
      setPriceData(data);
      //console.log('Fetched price data:', data);
      
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setLoading(false);
    }
  };


  
  
  const user = {
    name: 'David Smith',
    profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
  };

  // Get current time for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };




  // Simulate live data updates


  return (
    <div className={`dashboard-container ${isCollapsed ? "collapsed" : ""} p-6 bg-gray-100 min-h-auto`}>
      {/* Header with greeting, notifications, and profile */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {getGreeting()}, {user.name}
          </h1>
          <p className="text-gray-600">Here's your trading dashboard overview</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiBell className="text-2xl text-gray-600 cursor-pointer hover:text-blue-600" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </div>
          
          <div className="relative">
            <FiMail className="text-2xl text-gray-600 cursor-pointer hover:text-blue-600" />
            {unreadMessages > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadMessages}
              </span>
            )}
          </div>
          
          <div className="flex items-center">
            <img 
              src={user.profilePic} 
              alt="Profile" 
              className="profile-image w-10 h-10 rounded-full cursor-pointer"
              onClick={() => navigate('/profile')}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        {/* <div 
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/performance')}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Account Balance</h2>
          <p className="text-3xl font-bold text-green-600">${balance.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">Click to view details</p>
        </div> */}
        <AccountCard />
        {/* Broker Info Card */}
        {/* <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Broker Information</h2>
          <div className="flex items-center">
            <img 
              src={brokerInfo.image} 
              alt={brokerInfo.name} 
              className="w-16 h-16 rounded-full mr-4 cursor-pointer"
              onClick={() => window.open(brokerInfo.website, '_blank')}
            />
            <div>
              <h3 className="font-medium text-gray-800">{brokerInfo.name}</h3>
              <p 
                className="text-blue-500 hover:underline cursor-pointer text-sm"
                onClick={() => window.open(brokerInfo.website, '_blank')}
              >
                Visit broker website
              </p>
            </div>
          </div>
        </div> */}
        <BrokerCard />

        
         <StockCard 
              onStockSelect={handleStockSelect}
              selectedStock={selectedStock}
          />

        <PriceCard 
              stock={selectedStock}
              priceData={priceData}
              loading={loading}
            />

  
         <NewsCard  />


      </div>
    </div>
  );
};

export default Dashboard;