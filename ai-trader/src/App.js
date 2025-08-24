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
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
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
