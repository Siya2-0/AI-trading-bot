import React from 'react';
import './MpBox.css';
import { IoIosWallet } from "react-icons/io";

const MpBox = ({ icon:Icon=IoIosWallet , box_title, balance_change_status, percentage, balance_amount, last_updated }) => {


    return (
        <div className="box">
            <div className="balance-header">
                < Icon className="wallet-icon" />
                <div className="balance-text">
                    <div className="balance-title">{box_title}</div>
                    <div className={balance_change_status ?"balance-change positive": "balance-change negative"}>{percentage}</div> 
                    
                </div>
                
            </div>
            <div className="balance-amount">{balance_amount}</div>
            <div className="balance-updated">{last_updated}</div>
        
        </div>

    )

};

export default MpBox;