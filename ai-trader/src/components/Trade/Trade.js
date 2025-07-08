import React, { useState } from 'react';
import './Trade.css';
import Accordion from 'react-bootstrap/Accordion';

const Trade =({trade})=>{

    return (
       
        <Accordion  className="trade-accordion">
            <Accordion.Item eventKey="0">
            <Accordion.Header className="stock-header"> 
                <div className="stock-row">
                    <span className="stock-name">AAPL</span>
                    <span className={trade.IsBuy ? 'stock-status-buy': 'stock-status-sell'}>{trade.trade_type ? 'Buy' : 'Sell'}</span>
                    <span className={trade.IsWinning ? 'stock-winning ' : 'stock-losing'}>{trade.profits}</span>
                </div>
            </Accordion.Header> 
            <Accordion.Body>
                 {/* First line */}
                <div className="acc-row">
                    <span className="acc-left">{trade.orderNumber}</span>
                    <span className="acc-right">Apple Inc Corporation</span>
                </div>
                {/* Second line */}
                <div className="acc-row">
                    <span className="acc-left">Swap: {trade.swap}</span>
                    <span className="acc-center">{trade.start_price}</span>
                    <span className="acc-right">S/L: {trade.stop_loss}</span>
                </div>
                {/* Third line */}
                <div className="acc-row">
                    <span className="acc-left">{trade.date_time}</span>
                    <span className="acc-center">{trade.current_price}</span>
                    <span className="acc-right">T/P: {trade.take_profit}</span>
                </div>
                                
            </Accordion.Body>
            </Accordion.Item>
        </Accordion>

  );


};

export default Trade;