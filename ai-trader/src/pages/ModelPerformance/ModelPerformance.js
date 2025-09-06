import React, {useState} from 'react';
import './ModelPerformance.css';
import MpBox from '../../components/MpBox/MpBox'
import { MdOutlineTimeline } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import SideMenu from '../../components/SideMenu copy/SideMenu.js';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);




const ModelPerformancePage = () => {
    const [isCollapsed, setCollapsed] = useState(false);
      // Sample data for the line graph
  const graphData = {
    labels: ['1 Jul', '2 Jul', '3 Jul', '4 Jul', '5 Jul', '6 Jul', '7 Jul', '8 Jul', '9 Jul', '10 Jul', '11 Jul', '12 Jul', '13 Jul', '14 Jul', '15 Jul'],
    datasets: [
      {
        label: 'Account Balance',
        data: [120000, 121500, 122000, 123200, 123800, 124100, 124300, 124600, 124900, 125000, 125100, 125200, 125300, 125400, 125452.96],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Account Balance Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return 'R' + value.toLocaleString();
          }
        }
      }
    }
  };

    return (
        <div className='MP-Background' >
            <SideMenu isCollapsed={isCollapsed} setCollapsed={setCollapsed}  />
            <div className={`MP-dashboard ${isCollapsed ? "collapsed" : ""}`}>
                {/* First container with 3 rectangular boxes */}
                <div className="boxes-container">
                    <MpBox 
                        box_title="Total Account Balance"
                        balance_change_status={true}
                        percentage="+2.7%"
                        balance_amount="R125 8569.98"
                        last_updated="Last updated: 15 July 2023, 10:30 AM"
                    />
                    <MpBox 
                        icon={MdOutlineTimeline}
                        box_title="Win Rate"
                        balance_change_status={true}
                        percentage="+30.7%"
                        balance_amount="87 positions"
                        last_updated="Last updated: 16 July 2023, 10:30 AM"
                    />
                    <MpBox 
                        icon={IoTime}
                        box_title="Uptime"
                        balance_change_status={true}
                        percentage="+2.7%"
                        balance_amount="23000 hours"
                        last_updated="Last updated: 16 July 2023, 10:30 AM"
                    />
                    {/* <MpBox /> */}
                </div>
                
                {/* Second container (you can add content here later) */}
                <div className="second-container">
                   <div className="graph-container">
                    <Line data={graphData} options={options} />
                    </div>
                </div>
            </div>
        
        </div>
    )

};






export default ModelPerformancePage;