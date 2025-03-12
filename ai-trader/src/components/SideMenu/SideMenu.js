import React, { useState } from "react";
import "./SideMenu.css"; // Styling for the side menu
import logo from '../../assets/images/ai-trading-high-resolution-logo.png'; // Logo image
import '@fortawesome/fontawesome-free/css/all.min.css';

//import logo from '../assets/images/ai-trading-high-resolution-logo.png'

const SideMenu = () => {
    const [isMenuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
    const [isCollapsed, setCollapsed] = useState(false); // State to manage collapsed state
  
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
        <div className={`side-menu ${isMenuOpen ? "open" : ""} ${isCollapsed ? "collapsed" : ""}`}>
            <div className='LogoContainer'>
                <img src={logo} alt="AI-trading" id="logoImage"/> 
            </div>

            <p className='text-caption subtext'>menu</p>
          <div className="menu-item" onClick={toggleCollapse}>
            <i class="fa fa-bars" aria-hidden="true"></i>
            {!isCollapsed && <span>Home</span>}
          </div>
          <div className="menu-item">
            <i class="fa fa-bars" aria-hidden="true"></i>
            {!isCollapsed && <span>Profile</span>}
          </div>
          {/* Add more menu items as needed */}
        </div>
      </>
    );
  };
  
  export default SideMenu;
  