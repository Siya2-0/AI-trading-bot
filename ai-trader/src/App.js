import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React, {useState} from 'react';
import SignIn from '../src/pages/SignInPage/SignIn.js'
import SignUp from '../src/pages/SignUpPage/SignUp.js'
import DashboardPage from '../src/pages/dashboardPage/DashboardPage.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import TradesPage from '../src/pages/TradesPage/TradesPage.js'
import HistoryPage from '../src/pages/HistoryPage/HistoryPage.js'
import ModelPerformance from '../src/pages/ModelPerformance/ModelPerformance.js'
import Dashboard2 from '../src/components/Dashboard copy/Dashboard.js';
import SideMenu from '../src/components/SideMenu copy/SideMenu.js';
import Dashboard from '../src/pages/dashboardPage copy/DashboardPage.js';
import Trade from '../src/components/Trade/Trade.js';

const exampleTrades = [
    {
      
        orderNumber: "ORD123456",
        IsBuy: true,
        IsWinning: true,
        amount: "+ 1,250.00",
        stop_loss: 175.00,
        start_price: 182.50,
        current_price: 185.00,
        swap: 2.50,
        take_profit: 190.00,
        date_time: "2025-06-18 10:30",
        trade_type: true,
        profits:'+23 051,56'
    },
    {
       
        orderNumber: "ORD123457",
        IsBuy: false,
        IsWinning: false,
        amount: "- 320.00",
        stop_loss: 600.00,
        start_price: 610.00,
        current_price: 605.00,
        swap: 1.80,
        take_profit: 590.00,
        date_time: "2025-06-17 14:15",
        trade_type: false,
        profits: '-23 051,56'

    },
    {
        
        orderNumber: "ORD123458",
        IsBuy: true,
        IsWinning: true,
        amount: "+ 980.00",
        stop_loss: 2700.00,
        start_price: 2750.00,
        current_price: 2780.00,
        swap: 3.10,
        take_profit: 2800.00,
        date_time: "2025-06-16 09:45",
        trade_type: true,
        profits:'+23 051,56'
    },
    {
        
        orderNumber: "ORD123459",
        IsBuy: false,
        IsWinning: true,
        amount: "+ 540.00",
        stop_loss: 3200.00,
        start_price: 3150.00,
        current_price: 3175.00,
        swap: 2.00,
        take_profit: 3100.00,
        date_time: "2025-06-15 16:20",
        trade_type: false,
        profits: '+23 051,56'
    },
    {
      
        orderNumber: "ORD123460",
        IsBuy: true,
        IsWinning: false,
        amount: "- 150.00",
        stop_loss: 295.00,
        start_price: 300.00,
        current_price: 297.00,
        swap: 1.20,
        take_profit: 310.00,
        date_time: "2025-06-14 11:05",
        trade_type: true,
        profits: '-23 051,56'
    }
    ];
function App() {
  const [isCollapsed, setCollapsed] = useState(false);
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    
    // <div>
    //   {exampleTrades.map((trade) => (
    //     <Trade key={trade.orderNumber} trade={trade} />
    //    ))}
    // </div>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TradesPage/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/trades" element={<TradesPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/performance" element={<ModelPerformance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
