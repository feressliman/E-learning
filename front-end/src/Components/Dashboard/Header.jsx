import React from 'react';
import './Dashboard.css'

const Header = ({ userName }) => {
    return (
        <header>
            <h1>Welcome, {userName}</h1>
            <div className="user-info">
                <img src="user-avatar.jpg" alt="User Avatar" />
                <span>{userName}</span>
            </div>
        </header>
    );
};

export default Header;
