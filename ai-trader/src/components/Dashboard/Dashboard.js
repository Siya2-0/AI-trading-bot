import React, { useState } from "react";
import "./Dashboard.css";
import defaultProfileImage from '../../assets/images/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg';

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
            <div className='dashboard-content'>
                <div className='balance-container'>

                </div>
                <div className='broker-container'>

                </div>
                <div className='open-trades-container'>

                </div>
                <div className='closed-trades-container'>

                </div>

                <div className='chart-container'>

                </div>
                <div className='news-events-container'>

                </div>

            </div>

        </div>
        </>
    );


}
export default Dashboard;


