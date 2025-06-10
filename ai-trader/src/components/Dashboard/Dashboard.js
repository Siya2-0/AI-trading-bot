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
                    <i className="fa fa-bell bell-icon" aria-hidden="true"></i>
                    <img className='profileImage' src={defaultProfileImage} alt='profileImage'></img>
                    
                </div>
            </div>
            <div className='dashboard-content'>
            
                <div className='balance-container'>
                  
                  
                    <p className='balance'>Total Account Balance</p>
                    <p className='amount'>R 10,000.00</p>

                </div>

                <a href='https://www.alphavantage.co/'target='_blank' rel='noopener noreferrer'>
                    <div className='broker-container'>
                        
                    </div>
                </a>
                
                <div className='open-trades-container'>
                    
                   <p className='title_trades_block'>Open Trades</p>
                    <p className='amount_trades_block'>7</p>
                </div>
                <div className='closed-trades-container'>
                    <p className='title_trades_block'>Closed Trades</p>
                    <p className='amount_trades_block'>3</p>
                    
                </div>
            
                <div className='chart-container'></div>
                <div className='news-events-container'></div>
          
            </div>

        </div>
        </>
    );


}
export default Dashboard;


