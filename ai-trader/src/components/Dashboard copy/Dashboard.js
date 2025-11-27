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
  const [activeTrades, setActiveTrades] = useState(12);
  const [balance, setBalance] = useState(45287.63);
  const [stockData, setStockData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Stock Price',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });
  const [news, setNews] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [unreadNotifications, setUnreadNotifications] = useState(2);
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

  // Mock broker data
  const brokerInfo = {
    name: 'Quantum Trading',
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.sXwU0WepPeYXbkZKX4Ek6QHaGE%3Fpid%3DApi&f=1&ipt=14f195a15a502b41b58ad678575b3c1846d23c12015d4eb8f49f4aec6cd1b173&ipo=images',
    website: 'https://quantumtrading.example.com',
  };

  // Mock closed trades data
  const closedTrades = {
    today: 5,
    week: 23,
    month: 87,
    year: 412,
  };

  // Simulate live data updates
  useEffect(() => {
    // Update stock chart data
    const interval = setInterval(() => {
      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      const newPrice = 150 + Math.random() * 10 - 5; // Random price fluctuation

      setStockData(prev => {
        const newLabels = [...prev.labels, time].slice(-20);
        const newData = [...prev.datasets[0].data, newPrice].slice(-20);
        
        return {
          labels: newLabels,
          datasets: [
            {
              ...prev.datasets[0],
              data: newData,
            },
          ],
        };
      });
    }, 3000);

    // Fetch news (mock)
    const newsItems = [
      {
        id: 1,
        title: 'Tech Stocks Rally After Fed Announcement',
        source: 'Financial Times',
        timestamp: '2 hours ago',
      },
      {
        id: 2,
        title: 'AI Trading Algorithms Outperform Humans in Q3',
        source: 'Wall Street Journal',
        timestamp: '5 hours ago',
      },
      {
        id: 3,
        title: 'New Regulations for Algorithmic Trading Expected',
        source: 'Bloomberg',
        timestamp: '1 day ago',
      },
    ];
    setNews(newsItems);

    return () => clearInterval(interval);
  }, []);

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
        <div 
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/performance')}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Account Balance</h2>
          <p className="text-3xl font-bold text-green-600">${balance.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">Click to view details</p>
        </div>

        {/* Broker Info Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
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
        </div>

        {/* Active Trades Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Active Trades</h2>
          <p className="text-3xl font-bold text-blue-600">{activeTrades}</p>
          <p className="text-sm text-gray-500 mt-2">Currently running</p>
        </div>

        {/* Closed Trades Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Closed Trades</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Today</p>
              <p className="text-xl font-semibold">{closedTrades.today}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">This Week</p>
              <p className="text-xl font-semibold">{closedTrades.week}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-xl font-semibold">{closedTrades.month}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">This Year</p>
              <p className="text-xl font-semibold">{closedTrades.year}</p>
            </div>
          </div>
        </div>

        {/* Stock Chart - Takes 2 columns on larger screens */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Live Stock Chart</h2>
          <div className="h-64">
            <Line 
              data={stockData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: false,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* News Card */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Market News</h2>
          <div className="space-y-4">
            {news.map(item => (
              <div key={item.id} className="border-b pb-3 last:border-0 last:pb-0">
                <h3 className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.source} · {item.timestamp}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;