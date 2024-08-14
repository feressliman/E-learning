import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Card from './Card';
import './Dashboard.css';

const Dashboard = () => {
    const userName = 'John Doe'; // à remplacer par les données réelles

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Header userName={userName} />
                <section className="cards-section">
                    <Card title="Total Courses" value="12" />
                    <Card title="Courses Completed" value="8" />
                    <Card title="Courses In Progress" value="4" />
                    <Card title="Messages" value="3 New" />
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
