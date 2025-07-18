import React from 'react';
import './MpBox.css';
import { IoIosWallet } from "react-icons/io";

const MpBox = () => {


    return (
        <div className="box">
             <div className="balance-container">
                <IoIosWallet className="wallet-icon" />
                <div className="balance-text">
                    <div className="balance-title">Total Balance</div>
                    <div className="balance-change positive">+2.7%</div>
                </div>
                <div className="balance-amount">R125 8569.98</div>
                <div className="balance-updated">Last updated: 15 July 2023, 10:30 AM</div>
          </div>
        
        
        </div>

    )

};

export default MpBox;