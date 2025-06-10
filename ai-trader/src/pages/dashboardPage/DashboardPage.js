// import '/DashboardPage.css'
import SideMenu from '../../components/SideMenu/SideMenu'
import Dashboard from '../../components/Dashboard/Dashboard' 
import React, {useState} from 'react';

const DashboardPage = () => {
const [isCollapsed, setCollapsed] = useState(false);

return (
    <>
        <SideMenu isCollapsed={isCollapsed} setCollapsed={setCollapsed} />
        <Dashboard isCollapsed={isCollapsed} />
    
    </>

);

};

export default DashboardPage;