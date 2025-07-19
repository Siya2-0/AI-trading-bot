import React from 'react';
import './MpBox.css';
import { IoIosWallet } from "react-icons/io";

const MpBox = () => {


    return (
        <div className="box">
            <div className="balance-header">
                <IoIosWallet className="wallet-icon" />
                <div className="balance-text">
                    <div className="balance-title">Total Account Balance</div>
                    <div className="balance-change positive">+2.7%</div>
                </div>
                
            </div>
            <div className="balance-amount">R125 8569.98</div>
            <div className="balance-updated">Last updated: 15 July 2023, 10:30 AM</div>
        
        </div>

    )

};

export default MpBox;