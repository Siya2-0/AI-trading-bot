import React, {useState} from 'react';
import './ModelPerformance.css';
import MpBox from '../../components/MpBox/MpBox'
import { MdOutlineTimeline } from "react-icons/md";
import { IoTime } from "react-icons/io5";





const HistoryPage = () => {

    return (
        <div className='MP-Background' >
            <div className="MP-dashboard">
                {/* First container with 3 rectangular boxes */}
                <div className="boxes-container">
                    <MpBox 
                        box_title="Total Account Balance"
                        balance_change_status={true}
                        percentage="+2.7%"
                        balance_amount="R125 8569.98"
                        last_updated="Last updated: 15 July 2023, 10:30 AM"
                    />
                    <MpBox 
                        icon={MdOutlineTimeline}
                        box_title="Win Rate"
                        balance_change_status={true}
                        percentage="+30.7%"
                        balance_amount="87 positions"
                        last_updated="Last updated: 16 July 2023, 10:30 AM"
                    />
                    <MpBox 
                        icon={IoTime}
                        box_title="Uptime"
                        balance_change_status={true}
                        percentage="+2.7%"
                        balance_amount="23000 hours"
                        last_updated="Last updated: 16 July 2023, 10:30 AM"
                    />
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