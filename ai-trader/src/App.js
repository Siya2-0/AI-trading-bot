import logo from './logo.svg';
import './App.css';
import Landing from './pages/SignIn.js'
import SignUp from '../src/pages/SignUp.js'
import SideMenu from '../src/components/SideMenu/SideMenu.js'

function App() {
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
      <SideMenu/>
      <div className="content">
        <h1>Welcome to My App</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
}

export default App;
