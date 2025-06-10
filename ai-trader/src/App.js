import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Landing from './pages/SignIn.js'
import SignUp from '../src/pages/SignUp.js'
import DashboardPage from '../src/pages/dashboardPage/DashboardPage.js'



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
     
     <DashboardPage/>
        
       
   
    </div>
  );
}

export default App;
