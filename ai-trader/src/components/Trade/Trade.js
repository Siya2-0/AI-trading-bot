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
                    <span className="stock-status-buy">Buy 0.01</span>
                    <span className="stock-losing">- 0.76</span>
                </div>
            </Accordion.Header>
            <Accordion.Body>
                 {/* First line */}
                <div className="acc-row">
                    <span className="acc-left">Order #1479175808</span>
                    <span className="acc-right">Apple Inc Corporation</span>
                </div>
                {/* Second line */}
                <div className="acc-row">
                    <span className="acc-left">Swap: 0.50</span>
                    <span className="acc-center">0.64687</span>
                    <span className="acc-right">S/L: 0.65703</span>
                </div>
                {/* Third line */}
                <div className="acc-row">
                    <span className="acc-left">2024-06-14 10:30</span>
                    <span className="acc-center">0.64763</span>
                    <span className="acc-right">T/P: 0.63667</span>
                </div>
                                
            </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
  );


};

export default Trade;