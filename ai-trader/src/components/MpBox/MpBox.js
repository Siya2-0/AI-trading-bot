import React from 'react';
import './MpBox.css';
import { IoIosWallet } from "react-icons/io";

const MpBox = (props) => {


    return (
        <div className="box">
            <div className="balance-header">
                <IoIosWallet className="wallet-icon" />
                <div className="balance-text">
                    <div className="balance-title">Total Account Balance</div>
                    <div className={props.balance_change_status ?"balance-change positive": "balance-change negative"}>+2.7%</div> 
                    {/* <div className="balance-change negative">+2.7%</div> */}
                </div>
                
            </div>
            <div className="balance-amount">R125 8569.98</div>
            <div className="balance-updated">Last updated: 15 July 2023, 10:30 AM</div>
        
        </div>

    )

};

export default MpBox;