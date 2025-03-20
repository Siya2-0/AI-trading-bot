import React, { useState } from "react";
import "./Dashboard.css";


const Dashboard = ({ isCollapsed }) => {


    return (
        <>
        <div className={`dashboard ${isCollapsed ? "collapsed" : ""}`} >
            hello
        </div>
        </>
    );


}
export default Dashboard;


