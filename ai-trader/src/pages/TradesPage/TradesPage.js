import React, {useState} from 'react';
import './TradesPage.css';
import Trade from '../../components/Trade/Trade'

const TradesPage = () => {
    const [IsBuy, setIsBuy] = useState(true);
    const [IsWinning, setIsWinning] = useState(true);


    return (
        <>
            <div className='Trade-Container'>

            </div>
        
        </>

    );

};


export default TradesPage;