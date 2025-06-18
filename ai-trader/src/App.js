import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Landing from './pages/SignIn.js'
import SignUp from '../src/pages/SignUp.js'
import DashboardPage from '../src/pages/dashboardPage/DashboardPage.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Trade from '../src/components/Trade/Trade.js'
import TradesPage from '../src/pages/TradesPage/TradesPage.js'



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
    <div className="App">
     
     
        <TradesPage/>
       
   
    </div>
  );
}

export default App;
