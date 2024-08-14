import React from 'react';
import './Dashboard.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <h2>E-Learning</h2>
            </div>
            <ul className="nav-links">
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">Courses</a></li>
                <li><a href="#">Progress</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Settings</a></li>
                <li><a href="#">Logout</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
