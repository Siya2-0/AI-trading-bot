// import '/DashboardPage.css'
import SideMenu from '../../components/SideMenu copy/SideMenu.js';
import Dashboard from '../../components/Dashboard copy/Dashboard.js'; 
//import Dashboard2 from '../../components/Dashboard copy/Dashboard.js';
import React, {useState} from 'react';
// import './DashboardPage.css'; // Import the CSS file for styling

const DashboardPage = () => {
const [isCollapsed, setCollapsed] = useState(false);

return (
    <>
        <div className='dashboard-page-background'>
            <SideMenu isCollapsed={isCollapsed} setCollapsed={setCollapsed} />
            <Dashboard isCollapsed={isCollapsed} />
        </div>
    </>

);

};

export default DashboardPage;