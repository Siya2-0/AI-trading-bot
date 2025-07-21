import React, {useState} from 'react';
import './ModelPerformance.css';
import MpBox from '../../components/MpBox/MpBox'





const HistoryPage = () => {

    return (
        <div className='MP-Background' >
            <div className="MP-dashboard">
                {/* First container with 3 rectangular boxes */}
                <div className="boxes-container">
                    <MpBox />
                    <MpBox />
                    <MpBox />
                    {/* <MpBox /> */}
                </div>
                
                {/* Second container (you can add content here later) */}
                <div className="second-container">
                    {/* Content goes here */}
                </div>
            </div>
        
        </div>
    )

};






export default HistoryPage;