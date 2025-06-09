import React, { useState } from "react";
import "./Dashboard.css";
import defaultProfileImage from '../../assets/images/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import alphaVintageLogo from '../../assets/images/0_nof8z5IpZaQiG1-7.png';

const Dashboard = ({ isCollapsed }) => {


    return (
        <>
        <div className={`dashboard ${isCollapsed ? "collapsed" : ""}`} >
          
            <div className="user-detail-container">
                <div className='greeting-text'>
                    <p>Good day, Siyabonga Mbuyisa!</p>
                </div>
                <div className='profile'>
                    <i class="fa fa-bell bell-icon" aria-hidden="true"></i>
                    <img className='profileImage' src={defaultProfileImage} alt='profileImage'></img>
                    
                </div>
            </div>
            <div class='dashboard-content'>
            
                <div class='balance-container'>
                  
                  
                    <p class='balance'>Total Account Balance</p>
                    <p class='amount'>R 10,000.00</p>

                </div>
                <div class='broker-container'>
                    
                </div>
                <div class='open-trades-container'>
                    <div className='color-box-open-trades'> green</div>
                   <div className='count-open-trades'> 5</div>
                </div>
                <div class='closed-trades-container'>
                    <div className='color-box-closed-trades'> red</div>
                    <div className='count-closed-trades'> 2</div>
                </div>
            
                <div class='chart-container'></div>
                <div class='news-events-container'></div>
          
            </div>

        </div>
        </>
    );


}
export default Dashboard;


