import React, {useState} from 'react';
import './TradesPage.css';
import Trade from '../../components/Trade/Trade'


const TradesPage = () => {
    const [filter, setFilter] = useState('all');
  
    const exampleTrades = [
    {
      
        orderNumber: "ORD123456",
        IsBuy: true,
        IsWinning: true,
        amount: "+ 1,250.00",
        stop_loss: 175.00,
        start_price: 182.50,
        current_price: 185.00,
        swap: 2.50,
        take_profit: 190.00,
        date_time: "2025-06-18 10:30",
        trade_type: true,
        profits:'+23 051,56'
    },
    {
       
        orderNumber: "ORD123457",
        IsBuy: false,
        IsWinning: false,
        amount: "- 320.00",
        stop_loss: 600.00,
        start_price: 610.00,
        current_price: 605.00,
        swap: 1.80,
        take_profit: 590.00,
        date_time: "2025-06-17 14:15",
        trade_type: false,
        profits: '-23 051,56'

    },
    {
        
        orderNumber: "ORD123458",
        IsBuy: true,
        IsWinning: true,
        amount: "+ 980.00",
        stop_loss: 2700.00,
        start_price: 2750.00,
        current_price: 2780.00,
        swap: 3.10,
        take_profit: 2800.00,
        date_time: "2025-06-16 09:45",
        trade_type: true,
        profits:'+23 051,56'
    },
    {
        
        orderNumber: "ORD123459",
        IsBuy: false,
        IsWinning: true,
        amount: "+ 540.00",
        stop_loss: 3200.00,
        start_price: 3150.00,
        current_price: 3175.00,
        swap: 2.00,
        take_profit: 3100.00,
        date_time: "2025-06-15 16:20",
        trade_type: false,
        profits: '+23 051,56'
    },
    {
      
        orderNumber: "ORD123460",
        IsBuy: true,
        IsWinning: false,
        amount: "- 150.00",
        stop_loss: 295.00,
        start_price: 300.00,
        current_price: 297.00,
        swap: 1.20,
        take_profit: 310.00,
        date_time: "2025-06-14 11:05",
        trade_type: true,
        profits: '-23 051,56'
    }
    ];
    const filteredTrades = exampleTrades.filter(trade => {
        if (filter === "all") return true;
        if (filter === "buy") return trade.IsBuy;
        if (filter === "sell") return !trade.IsBuy;
        return true;
    });

    return (
        <>
            <div className='TradesPage'>

                <select value={filter} onChange={e => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="buy">Buy Orders</option>
                    <option value="sell">Sell Orders</option>
                </select>
                <div className='Trades-Container'>
                    {filteredTrades.map((trade) => (
                    <Trade key={trade.orderNumber} trade={trade} />
                    ))}
                </div>
            </div>
        </>

    );

};


export default TradesPage;