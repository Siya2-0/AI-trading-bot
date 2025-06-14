import React, { useState } from 'react';
import './Trade.css';
import Accordion from 'react-bootstrap/Accordion';

const Trade =()=>{


    return (
    <div className='Temp-Trade-Container'>    
        <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
            <Accordion.Header className="stock-header"> 
                <div className="stock-row">
                    <span className="stock-name">AAPL</span>
                    <span className="stock-status">Buy 0.01</span>
                    <span className="stock-winning">-R 1,200.00</span>
                </div>
            </Accordion.Header>
            <Accordion.Body>
                 {/* First line */}
                <div className="acc-row">
                    <span className="acc-left">Order #123456</span>
                    <span className="acc-right">AAPL Corporation</span>
                </div>
                {/* Second line */}
                <div className="acc-row">
                    <span className="acc-left">Swap: $2.50</span>
                    <span className="acc-center">Price: $180.00</span>
                    <span className="acc-right">Stop Loss: $175.00</span>
                </div>
                {/* Third line */}
                <div className="acc-row">
                    <span className="acc-left">2024-06-14 10:30</span>
                    <span className="acc-center">Price: $182.00</span>
                    <span className="acc-right">Take Profit: $190.00</span>
                </div>
                                
            </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
  );


};

export default Trade;