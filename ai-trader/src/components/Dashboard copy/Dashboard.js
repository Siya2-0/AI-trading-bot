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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
       
        <AccountCard className="h-fit" />
       
        <BrokerCard className="h-fit" />
        <NewsCard className="md:col-span-2 h-fit max-h-96 overflow-y-auto" />

         <StockCard 
              onStockSelect={handleStockSelect}
              selectedStock={selectedStock}
              className="md:col-span-2 lg:col-span-2 h-fit"
          />

        <PriceCard 
              stock={selectedStock}
              priceData={priceData}
              loading={loading}
              className="md:col-span-2 lg:col-span-2 h-fit"
            />

  
      


      </div>
    </div>
  );
};

export default Dashboard;