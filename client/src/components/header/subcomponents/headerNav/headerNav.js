import React from 'react';
import './css/headerNav.css';

const HeaderNav = () => {
    return (
        <div className="h-nav-container">
            <span className="h-nav-burger">&#9776;</span>
            <ul className="h-nav-content">
                <a href="/champions"><li className="nav-item">Champions</li></a>
                <a href="/rules"><li className="nav-item">Rules</li></a>
                <a href="/leaders"><li className="nav-item">Leaders</li></a>
                <a href="/all-time"><li className="nav-item">All-Time Records</li></a>
            </ul>
        </div>
    );
};

export default HeaderNav;
