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
                
            </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
  );


};

export default Trade;