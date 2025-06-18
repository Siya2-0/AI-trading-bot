import React, { useState } from 'react';
import './Trade.css';
import Accordion from 'react-bootstrap/Accordion';

const Trade =(props)=>{

    return (
       
        <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
            <Accordion.Header className="stock-header"> 
                <div className="stock-row">
                    <span className="stock-name">AAPL</span>
                    <span className={props.IsBuy ? 'stock-status-buy': 'stock-status-sell'}>{props.trade_type}</span>
                    <span className={props.IsWinning ? 'stock-winning ' : 'stock-losing'}>{props.profits}</span>
                </div>
            </Accordion.Header>
            <Accordion.Body>
                 {/* First line */}
                <div className="acc-row">
                    <span className="acc-left">{props.orderNumber}</span>
                    <span className="acc-right">Apple Inc Corporation</span>
                </div>
                {/* Second line */}
                <div className="acc-row">
                    <span className="acc-left">Swap: {props.swap}</span>
                    <span className="acc-center">{props.start_price}</span>
                    <span className="acc-right">S/L: {props.stop_loss}</span>
                </div>
                {/* Third line */}
                <div className="acc-row">
                    <span className="acc-left">{props.date_time}</span>
                    <span className="acc-center">{props.current_price}</span>
                    <span className="acc-right">T/P: {props.take_profit}</span>
                </div>
                                
            </Accordion.Body>
            </Accordion.Item>
        </Accordion>

  );


};

export default Trade;