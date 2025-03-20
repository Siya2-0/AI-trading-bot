import React, { useState } from "react";
import "./SideMenu.css"; // Styling for the side menu
import logo from '../../assets/images/ai-trading-high-resolution-logo.png'; // Logo image
import '@fortawesome/fontawesome-free/css/all.min.css';

//import logo from '../assets/images/ai-trading-high-resolution-logo.png'

const SideMenu = ({ isCollapsed, setCollapsed }) => {
    const [isMenuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
   // const [isCollapsed, setCollapsed] = useState(false); // State to manage collapsed state
  
    // Toggle menu visibility (for mobile)
    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };
  
    // Toggle collapsed state (for laptop/desktop)
    const toggleCollapse = () => {
      setCollapsed(!isCollapsed);
    };
  
    return (
      <>
       
        {/* Hamburger menu for mobile */}
        <div className="hamburger-menu" onClick={toggleMenu}>
            <i class="fa fa-bars" aria-hidden="true"></i>
        </div>
  
        {/* Side Menu */}
        <div className={`side-menu ${isMenuOpen ? "open" : ""} ${isCollapsed ? "collapsed" : ""}`} >
            <div className='LogoContainer'  onClick={toggleCollapse}>
                <img src={logo} alt="AI-trading" id="logoImage"/> 
            </div>
          <div className='text-caption-container'>
            <p className='text-caption subtext'>MENU</p>
          </div>
          <div className="menu-item">
          <i class="fa fa-th" aria-hidden="true"></i>
            {!isCollapsed && <span>Dashboard</span>}
          </div>
          <div className="menu-item">
          <i class="fa fa-folder-open" aria-hidden="true"></i>
            {!isCollapsed && <span>Active Trades</span>}
          </div>
          <div className="menu-item">
          <i class="fa fa-history" aria-hidden="true"></i>
            {!isCollapsed && <span>Historical Trades</span>}
          </div>
          <div className="menu-item">
          <i class="fa fa-pie-chart" aria-hidden="true"></i>
            {!isCollapsed && <span>Model Performance</span>}
          </div>
          <div className='text-caption-container'>
            <p className='text-caption subtext general-top-spacing'>GENERAL</p>
          </div>
          <div className="menu-item">
          <i class="fa fa-cogs" aria-hidden="true"></i>
            {!isCollapsed && <span>Settings</span>}
          </div>
          <div className="menu-item">
          <i class="fa fa-info-circle" aria-hidden="true"></i>
            {!isCollapsed && <span>Help</span>}
          </div>
          <div className="menu-item">
          <i class="fa fa-sign-out" aria-hidden="true"></i>
            {!isCollapsed && <span>Logout</span>}
          </div>
          
          
          {/* Add more menu items as needed */}
        </div>
      </>
    );
  };
  
  export default SideMenu;
  