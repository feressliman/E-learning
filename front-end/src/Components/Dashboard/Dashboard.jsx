import React from 'react';
import Sidebar from '../Assets/Sidebar';
import Header from '../Assets/Header';
import './Dashboard.css';

const Dashboard = () => {
    const userName = 'John Doe'; // à remplacer par les données réelles

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Header userName={userName} />
                
                <div className="dashboard-widgets">
                    
                </div>
            </div>
        </div>
    );
};

export default Dashboard;