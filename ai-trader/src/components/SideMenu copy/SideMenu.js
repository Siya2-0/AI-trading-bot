import React, { useState } from 'react';
import { 
  FiMenu, 
  FiX,
  FiHome,
  FiDollarSign,
  FiBarChart2,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showTradeStats, setShowTradeStats] = useState(false);
  const navigate = useNavigate();

  // Mock trade statistics
  const tradeStats = {
    today: 5,
    week: 23,
    month: 87,
    year: 412
  };

  const menuItems = [
    { icon: <FiHome size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FiDollarSign size={20} />, label: 'Trades', path: '/trades' },
    { icon: <FiBarChart2 size={20} />, label: 'Model Performance', path: '/performance' }
  ];

  const bottomMenuItems = [
    { icon: <FiSettings size={20} />, label: 'Settings', path: '/settings' },
    { icon: <FiHelpCircle size={20} />, label: 'Help', path: '/help' },
    { icon: <FiLogOut size={20} />, label: 'Logout', path: '/logout' }
  ];

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setShowTradeStats(false);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className={`flex flex-col h-screen bg-gray-800 text-white transition-all duration-300 ${isCollapsed ? 'w-5.5%' : 'w-19.5%'}`}>
      {/* Header with logo and collapse button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
              <span className="font-bold text-xl">AI</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">AI Trader Pro</h1>
              <p className="text-xs text-gray-400">Smart investments, automated</p>
            </div>
          </div>
        )}
        {/* {isCollapsed && (
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto">
            {<span className="font-bold text-xl">AI</span>}
          </div>
        )} */}
        <button 
          onClick={toggleMenu}
          className="text-gray-400 hover:text-white focus:outline-none"
        >
          {isCollapsed ? <FiMenu size={24} /> : <FiX size={24} />}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => navigateTo(item.path)}
                className={`flex items-center w-full px-4 py-3 hover:bg-gray-700 transition-colors ${isCollapsed ? 'justify-end' : 'justify-start'}`}
              >
                <span className={`${!isCollapsed && 'mr-3'}`}>{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>

        {/* Trade Statistics Section */}
        {!isCollapsed && (
          <div className="mt-6 px-4">
            {/* <button
              onClick={() => setShowTradeStats(!showTradeStats)}
              className="flex items-center justify-between w-full py-2 text-gray-300 hover:text-white"
            >
              <span>Trade Statistics</span>
              {showTradeStats ? <FiChevronUp /> : <FiChevronDown />}
            </button> */}
            
            {/* {showTradeStats && (
              <div className="mt-2 bg-gray-700 rounded-lg p-3">
                <div className="flex justify-between py-1">
                  <span className="text-sm text-gray-400">Today</span>
                  <span className="font-medium">{tradeStats.today}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-sm text-gray-400">This Week</span>
                  <span className="font-medium">{tradeStats.week}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-sm text-gray-400">This Month</span>
                  <span className="font-medium">{tradeStats.month}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-sm text-gray-400">This Year</span>
                  <span className="font-medium">{tradeStats.year}</span>
                </div>
              </div>
            )} */}
          </div>
        )}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-700 py-4">
        <ul>
          {bottomMenuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => navigateTo(item.path)}
                className={`flex items-center w-full px-4 py-3 hover:bg-gray-700 transition-colors ${isCollapsed ? 'justify-end' : 'justify-start'}`}
              >
                <span className={`${!isCollapsed && 'mr-3'}`}>{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;